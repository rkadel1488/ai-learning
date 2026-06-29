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
]
