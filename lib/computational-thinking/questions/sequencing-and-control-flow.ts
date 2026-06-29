import type { CTQuestion } from '../types'

export const sequencingAndControlFlow: CTQuestion[] = [
  {
    slug: 'sequencing-and-control-flow-1',
    question:
      "A robot's morning routine says: 1) Put on shoes, 2) Put on socks, 3) Get out of bed, 4) Brush teeth. What is wrong with this sequence?",
    options: [
      'The steps are in the wrong order, so the robot would put on shoes before socks',
      'There are too many steps for a morning routine',
      'Brushing teeth should never be part of a sequence',
      'Nothing is wrong, robots can do steps in any order',
    ],
    correctIndex: 0,
    explanation:
      'Sequencing means steps must happen in an order that actually makes sense; putting on shoes before socks (and getting out of bed last) would produce a broken result even though every step is listed.',
  },
  {
    slug: 'sequencing-and-control-flow-2',
    question:
      'Why does the order of steps matter when writing instructions for a computer or robot?',
    options: [
      'It does not matter, computers can rearrange steps automatically',
      'Each step usually depends on the result of the steps before it, so a different order can change or break the outcome',
      'Order only matters if there are more than 10 steps',
      'Order only matters when loops are involved',
    ],
    correctIndex: 1,
    explanation:
      'Sequencing matters because later steps often rely on what earlier steps set up; swapping the order can produce a completely different, often broken, result.',
  },
  {
    slug: 'sequencing-and-control-flow-3',
    question:
      'Instructions say: "Repeat 4 times: clap your hands." How many total claps happen?',
    options: ['3', '4', '5', '8'],
    correctIndex: 1,
    explanation:
      'A "repeat 4 times" loop runs the single instruction inside it exactly 4 times, so there are 4 claps in total.',
  },
  {
    slug: 'sequencing-and-control-flow-4',
    question:
      'Instructions say: "Repeat 3 times: [say hello, wave]." How many total actions (hellos plus waves) happen?',
    options: ['3', '4', '5', '6'],
    correctIndex: 3,
    explanation:
      'Each repetition of the loop performs both actions inside it (say hello and wave), so 3 repetitions of 2 actions each gives 3 x 2 = 6 actions total.',
  },
  {
    slug: 'sequencing-and-control-flow-5',
    question:
      'A loop says: "Start at 1. Repeat 5 times: print the number, then add 1 to the number." What is the last number printed?',
    options: ['4', '5', '6', '1'],
    correctIndex: 1,
    explanation:
      'Starting at 1, the loop prints 1, 2, 3, 4, then 5 across its 5 repetitions before adding 1 each time, so the last number printed is 5.',
  },
  {
    slug: 'sequencing-and-control-flow-6',
    question:
      'Instructions say: "If it is raining, take an umbrella. Otherwise, wear sunglasses." It is sunny outside. What does the person do?',
    options: [
      'Takes an umbrella',
      'Wears sunglasses',
      'Does both, just in case',
      'Does nothing, because the condition was not explained',
    ],
    correctIndex: 1,
    explanation:
      "Since it is not raining, the condition is false, so the instructions skip the umbrella step and follow the 'otherwise' branch, wearing sunglasses.",
  },
  {
    slug: 'sequencing-and-control-flow-7',
    question:
      'A set of instructions says: "If the box is heavy, ask for help. Otherwise, carry it alone." A robot checks the box and finds it is heavy, but it still carries it alone. What went wrong?',
    options: [
      'The instructions were a loop, not a branch',
      'The robot correctly followed the instructions',
      'The robot did not follow the condition correctly; it should have asked for help since the box was heavy',
      'There is no way to know without more information',
    ],
    correctIndex: 2,
    explanation:
      'The condition "if heavy" was true, so the correct branch to follow was "ask for help," not "carry it alone"; the robot made an error in following the conditional logic.',
  },
  {
    slug: 'sequencing-and-control-flow-8',
    question:
      'Instructions say: "Repeat 3 times: if the light is green, walk; otherwise, wait." The light is green for all 3 checks. What happens?',
    options: [
      'The person waits 3 times',
      'The person walks once and waits twice',
      'The person walks 3 times',
      'The person does nothing because the condition only runs once',
    ],
    correctIndex: 2,
    explanation:
      'The if/else check happens fresh on every one of the 3 repetitions, and since the light is green every time, the "walk" branch is chosen all 3 times.',
  },
  {
    slug: 'sequencing-and-control-flow-9',
    question:
      'A recipe loop says: "Repeat 6 times: add 1 cup of flour." Then a separate step says: "If the bowl is full, stop adding flour." After 4 repetitions, the bowl becomes full. What should happen?',
    options: [
      'All 6 repetitions still happen no matter what',
      'The loop stops early after the 4th repetition because the condition was met',
      'The recipe restarts from the first repetition',
      'The loop skips to the 6th repetition immediately',
    ],
    correctIndex: 1,
    explanation:
      'When a condition inside or alongside a loop becomes true, the loop should stop as soon as that condition is detected, so adding stops after repetition 4 rather than continuing to 6.',
  },
  {
    slug: 'sequencing-and-control-flow-10',
    question:
      'Which instruction describes an infinite loop?',
    options: [
      '"Repeat 10 times: jump."',
      '"While the door is locked, keep turning the key," where the key never unlocks the door',
      '"If the door is locked, turn the key once."',
      '"Repeat until you turn the key 3 times."',
    ],
    correctIndex: 1,
    explanation:
      'A loop that keeps checking a condition that never becomes true (the door never unlocks) will repeat forever, which is the definition of an infinite loop.',
  },
  {
    slug: 'sequencing-and-control-flow-11',
    question:
      'Why are infinite loops usually considered a mistake in a set of instructions?',
    options: [
      'They make the instructions run faster than intended',
      'They cause the instructions to repeat forever and never reach the steps that come after the loop',
      'They are only a problem if there are no conditionals',
      'They always cause an immediate error message and stop the program',
    ],
    correctIndex: 1,
    explanation:
      'An infinite loop never satisfies its stopping condition, so it keeps repeating forever and prevents the rest of the instructions from ever running.',
  },
  {
    slug: 'sequencing-and-control-flow-12',
    question:
      'A counting loop is supposed to print the numbers 1 through 5, but it is written as: "Start at 1. Repeat 4 times: print the number, then add 1." What mistake does this make, and what does it actually print?',
    options: [
      'No mistake, it prints 1 through 5 correctly',
      'It is an off-by-one error; it only prints 1, 2, 3, 4',
      'It is an off-by-one error; it prints 1, 2, 3, 4, 5, 6',
      'It is an infinite loop and never stops',
    ],
    correctIndex: 1,
    explanation:
      'Repeating only 4 times when 5 numbers are needed is a classic off-by-one error: the loop prints 1, 2, 3, 4 and stops one repetition short of printing 5.',
  },
  {
    slug: 'sequencing-and-control-flow-13',
    question:
      'A baker wants to put exactly one sprinkle on each of 10 cookies. They write: "Repeat 10 times: place a cookie on the tray, add a sprinkle." After running the instructions, there are 10 cookies but only 9 sprinkles, because the last sprinkle step was accidentally skipped. What kind of error is this?',
    options: [
      'A sequencing error, because the steps were listed in the wrong order',
      'A counting/off-by-one style error, because one of the expected repetitions did not complete fully',
      'An infinite loop error',
      'Not an error, since 9 sprinkles is close enough to 10',
    ],
    correctIndex: 1,
    explanation:
      'The loop was meant to fully complete all 10 repetitions, but one repetition did not finish its action, resulting in a miscount very similar to an off-by-one mistake.',
  },
  {
    slug: 'sequencing-and-control-flow-14',
    question:
      'Instructions say: "Repeat 3 times: [if the plant is dry, water it; otherwise, skip]." The plant is dry on the 1st check, not dry on the 2nd check, and dry again on the 3rd check. How many times is the plant watered?',
    options: ['0', '1', '2', '3'],
    correctIndex: 2,
    explanation:
      'The condition is checked fresh during each of the 3 repetitions; it is true (dry) on the 1st and 3rd checks but false on the 2nd, so watering happens exactly 2 times.',
  },
  {
    slug: 'sequencing-and-control-flow-15',
    question:
      'A line of dominoes needs to be set up before it can be knocked over. Someone writes: 1) Knock over the first domino, 2) Stand up each domino in a row, 3) Watch them all fall. What is the problem with this plan?',
    options: [
      'There is no problem; the order does not affect the outcome',
      'Step 1 happens before step 2, so the dominoes are knocked over before they are even set up, ruining the result',
      'There are not enough steps to set up dominoes',
      'The plan needs a loop to work correctly',
    ],
    correctIndex: 1,
    explanation:
      'Because step 1 depends on dominoes already being stood up in step 2, doing it first means there is nothing to knock over yet, so the sequence order breaks the intended outcome.',
  },
]
