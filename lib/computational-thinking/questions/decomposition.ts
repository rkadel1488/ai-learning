import type { CTQuestion } from '../types'

export const decomposition: CTQuestion[] = [
  {
    slug: 'decomposition-1',
    question: 'What does "decomposition" mean in computational thinking?',
    options: [
      'Breaking a big problem into smaller, easier-to-handle parts',
      'Writing code as fast as possible without planning',
      'Deleting unused files from a project',
      'Making a program run using less memory',
    ],
    correctIndex: 0,
    explanation:
      'Decomposition is the skill of splitting a large, complex problem into smaller sub-problems that are easier to understand and solve.',
  },
  {
    slug: 'decomposition-2',
    question:
      'You are planning a birthday party. Which of these is the BEST example of decomposing the task?',
    options: [
      'Worrying about the whole party at once until it feels overwhelming',
      'Splitting it into guest list, food, decorations, games, and venue, then planning each separately',
      'Only thinking about decorations and ignoring everything else',
      'Asking a friend to plan the entire party for you',
    ],
    correctIndex: 1,
    explanation:
      'Breaking the party into separate categories like guests, food, decorations, games, and venue turns one big overwhelming task into several smaller, manageable ones.',
  },
  {
    slug: 'decomposition-3',
    question: 'Why is decomposition especially useful before you start coding an app?',
    options:
      [
        'It guarantees the app will have zero bugs',
        'It lets you skip testing the app later',
        'It helps you identify smaller features or modules you can build and test one at a time',
        'It makes the app run faster on every device',
      ],
    correctIndex: 2,
    explanation:
      'By splitting an app into smaller features or modules (like login, profile, and feed), you can design, build, and test each piece individually instead of tackling everything at once.',
  },
  {
    slug: 'decomposition-4',
    question:
      'A recipe for a three-course meal can be decomposed into which of the following sub-tasks?',
    options: [
      'Just one long list of every ingredient with no grouping',
      'Preparing the appetizer, the main course, and the dessert as separate sub-tasks',
      'Cooking everything in a random order with no plan',
      'Memorizing the entire recipe word for word before cooking',
    ],
    correctIndex: 1,
    explanation:
      'Treating the appetizer, main course, and dessert as separate sub-tasks lets you focus on one part of the meal at a time, which is exactly what decomposition encourages.',
  },
  {
    slug: 'decomposition-5',
    question:
      'Your teacher assigns a group project on the solar system. What is a good way to decompose the work among four teammates?',
    options: [
      'Have everyone research the same planet so answers can be compared',
      'Assign each teammate a different sub-topic, such as inner planets, outer planets, the sun, and moons',
      'Let one person do all the research while others do nothing',
      'Wait until the night before it is due to divide tasks',
    ],
    correctIndex: 1,
    explanation:
      'Dividing the topic into distinct sub-topics lets each teammate focus on a manageable piece, and the pieces can be combined into the full project later.',
  },
  {
    slug: 'decomposition-6',
    question:
      'A program keeps crashing, and you do not know why. How can decomposition help you debug it?',
    options: [
      'By rewriting the entire program from scratch immediately',
      'By breaking the program into smaller sections and testing each one separately to isolate the bug',
      'By ignoring the error message and hoping it goes away',
      'By adding more features so the bug becomes less noticeable',
    ],
    correctIndex: 1,
    explanation:
      'Testing smaller sections of code one at a time helps you narrow down exactly where the problem is, instead of guessing about the whole program at once.',
  },
  {
    slug: 'decomposition-7',
    question: 'Which of these is NOT a benefit of decomposing a problem?',
    options: [
      'It makes each sub-problem easier to understand',
      'It allows different people or teams to work on different parts',
      'It automatically makes the final solution use less electricity',
      'It makes it easier to find and fix mistakes in a specific part',
    ],
    correctIndex: 2,
    explanation:
      'Decomposition is about organizing and simplifying problem-solving; it has no direct effect on how much electricity a solution uses.',
  },
  {
    slug: 'decomposition-8',
    question:
      'When writing a long essay, which approach best shows decomposition in action?',
    options: [
      'Writing the entire essay in one sitting without an outline',
      'Breaking the essay into an introduction, body paragraphs with separate ideas, and a conclusion',
      'Copying a friend\'s essay and changing a few words',
      'Choosing a topic and submitting the essay immediately',
    ],
    correctIndex: 1,
    explanation:
      'Splitting the essay into an introduction, individual body paragraphs, and a conclusion breaks the writing task into smaller, focused pieces that are easier to tackle one by one.',
  },
  {
    slug: 'decomposition-9',
    question:
      'A student decomposes "build a website" into "design the homepage," "design the homepage colors," "design the homepage fonts," and "design the homepage button shadows," but never breaks down the rest of the site. What is the problem with this decomposition?',
    options: [
      'There is no problem; this is a perfect decomposition',
      'The sub-tasks are too unevenly sized and too narrowly focused on one part, leaving other major parts of the website undefined',
      'There are too few sub-tasks listed',
      'Decomposition should never involve visual design tasks',
    ],
    correctIndex: 1,
    explanation:
      'Good decomposition should cover the whole problem at a reasonably even level of detail; here, the student went too deep into one tiny part (homepage styling) while ignoring other major parts of the website, like navigation or content pages.',
  },
  {
    slug: 'decomposition-10',
    question:
      'What is the difference between "top-down" and "bottom-up" decomposition?',
    options: [
      'Top-down starts with the big picture and breaks it into smaller parts; bottom-up starts with small pieces and combines them into a bigger system',
      'Top-down is only used in math, while bottom-up is only used in art',
      'Top-down and bottom-up are two names for the exact same process',
      'Top-down means working alone, and bottom-up means working in a group',
    ],
    correctIndex: 0,
    explanation:
      'Top-down decomposition begins with the overall goal and splits it into smaller sub-problems, while bottom-up starts with small, simple components and builds them up into a complete solution.',
  },
  {
    slug: 'decomposition-11',
    question:
      'A sub-problem created during decomposition turns out to still be too big, so you break it down again into even smaller parts. What is this repeated process called?',
    options: [
      'Recursive decomposition',
      'Abstraction',
      'Pattern recognition',
      'Algorithm design',
    ],
    correctIndex: 0,
    explanation:
      'When a sub-problem is itself broken down into smaller sub-problems, and this continues until each part is manageable, it is called recursive decomposition.',
  },
  {
    slug: 'decomposition-12',
    question:
      'Which scenario describes a BAD decomposition of the task "plan a school field trip"?',
    options: [
      'Splitting it into transportation, budget, permission slips, and itinerary',
      'Splitting it into "things that start with the letter T" and "everything else"',
      'Splitting it into venue research and chaperone scheduling',
      'Splitting it into cost estimation and safety planning',
    ],
    correctIndex: 1,
    explanation:
      'Good sub-problems should be logically meaningful and connected to the actual task; grouping by the first letter of a word ignores the real structure of the problem and does not help solve it.',
  },
  {
    slug: 'decomposition-13',
    question:
      'A video game designer decomposes "build the game" into "design characters," "build levels," "write game logic," and "create sound effects." Why is this considered good decomposition?',
    options: [
      'Because it has exactly four parts, and four is always the correct number',
      'Because each part represents a distinct, meaningful piece of the overall game that can be worked on somewhat independently',
      'Because sound effects are more important than the other parts',
      'Because it avoids any need for the parts to work together later',
    ],
    correctIndex: 1,
    explanation:
      'Good decomposition divides a problem into parts that are each meaningful and distinct, like characters, levels, logic, and sound, so teams can make progress on different pieces before integrating them.',
  },
]
