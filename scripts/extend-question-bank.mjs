import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const files = [
  '002_sample_questions.sql',
  '007_topics_2_3_questions.sql',
  '008_topics_4_5_questions.sql',
  '009_topics_6_7_questions.sql',
  '010_topics_8_9_10_questions.sql',
]

// Matches each "insert ... select <var>, n, '<track>', 'mcq', <body> from generate_series(a, b) as n [on conflict ...;]" block
const blockRe =
  /insert into public\.questions \(topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free\)\n  select (\w+), n, '(\w+)', 'mcq',\n((?:.*\n)*?)  from generate_series\((\d+), (\d+)\) as n(\n {2}on conflict \(topic_id, order_index, track\) do nothing;|;)/g

const idLineRe = /select id into (\w+)\s*from public\.topics where order_index = (\d+);/g

let out = []
let total = 0
const topicVarToOrderIndex = new Map()

for (const file of files) {
  const sql = readFileSync(join(root, 'supabase/migrations', file), 'utf8')
  let idm
  idLineRe.lastIndex = 0
  while ((idm = idLineRe.exec(sql))) {
    topicVarToOrderIndex.set(idm[1], Number(idm[2]))
  }

  let m
  blockRe.lastIndex = 0
  while ((m = blockRe.exec(sql))) {
    const [, topicVar, track, body, startStr, endStr, terminator] = m
    const start = Number(startStr)
    const end = Number(endStr)
    const onConflict = terminator.includes('on conflict')
      ? '\n  on conflict (topic_id, order_index, track) do nothing;'
      : ';'

    if (start === 11 && end === 50) {
      // free template (questions 11-50) -> extend with 56-100
      out.push(
        `  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)\n` +
          `  select ${topicVar}, n, '${track}', 'mcq',\n${body}` +
          `  from generate_series(56, 100) as n${onConflict}`
      )
      total += 45
    } else if (start === 51 && end === 55) {
      // paywall template (questions 51-55) -> extend with 101-110
      out.push(
        `  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)\n` +
          `  select ${topicVar}, n, '${track}', 'mcq',\n${body}` +
          `  from generate_series(101, 110) as n${onConflict}`
      )
      total += 10
    }
  }
}

console.log(`generated ${out.length} insert blocks, ${total} new question rows`)

const declares = [...topicVarToOrderIndex.keys()].map((v) => `  ${v} uuid;`).join('\n')
const selects = [...topicVarToOrderIndex.entries()]
  .map(([v, idx]) => `  select id into ${v} from public.topics where order_index = ${idx};`)
  .join('\n')

const header = `-- 011_extend_questions_to_110.sql
-- Doubles each topic's question bank from 55 to 110 questions per track.
-- Reuses the existing templated-bulk patterns (generate_series), continuing
-- the numbering: 56-100 are free template questions, 101-110 are paywall.

do $$
declare
${declares}
begin
${selects}

`

const footer = `
end;
$$;
`

writeFileSync(
  join(root, 'supabase/migrations/011_extend_questions_to_110.sql'),
  header + out.join('\n\n') + footer
)
console.log('wrote supabase/migrations/011_extend_questions_to_110.sql')
