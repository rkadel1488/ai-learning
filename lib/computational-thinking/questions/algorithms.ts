import type { CTQuestion } from '../types'

export const algorithms: CTQuestion[] = [
  {
    slug: 'algorithms-1',
    question: 'What is an algorithm?',
    options: [
      'A step-by-step set of instructions to solve a problem or complete a task',
      'A type of computer chip found inside laptops',
      'A picture that shows how a website looks',
      'A password used to protect a computer account',
    ],
    correctIndex: 0,
    explanation:
      'An algorithm is simply a clear, ordered list of steps for solving a problem, like the steps in a recipe.',
  },
  {
    slug: 'algorithms-2',
    question: 'Which everyday example is most like following an algorithm?',
    options: [
      'Guessing randomly at an answer with no plan',
      'Following a recipe step by step to bake a cake',
      'Staring at a blank wall for ten minutes',
      'Choosing a favorite color',
    ],
    correctIndex: 1,
    explanation:
      'A recipe gives an exact sequence of steps to follow in order, which is exactly what an algorithm does.',
  },
  {
    slug: 'algorithms-3',
    question: 'Why do good algorithms usually need clear and unambiguous steps?',
    options: [
      'So the algorithm looks longer and more impressive',
      'So that anyone or anything following the steps gets the same correct result every time',
      'Because computers refuse to run short programs',
      'So the algorithm can be skipped entirely',
    ],
    correctIndex: 1,
    explanation:
      'If steps are vague, different people or machines might interpret them differently and get different (possibly wrong) results, so clarity ensures consistent, correct outcomes.',
  },
  {
    slug: 'algorithms-4',
    question:
      'Directions say: "Walk 2 blocks north, turn right, walk 1 block, then the store is on your left." What is this an example of?',
    options: [
      'A random guess',
      'An algorithm for reaching a destination',
      'A math equation',
      'A computer virus',
    ],
    correctIndex: 1,
    explanation:
      'These directions are an ordered sequence of steps that, if followed correctly, reliably lead you to the destination, which is the definition of an algorithm.',
  },
  {
    slug: 'algorithms-5',
    question:
      'Two algorithms both correctly sort a list of 100 numbers. Algorithm A takes about 100 steps, and Algorithm B takes about 10,000 steps. What does this tell us about efficiency?',
    options: [
      'Algorithm B is more efficient because it does more work',
      'Algorithm A is more efficient because it solves the same problem with far fewer steps',
      'Efficiency cannot be compared if both give the correct answer',
      'Algorithm B must be wrong since it has more steps',
    ],
    correctIndex: 1,
    explanation:
      'Efficiency is about how many steps or how much time an algorithm needs, so doing the same job in fewer steps generally makes an algorithm more efficient.',
  },
  {
    slug: 'algorithms-6',
    question:
      'In plain language, what does it mean when programmers say an algorithm runs in "Big O" terms, like O(n)?',
    options: [
      'It describes roughly how the number of steps grows as the input size grows',
      'It tells you the exact color of the output on screen',
      'It means the algorithm is broken and needs fixing',
      'It is the name of the programming language being used',
    ],
    correctIndex: 0,
    explanation:
      'Big O is a simple way to describe how the workload of an algorithm increases as the amount of input data increases, without worrying about exact step counts.',
  },
  {
    slug: 'algorithms-7',
    question:
      'You have a list of 10 items, and a search method checks every single item one by one until it finds a match. If the list grows to 1,000 items, what happens to the worst-case number of checks?',
    options: [
      'It stays exactly the same no matter how big the list gets',
      'It could grow up to 1,000 checks, since you might still need to check every item',
      'It always becomes faster as the list grows',
      'It becomes impossible to search at all',
    ],
    correctIndex: 1,
    explanation:
      'Checking items one by one (linear search) means the worst case grows along with the list size, so a bigger list can require more checks.',
  },
  {
    slug: 'algorithms-8',
    question:
      'Follow these steps: start with total = 0. For each number in the list [2, 4, 6], add the number to total. What is the final value of total?',
    options: ['6', '10', '12', '2'],
    correctIndex: 2,
    explanation:
      'Starting at 0, adding 2 gives 2, adding 4 gives 6, and adding 6 gives 12, so the final total is 12.',
  },
  {
    slug: 'algorithms-9',
    question:
      'Follow these steps: start with a number called result = 1. Multiply result by 2, three times in a row. What is the final value of result?',
    options: ['2', '6', '8', '4'],
    correctIndex: 2,
    explanation:
      'Starting at 1, multiplying by 2 three times gives 1x2=2, 2x2=4, then 4x2=8, so the final result is 8.',
  },
  {
    slug: 'algorithms-10',
    question:
      'The "bubble sort" idea repeatedly compares two neighboring items in a list and swaps them if they are in the wrong order. What happens after going through the whole list enough times this way?',
    options: [
      'The list becomes shorter than it started',
      'Nothing changes no matter how many passes are made',
      'The list ends up sorted, because out-of-order neighbors keep getting swapped into place',
      'All the numbers turn into zeros',
    ],
    correctIndex: 2,
    explanation:
      'By repeatedly swapping neighboring items that are out of order, bubble sort gradually moves larger values toward the end (or smaller toward the start) until the whole list is sorted.',
  },
  {
    slug: 'algorithms-11',
    question:
      'Binary search can quickly find a number in a list, but only if a certain condition is true first. What is that condition?',
    options: [
      'The list must contain only even numbers',
      'The list must already be sorted',
      'The list must have fewer than 5 items',
      'The list must contain no duplicate values',
    ],
    correctIndex: 1,
    explanation:
      'Binary search works by repeatedly checking the middle item and deciding to search the left or right half, which only makes sense if the list is already sorted in order.',
  },
  {
    slug: 'algorithms-12',
    question:
      'Using binary search on a sorted list [1, 3, 5, 7, 9, 11, 13], you check the middle value 7 first and find your target 11 is bigger than 7. What should the algorithm do next?',
    options: [
      'Search only the left half of the list, which has smaller numbers',
      'Search only the right half of the list, which has larger numbers',
      'Start over by checking the very first item in the list',
      'Stop searching because 11 cannot be found',
    ],
    correctIndex: 1,
    explanation:
      'Since the list is sorted and the target is larger than the middle value, the target must be in the right half, so binary search ignores the left half and searches the right half next.',
  },
  {
    slug: 'algorithms-13',
    question:
      'An algorithm to find the "largest number in a list" is written to start by assuming the first item is the largest, then compare it with every other item. Why is this approach considered correct even for tricky cases, like a list with only one number or a list where all numbers are equal?',
    options: [
      'Because it only works correctly when the list has at least three different numbers',
      'Because it still produces the right answer in those edge cases: a one-item list returns that item, and a list of equal numbers returns that repeated value',
      'Because edge cases like these are impossible to test',
      'Because the algorithm always crashes on edge cases, which is expected behavior',
    ],
    correctIndex: 1,
    explanation:
      'A correct algorithm should handle edge cases gracefully, and this approach still gives the right answer when there is only one number or when all numbers are the same.',
  },
  {
    slug: 'algorithms-14',
    question:
      'Follow these steps: start with count = 5. Subtract 1 from count, repeat this 4 times total. What is the final value of count?',
    options: ['0', '1', '4', '5'],
    correctIndex: 1,
    explanation:
      'Starting at 5 and subtracting 1 four times gives 5, 4, 3, 2, 1, so the final value of count is 1.',
  },
  {
    slug: 'algorithms-15',
    question:
      'Follow these steps: start with total = 2. Double total, then add 3 to the result, then double the new result. What is the final value of total?',
    options: ['10', '14', '22', '7'],
    correctIndex: 2,
    explanation:
      'Doubling 2 gives 4, adding 3 gives 7, and doubling 7 gives 14, so the final value of total is 14.',
  },
  {
    slug: 'algorithms-16',
    question:
      'A vending machine follows this process: read the button pressed, check if enough money was inserted, and if so dispense the item and return change. What kind of thing is this process an example of?',
    options: [
      'A random event with no defined steps',
      'An algorithm, since it is a clear sequence of steps that leads to a result',
      'A type of hardware component',
      'An example of an algorithm that never produces the same result twice',
    ],
    correctIndex: 1,
    explanation:
      'The vending machine follows an exact, repeatable sequence of steps to decide what to do, which makes it an algorithm even though no computer code is shown.',
  },
  {
    slug: 'algorithms-17',
    question:
      'A traffic light cycles through green, then yellow, then red, then back to green, always in that same order, forever. What property of a good algorithm does this best demonstrate?',
    options: [
      'The steps happen in a clear, repeatable, well-defined order',
      'The algorithm eventually stops running and never starts again',
      'The algorithm gives a different random order every time',
      'The algorithm requires a person to decide the next color by guessing',
    ],
    correctIndex: 0,
    explanation:
      'The traffic light always moves through its steps in the same defined order, showing how an algorithm can be a clear, repeatable sequence.',
  },
  {
    slug: 'algorithms-18',
    question:
      'You want to alphabetize a shelf of 30 books. Method A picks up each book and inserts it into its correct sorted position among the books already placed, one at a time. Method B picks two random books, checks if they are in order, and swaps if needed, repeating this random pick forever with no plan for stopping. Which is the better algorithm?',
    options: [
      'Method B, because randomness always finds the answer faster',
      'Method A, because it makes steady progress and is guaranteed to finish with a sorted shelf',
      'They are equally good since both involve comparing books',
      'Neither is an algorithm since books are physical objects',
    ],
    correctIndex: 1,
    explanation:
      'Method A (similar to insertion sort) makes guaranteed progress with each book placed, while Method B has no guarantee of ever finishing, so Method A is the better algorithm.',
  },
  {
    slug: 'algorithms-19',
    question:
      'Folding laundry by sorting items into piles by type (shirts, socks, towels) before folding each pile is most similar to which computing idea?',
    options: [
      'Encryption, because clothes are being hidden',
      'Grouping or sorting data before processing it, which often makes the overall task easier and faster',
      'Deleting data permanently',
      'Searching for a single missing sock with no plan',
    ],
    correctIndex: 1,
    explanation:
      'Sorting laundry into groups first is like sorting or organizing data before processing it, which is a common and useful algorithmic strategy.',
  },
  {
    slug: 'algorithms-20',
    question:
      'An algorithm says: "Keep doubling a number until it becomes negative." If you start with a positive whole number and keep doubling it, will this algorithm ever terminate?',
    options: [
      'Yes, after exactly 10 steps every time',
      'No, doubling a positive number repeatedly only makes it larger and larger, so it never becomes negative and the loop never ends',
      'Yes, because doubling eventually produces zero',
      'No, because doubling a positive number always produces a negative number after one step',
    ],
    correctIndex: 1,
    explanation:
      'Doubling a positive number always gives a bigger positive number, so the value never becomes negative and this algorithm would run forever, which is a termination problem.',
  },
  {
    slug: 'algorithms-21',
    question:
      'An algorithm for "finding the average of a list of numbers" adds up all the numbers and then divides by how many numbers there are. What happens if this algorithm is given an empty list (zero numbers)?',
    options: [
      'It works perfectly fine and returns 0',
      'It tries to divide by zero, which is undefined, so a correct algorithm needs a special rule to handle this edge case',
      'It automatically skips the empty list and waits for a new one',
      'It always returns the largest possible number',
    ],
    correctIndex: 1,
    explanation:
      'Dividing by zero is undefined, so an empty list is an edge case that the algorithm must handle separately, otherwise it would fail or crash.',
  },
  {
    slug: 'algorithms-22',
    question:
      'Two algorithms both find the smallest number in a list of 1,000 items. Algorithm X checks every item exactly once. Algorithm Y checks every possible pair of items to compare them. Which uses fewer steps in general, and why?',
    options: [
      'Algorithm Y, because comparing pairs is always faster than checking single items',
      'Algorithm X, because checking each item once grows much more slowly than checking every possible pair as the list gets bigger',
      'They use exactly the same number of steps no matter the list size',
      'Neither approach can ever find the smallest number correctly',
    ],
    correctIndex: 1,
    explanation:
      'Checking every item once requires roughly 1,000 steps, but checking every pair requires roughly 1,000 times 999 comparisons, so Algorithm X scales far better as lists grow.',
  },
  {
    slug: 'algorithms-23',
    question:
      'An algorithm for making a peanut butter sandwich says: "Spread peanut butter on bread, then put the slices together." A friend follows it but ends up with peanut butter only on the outside of the sandwich. What is the most likely reason?',
    options: [
      'The friend cannot read instructions at all',
      'The algorithm itself was missing a clear detail about which side of the bread to spread on, so it was ambiguous',
      'Peanut butter sandwiches cannot be made using algorithms',
      'The bread was the wrong type for this algorithm to work',
    ],
    correctIndex: 1,
    explanation:
      'Because the instructions did not specify which side to spread, they were ambiguous, showing why precise, unambiguous steps matter in a good algorithm.',
  },
  {
    slug: 'algorithms-24',
    question:
      'An algorithm says: "While the number is greater than 1, divide it by 2. Stop when the number is 1 or less." Will this algorithm always terminate if it starts with a positive whole number?',
    options: [
      'No, dividing by 2 can go on forever for any starting number',
      'Yes, repeatedly dividing by 2 makes the number smaller each time, so it will eventually drop to 1 or below and the loop stops',
      'Only if the starting number is already 1',
      'No, because division is not allowed in algorithms',
    ],
    correctIndex: 1,
    explanation:
      'Each division by 2 shrinks the number, and since it keeps shrinking toward 1, the loop is guaranteed to end after a limited number of steps.',
  },
  {
    slug: 'algorithms-25',
    question:
      'A librarian organizing a bookshelf decides to first remove every book, sort them by author name on the floor, and then place them back on the shelf in that order. Compared to sorting books directly on the crowded shelf, what advantage does this approach have?',
    options: [
      'It uses less space than sorting on the shelf',
      'It gives the librarian a clear, organized working area, which can make the sorting steps simpler and less error-prone',
      'It guarantees the books will never need sorting again',
      'It is required because books cannot be sorted while still on a shelf',
    ],
    correctIndex: 1,
    explanation:
      'Working in a clear, organized space (like the floor) can make following the sorting steps easier and reduce mistakes, similar to how some algorithms use extra space to simplify their work.',
  },
  {
    slug: 'algorithms-26',
    question:
      'Looking up a word in a thick paper dictionary, you open to the middle, see which half the word would be in alphabetically, and repeat with that half until you find it. Which computer algorithm does this most closely match?',
    options: [
      'Linear search, checking every word from the first page onward',
      'Binary search, repeatedly narrowing down to the correct half',
      'Bubble sort, swapping neighboring words',
      'Random search, picking pages with no plan',
    ],
    correctIndex: 1,
    explanation:
      'Repeatedly jumping to the middle of a sorted range and eliminating half the possibilities is exactly how binary search works.',
  },
  {
    slug: 'algorithms-27',
    question:
      'A deck of 52 cards is shuffled by an algorithm that, for each position from the last card to the first, swaps that card with a randomly chosen earlier card (including itself). What is this process an example of?',
    options: [
      'A sorting algorithm that puts the cards in order',
      'A randomizing algorithm that mixes up the order of a list',
      'A searching algorithm that finds a specific card',
      'An algorithm that always produces the exact same order every time',
    ],
    correctIndex: 1,
    explanation:
      'This is a classic shuffling algorithm: it uses random swaps to rearrange the deck into an unpredictable order, rather than sorting or searching.',
  },
  {
    slug: 'algorithms-28',
    question:
      'A GPS app finds a route by exploring nearby intersections first, then intersections a little farther away, gradually expanding outward until it reaches the destination, always preferring shorter paths so far. What is the main goal of this approach?',
    options: [
      'To visit every road in the city no matter what',
      'To find a path to the destination while trying to minimize total travel distance or time',
      'To guarantee the trip takes exactly one hour',
      'To avoid using any roads that have traffic lights',
    ],
    correctIndex: 1,
    explanation:
      'Route-finding algorithms like this expand outward from the start while tracking the shortest distance found so far, aiming to reach the destination with minimal total cost.',
  },
  {
    slug: 'algorithms-29',
    question:
      'On a car assembly line, each station performs one specific task (attach wheels, install seats, paint the body) in a fixed order, and a new car frame enters the line every few minutes. What algorithmic idea does this best illustrate?',
    options: [
      'Breaking a big task into an ordered sequence of smaller steps that can each be repeated efficiently',
      'Searching for a single defective car among thousands',
      'Randomly assigning tasks to stations with no fixed order',
      'Sorting cars by color before they are built',
    ],
    correctIndex: 0,
    explanation:
      'An assembly line breaks the larger task of "build a car" into a fixed sequence of smaller repeatable steps, which mirrors how algorithms break problems into ordered steps.',
  },
  {
    slug: 'algorithms-30',
    question:
      'You have an alphabetically sorted list of 500 names and want to find one specific name. Method A checks names one at a time from the start. Method B repeatedly checks the middle of the remaining range and eliminates half each time. Which method needs fewer checks in the worst case?',
    options: [
      'Method A, because checking from the start is always quickest',
      'Method B, because cutting the remaining names in half each time needs far fewer checks than going one by one',
      'Both methods need exactly the same number of checks',
      'Neither method can work on a sorted list of names',
    ],
    correctIndex: 1,
    explanation:
      'Method B is binary search, which can find a name among 500 in about 9 checks, while Method A (linear search) could need up to 500 checks in the worst case.',
  },
  {
    slug: 'algorithms-31',
    question:
      'Follow these steps: start with value = 10. Subtract 3 from value, do this 2 times total, then add 5. What is the final value of value?',
    options: ['7', '9', '12', '4'],
    correctIndex: 1,
    explanation:
      'Starting at 10, subtracting 3 twice gives 10, 7, 4, and then adding 5 gives 9, so the final value is 9.',
  },
  {
    slug: 'algorithms-32',
    question:
      'Follow these steps: start with score = 1. Add 4 to score, repeat this 3 times total. What is the final value of score?',
    options: ['9', '12', '13', '5'],
    correctIndex: 2,
    explanation:
      'Starting at 1 and adding 4 three times gives 1, 5, 9, 13, so the final value of score is 13.',
  },
  {
    slug: 'algorithms-33',
    question:
      'Follow these steps: start with total = 0. For each number from 1 to 5, add that number to total. What is the final value of total?',
    options: ['10', '15', '20', '5'],
    correctIndex: 1,
    explanation:
      'Adding 1, 2, 3, 4, and 5 to a running total of 0 gives 1+2+3+4+5 = 15.',
  },
  {
    slug: 'algorithms-34',
    question:
      'An algorithm says: "While the number is not equal to 1, if the number is even divide it by 2, otherwise subtract 1 from it." Starting with the number 7, will this algorithm definitely stop?',
    options: [
      'No, because subtracting 1 from an odd number can go on forever',
      'Yes, since each step makes the number smaller (dividing or subtracting), it keeps shrinking toward 1 and the loop ends',
      'No, because dividing by 2 only works on numbers less than 7',
      'It depends on what programming language is used',
    ],
    correctIndex: 1,
    explanation:
      'Both actions (dividing an even number by 2 or subtracting 1 from an odd number) make the value strictly smaller, so it is guaranteed to eventually reach 1 and stop.',
  },
  {
    slug: 'algorithms-35',
    question:
      'An algorithm is supposed to find the smallest number in a list, but it is written as: "Assume the second item is the smallest, then compare it to every other item." What problem could this cause?',
    options: [
      'It works perfectly for every possible list, including empty ones',
      'It could give the wrong answer or fail if the list has only one item, since there would be no second item to start with',
      'It will always be faster than starting with the first item',
      'It guarantees the list becomes sorted afterward',
    ],
    correctIndex: 1,
    explanation:
      'Starting from the second item breaks down on a one-item list, since there is no second item, showing why this version of the algorithm misses an important edge case.',
  },
  {
    slug: 'algorithms-36',
    question:
      'Two algorithms both find all matching pairs of numbers that add up to 10 in a list of 200 numbers. Algorithm A checks every possible pair of numbers in the list. Algorithm B puts numbers into a lookup structure first and then checks each number against it once. As the list grows much larger, which approach tends to need far fewer total steps?',
    options: [
      'Algorithm A, since checking every pair is always the simplest approach',
      'Algorithm B, since checking each number once against a lookup avoids the explosion of step growth from checking every pair',
      'They always need the same number of steps for any list size',
      'Neither algorithm can solve this problem correctly',
    ],
    correctIndex: 1,
    explanation:
      'Checking every pair grows very quickly as the list size increases, while checking each item once against a lookup structure grows much more slowly, so Algorithm B scales better.',
  },
  {
    slug: 'algorithms-37',
    question:
      'An algorithm for watering a row of 20 plants says: "Water the plant, then water the next plant, repeat until you have watered every plant in the row." If there are exactly 20 plants, how many times does the watering step run?',
    options: ['19', '20', '21', '40'],
    correctIndex: 1,
    explanation:
      'Since the instructions say to repeat the watering step until every plant has been watered, and there are 20 plants total, the step runs exactly 20 times.',
  },
  {
    slug: 'algorithms-38',
    question:
      'An algorithm claims to sort any list of numbers correctly, and it passes every test you try. Why can testing alone never fully prove the algorithm is correct for all possible inputs?',
    options: [
      'Because testing always proves an algorithm is correct if it passes ten tests',
      'Because there could be some untested input, perhaps an unusual edge case, where the algorithm still fails even though it passed all previous tests',
      'Because algorithms cannot be tested at all',
      'Because sorting algorithms never need to be tested',
    ],
    correctIndex: 1,
    explanation:
      'Passing many tests builds confidence but cannot guarantee correctness for every possible input, since some untested edge case might still reveal a bug.',
  },
]
