// scripts/seed.mjs
// Run with: node scripts/seed.mjs
// Seeds Topic 1 questions for all 3 tracks into Supabase

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load env vars from .env.local
const envPath = resolve(__dirname, '../.env.local')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf-8')
    .split('\n')
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => {
      const idx = l.indexOf('=')
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()]
    })
)

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

async function main() {
  console.log('🔌 Connecting to Supabase...')
  console.log('   URL:', env.NEXT_PUBLIC_SUPABASE_URL)

  // Check schema exists
  const { error: schemaError } = await supabase.from('topics').select('id').limit(1)
  if (schemaError) {
    console.error('\n❌ Schema not found. Please apply 001_initial_schema.sql in the Supabase SQL Editor first.')
    console.error('   Link: https://supabase.com/dashboard/project/uhhvhrxjusteiuzgdfes/sql/new')
    console.error('   File: supabase/migrations/001_initial_schema.sql')
    process.exit(1)
  }

  // Get Topic 1
  const { data: topic1, error: topicError } = await supabase
    .from('topics')
    .select('id, title')
    .eq('order_index', 1)
    .single()

  if (topicError || !topic1) {
    console.error('❌ Topic 1 not found. Make sure 001_initial_schema.sql was applied (it seeds the 10 topics).')
    process.exit(1)
  }

  console.log(`✅ Found Topic 1: "${topic1.title}" (id: ${topic1.id})`)

  // Check if questions already seeded
  const { count } = await supabase
    .from('questions')
    .select('id', { count: 'exact', head: true })
    .eq('topic_id', topic1.id)

  if (count && count > 0) {
    console.log(`ℹ️  Questions already seeded (${count} found). Skipping.`)
    console.log('   Delete existing questions first if you want to re-seed.')
    process.exit(0)
  }

  console.log('📝 Seeding questions...')

  const tracks = ['story', 'levels', 'sandbox']
  const realQuestions = {
    story: [
      { prompt: 'ARIA says: "The robot door only opens when BOTH the red button AND the blue button are pressed. What kind of gate is this?"', options: ['AND gate','OR gate','NOT gate','XOR gate'], correct_answer: 'AND gate', explanation: 'An AND gate only outputs TRUE when ALL inputs are TRUE — just like the door needing both buttons!' },
      { prompt: 'ARIA says: "The alarm rings if the window is open OR the door is open. Which gate does this remind you of?"', options: ['AND gate','OR gate','NOT gate','NAND gate'], correct_answer: 'OR gate', explanation: 'An OR gate outputs TRUE when AT LEAST ONE input is TRUE — either one being open triggers the alarm!' },
      { prompt: "ARIA shows a switch: when it is ON the light turns OFF, and when it is OFF the light turns ON. What operation is this?", options: ['AND','OR','NOT','XOR'], correct_answer: 'NOT', explanation: 'A NOT gate flips the input — TRUE becomes FALSE and FALSE becomes TRUE!' },
      { prompt: 'ARIA says: "In the robot world, TRUE means 1 and FALSE means 0. What is 1 AND 1?"', options: ['0','1','2','TRUE or FALSE'], correct_answer: '1', explanation: 'AND of 1 and 1 is 1 (TRUE) — both inputs are TRUE so the output is TRUE!' },
      { prompt: 'ARIA says: "What is 1 OR 0?"', options: ['0','1','10','Neither'], correct_answer: '1', explanation: 'OR outputs 1 (TRUE) if at least one input is 1. Since one input is 1, the answer is 1!' },
      { prompt: 'ARIA says: "NOT 1 equals...?"', options: ['0','1','2','-1'], correct_answer: '0', explanation: 'NOT flips the value! NOT 1 = 0, and NOT 0 = 1.' },
      { prompt: 'ARIA shows two paths to the treasure chest. You can only walk through if path A AND path B are both clear. What if path A is blocked?', options: ['You can still reach the chest','You cannot reach the chest','It depends','Only path B matters'], correct_answer: 'You cannot reach the chest', explanation: 'AND means ALL paths must be clear. If even one is blocked, you cannot get through!' },
      { prompt: "ARIA's robot has two sensors. The alarm sounds if sensor A OR sensor B detects movement. Both sensors detect something. Does the alarm sound?", options: ['Yes','No','Only if both detect at the same time','Cannot tell'], correct_answer: 'Yes', explanation: 'OR only needs ONE input to be TRUE. Both being TRUE still gives a TRUE output!' },
      { prompt: 'What does Boolean mean in computing?', options: ['A type of number','True or False values only','A programming language','A kind of robot'], correct_answer: 'True or False values only', explanation: 'Boolean refers to a system with only two values — TRUE (1) and FALSE (0) — named after mathematician George Boole!' },
      { prompt: 'ARIA says: "0 AND 0 equals...?"', options: ['0','1','0 or 1','Undefined'], correct_answer: '0', explanation: 'AND only outputs 1 when BOTH inputs are 1. Here both are 0, so the result is 0.' },
    ],
    levels: [
      { prompt: 'In Boolean algebra, what is the result of A AND B when A=1 and B=0?', options: ['0','1','A','B'], correct_answer: '0', explanation: 'AND outputs 1 only when BOTH inputs are 1. Since B=0, the result is 0.' },
      { prompt: 'Which logic gate outputs TRUE only when both inputs are TRUE?', options: ['OR gate','AND gate','NOT gate','XOR gate'], correct_answer: 'AND gate', explanation: 'The AND gate is the most restrictive — ALL inputs must be TRUE for the output to be TRUE.' },
      { prompt: "What is the Boolean expression for a NOT gate applied to input A?", options: ["A+B","A·B","A'","A+A'"], correct_answer: "A'", explanation: "A' (A prime) or ¬A represents the NOT operation, which inverts the input." },
      { prompt: 'Which law states that A + 0 = A?', options: ['Commutative Law','Identity Law','Complement Law','Absorption Law'], correct_answer: 'Identity Law', explanation: 'The Identity Law says adding 0 (OR with 0) or multiplying by 1 (AND with 1) leaves a value unchanged.' },
      { prompt: "What does A OR A' always equal?", options: ["0","1","A","A'"], correct_answer: '1', explanation: "A variable OR its complement always equals 1 — this is the Complement Law!" },
      { prompt: 'Evaluate: 1 AND (0 OR 1)', options: ['0','1','2','Cannot determine'], correct_answer: '1', explanation: 'First evaluate the brackets: 0 OR 1 = 1. Then 1 AND 1 = 1.' },
      { prompt: 'Which gate produces the opposite output of an AND gate?', options: ['OR','NOR','NAND','XOR'], correct_answer: 'NAND', explanation: 'NAND = NOT AND. It inverts the AND output, so it outputs 0 only when both inputs are 1.' },
      { prompt: 'What is the result of A AND A?', options: ['0','1','A',"A'"], correct_answer: 'A', explanation: 'Idempotent Law: A AND A = A. A variable ANDed with itself returns itself.' },
      { prompt: 'In a truth table for a 2-input gate, how many rows are needed?', options: ['2','3','4','8'], correct_answer: '4', explanation: 'Two inputs can each be 0 or 1, giving 2² = 4 combinations: 00, 01, 10, 11.' },
      { prompt: 'What does a truth table show?', options: ['The speed of a circuit','All possible input/output combinations for a logic gate','How much power a gate uses','The physical size of a chip'], correct_answer: 'All possible input/output combinations for a logic gate', explanation: 'A truth table lists every possible combination of inputs and the corresponding output for a logic expression.' },
    ],
    sandbox: [
      { prompt: 'Write a Boolean expression for: output is TRUE when A is TRUE and B is FALSE.', options: ['A AND B','A OR NOT B','A AND NOT B','NOT A AND B'], correct_answer: 'A AND NOT B', explanation: 'We need A=1 AND B=0. "B is FALSE" means NOT B. So the expression is A AND NOT B.' },
      { prompt: 'Simplify using the Absorption Law: A OR (A AND B)', options: ['A','B','A AND B','A OR B'], correct_answer: 'A', explanation: 'Absorption Law: A OR (A AND B) = A. The more complex term is absorbed by the simpler one.' },
      { prompt: "Which of the following is equivalent to NOT(A OR B) by De Morgan's Law?", options: ['NOT A OR NOT B','NOT A AND NOT B','A AND B','NOT A AND B'], correct_answer: 'NOT A AND NOT B', explanation: "De Morgan's Law: NOT(A OR B) = NOT A AND NOT B. The OR flips to AND when NOT is distributed." },
      { prompt: 'A half adder circuit has two inputs and two outputs: Sum and Carry. Which gates implement the Sum output?', options: ['AND gate','OR gate','XOR gate','NAND gate'], correct_answer: 'XOR gate', explanation: 'XOR produces 1 when inputs differ — exactly what we need for binary addition (1+1 carries, so sum=0).' },
      { prompt: 'Simplify: (A AND B) OR (A AND NOT B)', options: ['A','B','A AND B','NOT A'], correct_answer: 'A', explanation: 'Factor out A: A AND (B OR NOT B). Since B OR NOT B = 1, this simplifies to A AND 1 = A.' },
      { prompt: 'In Python, what is the output of: True and False or True?', options: ['False','True','None','Error'], correct_answer: 'True', explanation: 'Operator precedence: AND first → (True AND False) = False. Then False OR True = True.' },
      { prompt: 'Which Boolean expression is a tautology (always TRUE)?', options: ['A AND B','A OR NOT A','NOT A AND A','A XOR A'], correct_answer: 'A OR NOT A', explanation: 'A OR NOT A is always TRUE regardless of A — this is the Complement Law!' },
      { prompt: 'You have 3 boolean inputs. How many rows in the truth table?', options: ['3','6','8','16'], correct_answer: '8', explanation: '3 inputs → 2³ = 8 rows. Each additional input doubles the number of combinations.' },
      { prompt: 'NAND is called a "universal gate" because:', options: ['It is the fastest gate','Any Boolean function can be built using only NAND gates','It uses the least power','It has the most inputs'], correct_answer: 'Any Boolean function can be built using only NAND gates', explanation: 'NAND is functionally complete — AND, OR, NOT, and any other gate can be constructed from NAND gates alone.' },
      { prompt: 'Which law allows us to rearrange: A AND B = B AND A?', options: ['Associative Law','Distributive Law','Commutative Law','Identity Law'], correct_answer: 'Commutative Law', explanation: 'The Commutative Law states that the order of operands does not affect the result in AND and OR operations.' },
    ]
  }

  let totalInserted = 0

  for (const track of tracks) {
    console.log(`\n  ➤ Seeding ${track} track...`)
    const questions = []

    // Q1-10: real questions
    for (let i = 0; i < 10; i++) {
      const q = realQuestions[track][i]
      questions.push({
        topic_id: topic1.id,
        order_index: i + 1,
        track,
        type: 'mcq',
        prompt: q.prompt,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        is_free: true,
      })
    }

    // Q11-50: practice questions (free)
    for (let i = 11; i <= 50; i++) {
      const labels = { story: "ARIA's Logic Challenge", levels: 'Logic Practice', sandbox: 'Challenge' }
      const answers = {
        story: { prompt: `${labels[track]} #${i}: Which value makes the AND gate output TRUE?`, options: ['Both inputs = 1','One input = 1','Both inputs = 0','Either input = 0'], correct_answer: 'Both inputs = 1', explanation: 'The AND gate outputs TRUE only when ALL inputs are TRUE (1).' },
        levels: { prompt: `Logic Practice #${i}: Simplify A AND 1.`, options: ['0','1','A',"A'"], correct_answer: 'A', explanation: 'Identity Law: A AND 1 = A. Multiplying by 1 in Boolean leaves the value unchanged.' },
        sandbox: { prompt: `Challenge #${i}: Evaluate NOT(NOT A).`, options: ['0','1','A','NOT A'], correct_answer: 'A', explanation: 'Double negation law: NOT(NOT A) = A. Negating twice returns the original value.' },
      }
      const q = answers[track]
      questions.push({ topic_id: topic1.id, order_index: i, track, type: 'mcq', ...q, is_free: true })
    }

    // Q51-55: paid questions
    for (let i = 51; i <= 55; i++) {
      const paid = {
        story: { prompt: `ARIA's Advanced Challenge #${i}: What is the output of NOT(0 AND 1)?`, options: ['0','1','Undefined','2'], correct_answer: '1', explanation: 'First: 0 AND 1 = 0. Then NOT(0) = 1. Working inside-out gives us 1!' },
        levels: { prompt: `Advanced Logic #${i}: Apply De Morgan's Law to NOT(A AND B).`, options: ['NOT A AND NOT B','NOT A OR NOT B','A OR B','A AND B'], correct_answer: 'NOT A OR NOT B', explanation: "De Morgan's Law: NOT(A AND B) = NOT A OR NOT B." },
        sandbox: { prompt: `Expert #${i}: Minimise using Karnaugh map: F = A'B + AB' + AB`, options: ['A + B',"A' + B",'A OR B','NOT A AND B'], correct_answer: 'A + B', explanation: 'The three minterms cover all cases except A=0,B=0. Karnaugh map groups them as A + B.' },
      }
      questions.push({ topic_id: topic1.id, order_index: i, track, type: 'mcq', ...paid[track], is_free: false })
    }

    // Insert in batches of 20
    for (let b = 0; b < questions.length; b += 20) {
      const batch = questions.slice(b, b + 20)
      const { error } = await supabase.from('questions').insert(batch)
      if (error) {
        console.error(`  ❌ Error inserting batch:`, error.message)
        process.exit(1)
      }
      totalInserted += batch.length
      process.stdout.write(`     ${totalInserted} inserted...\r`)
    }
    console.log(`  ✅ ${track}: 55 questions seeded`)
  }

  console.log(`\n✅ Done! ${totalInserted} questions seeded across 3 tracks.`)

  // Final verification
  const { count: finalCount } = await supabase
    .from('questions')
    .select('id', { count: 'exact', head: true })
    .eq('topic_id', topic1.id)

  console.log(`\n📊 Verification: ${finalCount} questions in database`)
  console.log('   Expected: 165 (55 × 3 tracks)')
  console.log(finalCount === 165 ? '\n🎉 Perfect! All good.' : '\n⚠️  Count mismatch — check for errors above.')
}

main().catch(console.error)
