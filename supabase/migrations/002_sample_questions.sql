-- 002_sample_questions.sql
-- Seeds 55 questions × 3 tracks for Topic 1: Logic & Boolean Algebra
-- Questions 1-50: is_free = true | Questions 51-55: is_free = false (paywall test)

do $$
declare
  topic1_id uuid;
begin
  select id into topic1_id from public.topics where order_index = 1;

  -- STORY TRACK (ages 6-10)
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (topic1_id, 1, 'story', 'mcq', 'ARIA says: "The robot door only opens when BOTH the red button AND the blue button are pressed. What kind of gate is this?"', '["AND gate","OR gate","NOT gate","XOR gate"]', 'AND gate', 'An AND gate only outputs TRUE when ALL inputs are TRUE — just like the door needing both buttons!', true),
  (topic1_id, 2, 'story', 'mcq', 'ARIA says: "The alarm rings if the window is open OR the door is open. Which gate does this remind you of?"', '["AND gate","OR gate","NOT gate","NAND gate"]', 'OR gate', 'An OR gate outputs TRUE when AT LEAST ONE input is TRUE — either one being open triggers the alarm!', true),
  (topic1_id, 3, 'story', 'mcq', 'ARIA shows a switch: when it is ON the light turns OFF, and when it is OFF the light turns ON. What operation is this?', '["AND","OR","NOT","XOR"]', 'NOT', 'A NOT gate flips the input — TRUE becomes FALSE and FALSE becomes TRUE!', true),
  (topic1_id, 4, 'story', 'mcq', 'ARIA says: "In the robot world, TRUE means 1 and FALSE means 0. What is 1 AND 1?"', '["0","1","2","TRUE or FALSE"]', '1', 'AND of 1 and 1 is 1 (TRUE) — both inputs are TRUE so the output is TRUE!', true),
  (topic1_id, 5, 'story', 'mcq', 'ARIA says: "What is 1 OR 0?"', '["0","1","10","Neither"]', '1', 'OR outputs 1 (TRUE) if at least one input is 1. Since one input is 1, the answer is 1!', true),
  (topic1_id, 6, 'story', 'mcq', 'ARIA says: "NOT 1 equals...?"', '["0","1","2","-1"]', '0', 'NOT flips the value! NOT 1 = 0, and NOT 0 = 1.', true),
  (topic1_id, 7, 'story', 'mcq', 'ARIA shows two paths to the treasure chest. You can only walk through if path A AND path B are both clear. What if path A is blocked?', '["You can still reach the chest","You cannot reach the chest","It depends","Only path B matters"]', 'You cannot reach the chest', 'AND means ALL paths must be clear. If even one is blocked, you cannot get through!', true),
  (topic1_id, 8, 'story', 'mcq', 'ARIA''s robot has two sensors. The alarm sounds if sensor A OR sensor B detects movement. Both sensors detect something. Does the alarm sound?', '["Yes","No","Only if both detect at the same time","Cannot tell"]', 'Yes', 'OR only needs ONE input to be TRUE. Both being TRUE still gives a TRUE output!', true),
  (topic1_id, 9, 'story', 'mcq', 'What does Boolean mean in computing?', '["A type of number","True or False values only","A programming language","A kind of robot"]', 'True or False values only', 'Boolean refers to a system with only two values — TRUE (1) and FALSE (0) — named after mathematician George Boole!', true),
  (topic1_id, 10, 'story', 'mcq', 'ARIA says: "0 AND 0 equals...?"', '["0","1","0 or 1","Undefined"]', '0', 'AND only outputs 1 when BOTH inputs are 1. Here both are 0, so the result is 0.', true);

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select topic1_id, n, 'story', 'mcq',
    'ARIA''s Logic Challenge #' || n || ': Which value makes the AND gate output TRUE?',
    '["Both inputs = 1","One input = 1","Both inputs = 0","Either input = 0"]',
    'Both inputs = 1', 'The AND gate outputs TRUE only when ALL inputs are TRUE (1).', true
  from generate_series(11, 50) as n;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select topic1_id, n, 'story', 'mcq',
    'ARIA''s Advanced Challenge #' || n || ': What is the output of NOT(0 AND 1)?',
    '["0","1","Undefined","2"]',
    '1', 'First: 0 AND 1 = 0. Then NOT(0) = 1. Working inside-out gives us 1!', false
  from generate_series(51, 55) as n;

  -- LEVELS TRACK (ages 11-14)
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (topic1_id, 1, 'levels', 'mcq', 'In Boolean algebra, what is the result of A AND B when A=1 and B=0?', '["0","1","A","B"]', '0', 'AND outputs 1 only when BOTH inputs are 1. Since B=0, the result is 0.', true),
  (topic1_id, 2, 'levels', 'mcq', 'Which logic gate outputs TRUE only when both inputs are TRUE?', '["OR gate","AND gate","NOT gate","XOR gate"]', 'AND gate', 'The AND gate is the most restrictive — ALL inputs must be TRUE for the output to be TRUE.', true),
  (topic1_id, 3, 'levels', 'mcq', 'What is the Boolean expression for a NOT gate applied to input A?', '["A+B","A·B","A''","A+A''"]', 'A''', 'A'' (A prime) or ¬A represents the NOT operation, which inverts the input.', true),
  (topic1_id, 4, 'levels', 'mcq', 'Which law states that A + 0 = A?', '["Commutative Law","Identity Law","Complement Law","Absorption Law"]', 'Identity Law', 'The Identity Law says adding 0 (OR with 0) or multiplying by 1 (AND with 1) leaves a value unchanged.', true),
  (topic1_id, 5, 'levels', 'mcq', 'What does A OR A'' always equal?', '["0","1","A","A''"]', '1', 'A variable OR its complement always equals 1 — this is the Complement Law!', true),
  (topic1_id, 6, 'levels', 'mcq', 'Evaluate: 1 AND (0 OR 1)', '["0","1","2","Cannot determine"]', '1', 'First evaluate the brackets: 0 OR 1 = 1. Then 1 AND 1 = 1.', true),
  (topic1_id, 7, 'levels', 'mcq', 'Which gate produces the opposite output of an AND gate?', '["OR","NOR","NAND","XOR"]', 'NAND', 'NAND = NOT AND. It inverts the AND output, so it outputs 0 only when both inputs are 1.', true),
  (topic1_id, 8, 'levels', 'mcq', 'What is the result of A AND A?', '["0","1","A","A''"]', 'A', 'Idempotent Law: A AND A = A. A variable ANDed with itself returns itself.', true),
  (topic1_id, 9, 'levels', 'mcq', 'In a truth table for a 2-input gate, how many rows are needed?', '["2","3","4","8"]', '4', 'Two inputs can each be 0 or 1, giving 2² = 4 combinations: 00, 01, 10, 11.', true),
  (topic1_id, 10, 'levels', 'mcq', 'What does a truth table show?', '["The speed of a circuit","All possible input/output combinations for a logic gate","How much power a gate uses","The physical size of a chip"]', 'All possible input/output combinations for a logic gate', 'A truth table lists every possible combination of inputs and the corresponding output for a logic expression.', true);

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select topic1_id, n, 'levels', 'mcq',
    'Logic Practice #' || n || ': Simplify A AND 1.',
    '["0","1","A","A''"]',
    'A', 'Identity Law: A AND 1 = A. Multiplying by 1 in Boolean leaves the value unchanged.', true
  from generate_series(11, 50) as n;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select topic1_id, n, 'levels', 'mcq',
    'Advanced Logic #' || n || ': Apply De Morgan''s Law to NOT(A AND B).',
    '["NOT A AND NOT B","NOT A OR NOT B","A OR B","A AND B"]',
    'NOT A OR NOT B', 'De Morgan''s Law: NOT(A AND B) = NOT A OR NOT B. The NOT distributes and the AND flips to OR.', false
  from generate_series(51, 55) as n;

  -- SANDBOX TRACK (ages 15-18)
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (topic1_id, 1, 'sandbox', 'mcq', 'Write a Boolean expression for: output is TRUE when A is TRUE and B is FALSE.', '["A AND B","A OR NOT B","A AND NOT B","NOT A AND B"]', 'A AND NOT B', 'We need A=1 AND B=0. "B is FALSE" means NOT B. So the expression is A AND NOT B.', true),
  (topic1_id, 2, 'sandbox', 'mcq', 'Simplify using the Absorption Law: A OR (A AND B)', '["A","B","A AND B","A OR B"]', 'A', 'Absorption Law: A OR (A AND B) = A. The more complex term is absorbed by the simpler one.', true),
  (topic1_id, 3, 'sandbox', 'mcq', 'Which of the following is equivalent to NOT(A OR B) by De Morgan''s Law?', '["NOT A OR NOT B","NOT A AND NOT B","A AND B","NOT A AND B"]', 'NOT A AND NOT B', 'De Morgan''s Law: NOT(A OR B) = NOT A AND NOT B. The OR flips to AND when NOT is distributed.', true),
  (topic1_id, 4, 'sandbox', 'mcq', 'A half adder circuit has two inputs and two outputs: Sum and Carry. Which gates implement the Sum output?', '["AND gate","OR gate","XOR gate","NAND gate"]', 'XOR gate', 'XOR produces 1 when inputs differ — exactly what we need for binary addition (1+1 carries, so sum=0).', true),
  (topic1_id, 5, 'sandbox', 'mcq', 'Simplify: (A AND B) OR (A AND NOT B)', '["A","B","A AND B","NOT A"]', 'A', 'Factor out A: A AND (B OR NOT B). Since B OR NOT B = 1, this simplifies to A AND 1 = A.', true),
  (topic1_id, 6, 'sandbox', 'mcq', 'In Python, what is the output of: True and False or True?', '["False","True","None","Error"]', 'True', 'Operator precedence: AND first → (True AND False) = False. Then False OR True = True.', true),
  (topic1_id, 7, 'sandbox', 'mcq', 'Which Boolean expression is a tautology (always TRUE)?', '["A AND B","A OR NOT A","NOT A AND A","A XOR A"]', 'A OR NOT A', 'A OR NOT A is always TRUE regardless of A — this is the Complement Law!', true),
  (topic1_id, 8, 'sandbox', 'mcq', 'You have 3 boolean inputs. How many rows in the truth table?', '["3","6","8","16"]', '8', '3 inputs → 2³ = 8 rows. Each additional input doubles the number of combinations.', true),
  (topic1_id, 9, 'sandbox', 'mcq', 'NAND is called a "universal gate" because:', '["It is the fastest gate","Any Boolean function can be built using only NAND gates","It uses the least power","It has the most inputs"]', 'Any Boolean function can be built using only NAND gates', 'NAND is functionally complete — AND, OR, NOT, and any other gate can be constructed from NAND gates alone.', true),
  (topic1_id, 10, 'sandbox', 'mcq', 'Which law allows us to rearrange: A AND B = B AND A?', '["Associative Law","Distributive Law","Commutative Law","Identity Law"]', 'Commutative Law', 'The Commutative Law states that the order of operands does not affect the result in AND and OR operations.', true);

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select topic1_id, n, 'sandbox', 'mcq',
    'Challenge #' || n || ': Evaluate NOT(NOT A).',
    '["0","1","A","NOT A"]',
    'A', 'Double negation law: NOT(NOT A) = A. Negating twice returns the original value.', true
  from generate_series(11, 50) as n;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select topic1_id, n, 'sandbox', 'mcq',
    'Expert #' || n || ': Minimise using Karnaugh map: F = A''B + AB'' + AB',
    '["A + B","A'' + B","A OR B","NOT A AND B"]',
    'A + B', 'The three minterms cover all cases except A=0,B=0. Karnaugh map groups them as A + B.', false
  from generate_series(51, 55) as n;

end;
$$;
