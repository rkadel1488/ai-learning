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
  {
    slug: 'sequencing-and-control-flow-16',
    question:
      'A set of instructions for making a sandwich says: 1) Put the sandwich in a bag, 2) Add the filling, 3) Lay out two slices of bread, 4) Close the sandwich. What is wrong with this sequence?',
    options: [
      'Nothing is wrong, sandwiches can be made in any order',
      'Step 1 happens far too early, before the bread, filling, and closing steps that need to come first',
      'There should be more than two slices of bread',
      'The filling step should be removed entirely',
    ],
    correctIndex: 1,
    explanation:
      'Bagging the sandwich before it even has bread, filling, or is closed means the later steps cannot be done properly, so the order of steps breaks the plan.',
  },
  {
    slug: 'sequencing-and-control-flow-17',
    question:
      'A washing machine program lists: 1) Spin dry the clothes, 2) Add detergent, 3) Fill with water, 4) Wash the clothes. In which order should these steps actually run for the laundry to come out clean?',
    options: [
      'The order shown is already correct',
      'Fill with water, add detergent, wash the clothes, spin dry the clothes',
      'Spin dry the clothes, wash the clothes, fill with water, add detergent',
      'Add detergent, spin dry the clothes, fill with water, wash the clothes',
    ],
    correctIndex: 1,
    explanation:
      'Water and detergent need to be in the machine before washing can happen, and spinning dry only makes sense after the wash is done, so the correct sequence is fill, add detergent, wash, then spin dry.',
  },
  {
    slug: 'sequencing-and-control-flow-18',
    question:
      'Instructions say: "Repeat 7 times: take one step forward." How many total steps forward are taken?',
    options: ['6', '7', '8', '14'],
    correctIndex: 1,
    explanation:
      'A "repeat 7 times" loop performs its single inner action exactly 7 times, so 7 steps forward are taken in total.',
  },
  {
    slug: 'sequencing-and-control-flow-19',
    question:
      'Instructions say: "Repeat 5 times: [draw a square, color it blue]." How many total actions (squares drawn plus colorings) happen?',
    options: ['5', '7', '10', '15'],
    correctIndex: 2,
    explanation:
      'Each of the 5 repetitions performs 2 actions (draw, then color), so the total number of actions is 5 x 2 = 10.',
  },
  {
    slug: 'sequencing-and-control-flow-20',
    question:
      'A loop says: "Start at 2. Repeat 4 times: print the number, then add 2 to the number." What numbers get printed, in order?',
    options: ['2, 4, 6, 8', '2, 4, 6, 8, 10', '0, 2, 4, 6', '2, 3, 4, 5'],
    correctIndex: 0,
    explanation:
      'Starting at 2 and adding 2 after each print across 4 repetitions prints 2, then 4, then 6, then 8, stopping right after the 4th repetition.',
  },
  {
    slug: 'sequencing-and-control-flow-21',
    question:
      'Instructions say: "If the backpack weighs more than 10 pounds, take out a book. Otherwise, zip it up and go." The backpack weighs exactly 10 pounds. What should happen?',
    options: [
      'A book is taken out, because the weight is at the limit',
      'The backpack is zipped up and the person goes, because 10 is not more than 10',
      'Nothing happens, since the condition is unclear',
      'Both actions happen at the same time',
    ],
    correctIndex: 1,
    explanation:
      'The condition checks for "more than 10," and exactly 10 does not satisfy that, so the condition is false and the otherwise branch (zip up and go) runs.',
  },
  {
    slug: 'sequencing-and-control-flow-22',
    question:
      'Instructions say: "If the traffic light is red, stop. If it is yellow, slow down. If it is green, go." The light is yellow. What does the driver do?',
    options: ['Stops', 'Slows down', 'Goes', 'Does all three actions'],
    correctIndex: 1,
    explanation:
      'Each condition is checked in order, and since the light is yellow, only the matching "slow down" branch runs while the other branches are skipped.',
  },
  {
    slug: 'sequencing-and-control-flow-23',
    question:
      'Instructions say: "Repeat 5 times: if the coin flip is heads, add a point; otherwise, add nothing." The flips come out heads, tails, heads, heads, tails. How many points are added in total?',
    options: ['2', '3', '4', '5'],
    correctIndex: 1,
    explanation:
      'The condition is checked fresh on each of the 5 repetitions, and it is true (heads) on the 1st, 3rd, and 4th flips, giving exactly 3 points.',
  },
  {
    slug: 'sequencing-and-control-flow-24',
    question:
      'A vending machine loop says: "Repeat 5 times: ask for a snack code, then dispense the snack." A separate rule says: "If the machine runs out of snacks, stop immediately." The machine runs out after the 3rd snack is dispensed. How many times does the loop actually run?',
    options: ['5', '4', '3', '0'],
    correctIndex: 2,
    explanation:
      'The "stop immediately" rule interrupts the loop as soon as the out-of-snacks condition becomes true, so the loop only completes 3 repetitions instead of all 5.',
  },
  {
    slug: 'sequencing-and-control-flow-25',
    question:
      'A double loop says: "Repeat 3 times: [repeat 2 times: ring a bell]." How many total bell rings happen?',
    options: ['3', '5', '6', '9'],
    correctIndex: 2,
    explanation:
      'The inner loop rings the bell 2 times during each pass of the outer loop, and the outer loop runs 3 times, so the total is 3 x 2 = 6 bell rings.',
  },
  {
    slug: 'sequencing-and-control-flow-26',
    question:
      'A nested loop says: "Repeat 4 times: [repeat 3 times: stack one block]." How many blocks are stacked in total, and how does changing the outer loop to 5 times instead of 4 affect the total?',
    options: [
      '12 blocks total; changing the outer loop to 5 would make it 15 blocks',
      '7 blocks total; changing the outer loop to 5 would make it 8 blocks',
      '12 blocks total; changing the outer loop to 5 would not change the total',
      '4 blocks total; changing the outer loop to 5 would make it 5 blocks',
    ],
    correctIndex: 0,
    explanation:
      'The inner loop stacks 3 blocks each time the outer loop runs, so 4 outer repetitions give 4 x 3 = 12 blocks, and increasing the outer loop to 5 would give 5 x 3 = 15 blocks.',
  },
  {
    slug: 'sequencing-and-control-flow-27',
    question:
      'A savings loop says: "Start with 1 dollar saved. While the saved amount is less than 8 dollars, repeat: add 2 dollars to the savings." How many times does the addition step run before the loop stops?',
    options: ['2 times', '3 times', '4 times', '8 times'],
    correctIndex: 2,
    explanation:
      'The savings go 1, then 3, then 5, then 7, then 9: the condition (less than 8) is true before each of those first four additions, so the addition runs 4 times, and the loop stops once savings reach 9, since 9 is no longer less than 8.',
  },
  {
    slug: 'sequencing-and-control-flow-28',
    question:
      'A set of instructions for planting a seed says: 1) Water the soil, 2) Cover the seed with soil, 3) Dig a small hole, 4) Drop the seed in the hole. What is the correct order for these steps?',
    options: [
      'Dig a small hole, drop the seed in the hole, cover the seed with soil, water the soil',
      'Water the soil, dig a small hole, drop the seed in the hole, cover the seed with soil',
      'Drop the seed in the hole, dig a small hole, cover the seed with soil, water the soil',
      'The order shown is already correct',
    ],
    correctIndex: 0,
    explanation:
      'You need a hole before you can drop the seed in it, and the seed needs to be covered before watering makes sense on top, so the correct order is dig, drop, cover, then water.',
  },
  {
    slug: 'sequencing-and-control-flow-29',
    question:
      'Instructions for charging a phone say: 1) Plug the charger into the wall, 2) Plug the cable into the phone, 3) Wait for the battery to fill, 4) Unplug everything. A person does step 4 right after step 1. What goes wrong?',
    options: [
      'Nothing goes wrong, the phone still charges normally',
      'The phone is unplugged before it ever gets connected or charged, so it never actually charges',
      'The charger gets damaged from being plugged in too early',
      'The steps need a loop instead of a sequence',
    ],
    correctIndex: 1,
    explanation:
      'Unplugging everything right after plugging in the wall charger skips the connecting and waiting steps entirely, so the phone never actually receives any charge.',
  },
  {
    slug: 'sequencing-and-control-flow-30',
    question:
      'Instructions say: "Repeat 6 times: take one breath." How many total breaths happen?',
    options: ['5', '6', '7', '12'],
    correctIndex: 1,
    explanation:
      'A "repeat 6 times" loop performs its single inner action exactly 6 times, so 6 breaths happen in total.',
  },
  {
    slug: 'sequencing-and-control-flow-31',
    question:
      'A loop says: "Start at 20. Repeat 5 times: print the number, then subtract 4 from the number." What numbers get printed, in order?',
    options: [
      '20, 16, 12, 8, 4',
      '16, 12, 8, 4, 0',
      '20, 16, 12, 8',
      '20, 15, 10, 5, 0',
    ],
    correctIndex: 0,
    explanation:
      'Starting at 20 and subtracting 4 after each print across 5 repetitions prints 20, then 16, then 12, then 8, then 4, stopping right after the 5th repetition.',
  },
  {
    slug: 'sequencing-and-control-flow-32',
    question:
      'Instructions say: "Repeat 4 times: [hop once, clap twice]." How many total actions (hops plus claps) happen?',
    options: ['8', '9', '12', '16'],
    correctIndex: 2,
    explanation:
      'Each repetition performs 1 hop and 2 claps, which is 3 actions per repetition, and with 4 repetitions that gives 4 x 3 = 12 actions total.',
  },
  {
    slug: 'sequencing-and-control-flow-33',
    question:
      'Instructions say: "If the test score is 90 or above, give an A. Else if the score is 80 or above, give a B. Else if the score is 70 or above, give a C. Otherwise, give a D." A student scores exactly 80. What grade do they get?',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 1,
    explanation:
      'The first condition (90 or above) is false for a score of 80, but the second condition (80 or above) is true, so the B branch runs and the later branches are skipped.',
  },
  {
    slug: 'sequencing-and-control-flow-34',
    question:
      'Instructions say: "If the weather is cold and it is also windy, wear a heavy coat. Otherwise, wear a light jacket." It is cold but not windy. What does the person wear?',
    options: [
      'A heavy coat, because it is cold',
      'A light jacket, because both conditions must be true for the heavy coat branch, and windy is false',
      'No jacket at all, since only one condition is true',
      'Both a heavy coat and a light jacket',
    ],
    correctIndex: 1,
    explanation:
      'The heavy coat branch requires cold AND windy to both be true; since it is not windy, that combined condition is false, so the otherwise branch (light jacket) runs instead.',
  },
  {
    slug: 'sequencing-and-control-flow-35',
    question:
      'Instructions say: "Repeat 5 times: [if the number is even, say \'even\'; otherwise, say \'odd\']." The numbers checked in order are 3, 4, 7, 8, 10. How many times does the instructions say "even"?',
    options: ['2', '3', '4', '5'],
    correctIndex: 1,
    explanation:
      'Checking each number fresh: 3 is odd, 4 is even, 7 is odd, 8 is even, and 10 is even, so "even" is said exactly 3 times (for 4, 8, and 10).',
  },
  {
    slug: 'sequencing-and-control-flow-36',
    question:
      'A loop says: "While the basket has fewer than 5 apples, repeat: add 1 apple." The basket starts with 2 apples. How many times does the loop add an apple before it stops?',
    options: ['2 times', '3 times', '4 times', '5 times'],
    correctIndex: 1,
    explanation:
      'The basket goes 2, 3, 4, then 5: the condition (fewer than 5) is true before each of the first three additions, so the loop adds an apple 3 times and stops once the basket reaches 5.',
  },
  {
    slug: 'sequencing-and-control-flow-37',
    question:
      'A nested loop says: "Repeat 3 times: [repeat 4 times: water one plant]." A gardener changes the inner loop from 4 times to 6 times. How many total plants get watered now, and how many more is that than before?',
    options: [
      '18 plants total, which is 6 more than before',
      '12 plants total, which is 6 more than before',
      '9 plants total, which is 3 more than before',
      '18 plants total, which is 12 more than before',
    ],
    correctIndex: 0,
    explanation:
      'Before the change, watering was 3 x 4 = 12 plants; after changing the inner loop to 6, it becomes 3 x 6 = 18 plants, which is 6 more than the original 12.',
  },
  {
    slug: 'sequencing-and-control-flow-38',
    question:
      'A loop is supposed to stop "once 3 errors have been found," but it is written as: "Repeat: check a file. Stop the loop after more than 3 errors have been found." If errors are found one at a time (1 error per file, no skipping), how many files get checked before the loop stops, and what mistake does this make?',
    options: [
      'It checks exactly 3 files; there is no mistake',
      'It checks 4 files instead of 3, because "more than 3" does not stop until the count reaches 4, one extra repetition past what was intended',
      'It never stops, because "more than 3" can never be reached',
      'It checks 2 files, stopping one repetition too early',
    ],
    correctIndex: 1,
    explanation:
      'The stopping condition needed was "3 or more," but "more than 3" only becomes true once the count hits 4, so the loop runs one extra, unintended repetition before stopping.',
  },
  {
    slug: 'sequencing-and-control-flow-39',
    question:
      'Instructions say: "Repeat 3 times: [repeat 3 times: if the switch is on, add 1 point]." The switch is on for every single check. How many total points are added?',
    options: ['3', '6', '9', '12'],
    correctIndex: 2,
    explanation:
      'The inner loop checks the condition 3 times for every pass of the outer loop, and since the switch is always on, each inner loop adds 3 points; with the outer loop running 3 times, the total is 3 x 3 = 9 points.',
  },
]
