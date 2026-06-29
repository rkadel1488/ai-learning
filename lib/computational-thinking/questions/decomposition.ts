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
  {
    slug: 'decomposition-14',
    question:
      'You are planning a road trip across three states. Which is the best way to decompose this task?',
    options: [
      'Split it into route planning, lodging, budget, and packing, then handle each separately',
      'Think only about which snacks to bring and ignore everything else',
      'Try to plan the entire trip in your head all at once without writing anything down',
      'Wait until you are already driving to figure out where to stay',
    ],
    correctIndex: 0,
    explanation:
      'Breaking the trip into route, lodging, budget, and packing turns one huge planning task into several smaller, focused tasks you can tackle one at a time.',
  },
  {
    slug: 'decomposition-15',
    question:
      'A team is building a robot for a competition. Which decomposition best captures the major sub-systems?',
    options: [
      'Movement system, sensor system, power system, and control software',
      'One giant list of every screw and wire with no grouping',
      'Just "make the robot work" with no further breakdown',
      'Only the color of the robot\'s paint',
    ],
    correctIndex: 0,
    explanation:
      'Splitting the robot into movement, sensors, power, and control software identifies the major functional parts, so each can be designed and tested on its own.',
  },
  {
    slug: 'decomposition-16',
    question: 'You want to organize a messy closet. What is the FIRST step in decomposing this task?',
    options: [
      'Buy new clothes to replace the old ones',
      'Identify categories like clothes, shoes, accessories, and storage bins to deal with one at a time',
      'Throw everything onto the floor and hope it sorts itself',
      'Close the closet door and ignore the mess',
    ],
    correctIndex: 1,
    explanation:
      'Identifying smaller categories such as clothes, shoes, accessories, and storage bins lets you focus on organizing one type of item at a time instead of the whole closet at once.',
  },
  {
    slug: 'decomposition-17',
    question:
      'When writing a research report, which sub-tasks show good decomposition?',
    options: [
      'Choosing a topic, gathering sources, taking notes, drafting sections, and editing',
      'Writing the conclusion before deciding on a topic',
      'Reading every book in the library without a plan',
      'Submitting a blank document and adding text later without any structure',
    ],
    correctIndex: 0,
    explanation:
      'Breaking the report into choosing a topic, researching, note-taking, drafting, and editing creates a logical sequence of manageable sub-tasks.',
  },
  {
    slug: 'decomposition-18',
    question:
      'A game designer is creating one level of a platformer. Which decomposition is most useful?',
    options: [
      'Layout of platforms, enemy placement, collectible items, and the level goal',
      'Only deciding the background color',
      'Designing all 50 levels of the game in complete detail before starting any of them',
      'Picking the name of the level and stopping there',
    ],
    correctIndex: 0,
    explanation:
      'Breaking a single level into layout, enemies, collectibles, and the goal covers the meaningful parts needed to build that one level, without getting lost in unrelated details.',
  },
  {
    slug: 'decomposition-19',
    question:
      'Your bike will not pedal properly. Which approach best uses decomposition to find the problem?',
    options: [
      'Replace the entire bike with a new one immediately',
      'Check the chain, then the gears, then the pedals, then the brakes, one system at a time',
      'Randomly tighten every bolt on the bike without checking anything first',
      'Assume it is unfixable and stop using it',
    ],
    correctIndex: 1,
    explanation:
      'Checking each system separately, like the chain, gears, pedals, and brakes, helps you isolate exactly which part is causing the problem instead of guessing at the whole bike.',
  },
  {
    slug: 'decomposition-20',
    question:
      'A math word problem asks how much three friends spend in total after a discount is applied to each item. What is a good way to decompose it?',
    options: [
      'Guess the final answer without doing any calculations',
      'Find the discounted price of each item first, then add the discounted prices together for the total',
      'Add up the original prices and the discount percentages as if they were the same kind of number',
      'Skip the discount and only calculate the original prices',
    ],
    correctIndex: 1,
    explanation:
      'Breaking the problem into smaller steps, finding each item\'s discounted price before adding them together, makes a multi-step problem much easier to solve correctly.',
  },
  {
    slug: 'decomposition-21',
    question:
      'Two students decompose the task "create a class newsletter." Student A splits it into "writing," "layout," and "printing." Student B splits it into "things on page 1" and "things on page 2." Which decomposition is better, and why?',
    options: [
      'Student B, because splitting by page number is always the most logical approach',
      'Student A, because writing, layout, and printing are meaningful stages of the work, while splitting by page number does not match how the work actually gets done',
      'They are equally good since both have exactly two or three parts',
      'Student B, because more pages means more organization automatically',
    ],
    correctIndex: 1,
    explanation:
      'Student A\'s sub-tasks reflect the real stages of producing a newsletter, while Student B\'s split by page number ignores that writing and layout happen across the whole newsletter, not one page at a time.',
  },
  {
    slug: 'decomposition-22',
    question:
      'A team is splitting up the work of building a mobile app: one person handles the login screen, another handles the database, and a third handles the user interface design. The login screen cannot be finished until the database is ready. What does this tell you about decomposition?',
    options: [
      'This decomposition is useless because the parts are not totally independent',
      'Sub-problems can still be useful even if some depend on others, as long as the team plans the order and coordinates between dependent parts',
      'The database and login screen should always be built by the same person to avoid any dependency',
      'Dependencies between sub-problems mean decomposition should not be used at all',
    ],
    correctIndex: 1,
    explanation:
      'Real-world decomposition often produces sub-problems that depend on each other; the key is recognizing those dependencies and coordinating the order of work, not avoiding decomposition altogether.',
  },
  {
    slug: 'decomposition-23',
    question:
      'A science class is decomposing the task "run an experiment on plant growth." Which set of sub-tasks is most complete?',
    options: [
      'Form a hypothesis, set up materials, collect data over time, and analyze results',
      'Only watering the plants every day',
      'Just writing the final report without doing the experiment',
      'Choosing a plant name and stopping there',
    ],
    correctIndex: 0,
    explanation:
      'Forming a hypothesis, setting up materials, collecting data, and analyzing results covers the full scientific process as separate, manageable sub-tasks.',
  },
  {
    slug: 'decomposition-24',
    question:
      'A website is being decomposed into "homepage," "about page," "products page," and "contact page." What additional consideration is important even after splitting the pages this way?',
    options: [
      'Nothing else matters once the pages are listed',
      'Making sure shared features, like the navigation menu and footer, are handled consistently across all the pages instead of being forgotten',
      'Building each page using a completely different programming language',
      'Making every page look identical with no differences at all',
    ],
    correctIndex: 1,
    explanation:
      'Even when a website is split by page, some elements like the navigation menu and footer are shared across pages, so good decomposition should also account for those shared pieces.',
  },
  {
    slug: 'decomposition-25',
    question:
      'Which of the following best describes a sign that a decomposition has gone too far (broken down too much)?',
    options: [
      'The sub-problems are now so tiny and numerous that managing all of them becomes more confusing than solving the original problem',
      'Each sub-problem can be solved in a reasonable amount of time',
      'The sub-problems clearly relate back to the original goal',
      'Different people can work on different sub-problems',
    ],
    correctIndex: 0,
    explanation:
      'Decomposition should make a problem easier to manage; if breaking it down creates an overwhelming number of tiny, hard-to-track pieces, the decomposition has gone too far.',
  },
  {
    slug: 'decomposition-26',
    question:
      'A teacher decomposes "plan the school dance" into "music and DJ," "decorations," "tickets and money," and "chaperones and safety." Why does this count as good decomposition?',
    options: [
      'Because it has the word "dance" repeated in every sub-task',
      'Because each sub-task covers a distinct, necessary part of the event that can be planned and checked off somewhat independently',
      'Because it avoids assigning any specific person to a task',
      'Because there are exactly four sub-tasks, which is always the right number',
    ],
    correctIndex: 1,
    explanation:
      'Each sub-task, music, decorations, tickets, and safety, represents a distinct and necessary part of running the dance, making it easier to assign, plan, and track separately.',
  },
  {
    slug: 'decomposition-27',
    question:
      'A club is organizing a charity fundraiser. Which is the best decomposition of the work?',
    options: [
      'Sponsor outreach, event logistics, marketing, and donation tracking',
      'One person does everything while everyone else waits',
      'Splitting the task into "morning tasks" and "afternoon tasks" with no other grouping',
      'Deciding the charity\'s name and stopping there',
    ],
    correctIndex: 0,
    explanation:
      'Sponsor outreach, logistics, marketing, and donation tracking are distinct, meaningful parts of running a fundraiser that can each be planned and worked on separately.',
  },
  {
    slug: 'decomposition-28',
    question:
      'You are building a treehouse with friends. Which sub-tasks show good decomposition of the project?',
    options: [
      'Designing the frame, gathering materials, building the platform, and adding safety railings',
      'Just picking a paint color before anything else is planned',
      'Climbing the tree first and figuring out the rest later',
      'Arguing about whose backyard to use and never moving on',
    ],
    correctIndex: 0,
    explanation:
      'Breaking the treehouse project into design, materials, platform construction, and safety features covers the major stages needed to build it safely and in order.',
  },
  {
    slug: 'decomposition-29',
    question:
      'A developer is decomposing a mobile app for tracking daily water intake. Which breakdown is most useful?',
    options: [
      'Logging water intake, setting daily goals, showing progress charts, and sending reminder notifications',
      'Choosing the app icon and considering the app finished',
      'Writing all the code in a single giant file with no separation of features',
      'Designing only the splash screen animation in great detail',
    ],
    correctIndex: 0,
    explanation:
      'Splitting the app into logging, goal-setting, progress charts, and reminders identifies the core features as separate, testable parts instead of one tangled task.',
  },
  {
    slug: 'decomposition-30',
    question:
      'You are planning a weekend camping trip with your family. Which decomposition covers the task best?',
    options: [
      'Choosing the campsite, packing gear and food, planning activities, and arranging transportation',
      'Only deciding which flashlight to bring',
      'Packing the car first without knowing where you are going',
      'Worrying about the whole trip at once without writing any list',
    ],
    correctIndex: 0,
    explanation:
      'Dividing the trip into campsite choice, packing, activities, and transportation turns a big planning job into separate, manageable checklists.',
  },
  {
    slug: 'decomposition-31',
    question:
      'You want to decompose your monthly allowance budget. Which grouping makes the most sense?',
    options: [
      'Savings, spending money, gifts for others, and emergency fund',
      'Splitting money by the color of the bills',
      'One single category called "money stuff" with no further detail',
      'Randomly assigning amounts without any categories at all',
    ],
    correctIndex: 0,
    explanation:
      'Grouping a budget into savings, spending, gifts, and an emergency fund creates meaningful categories that make it easier to track and plan how money is used.',
  },
  {
    slug: 'decomposition-32',
    question:
      'A librarian wants to reorganize the entire library. Which decomposition is most effective?',
    options: [
      'Sorting books by genre, then by author within each genre, then updating the catalog system',
      'Moving every book to a random new shelf to make it more exciting',
      'Reorganizing only the picture books and leaving every other section untouched forever',
      'Closing the library until someone else fixes it',
    ],
    correctIndex: 0,
    explanation:
      'Sorting by genre, then by author, then updating the catalog breaks the reorganization into logical stages that build on each other in a sensible order.',
  },
  {
    slug: 'decomposition-33',
    question:
      'Organizers are decomposing a sports tournament bracket with 16 teams. Which sub-tasks make sense?',
    options: [
      'Seeding the teams, scheduling each round, booking the venue, and arranging referees',
      'Only deciding what color jerseys the winning team gets',
      'Skipping the schedule and letting teams show up whenever they want',
      'Listing every player\'s favorite snack instead of planning matches',
    ],
    correctIndex: 0,
    explanation:
      'Seeding, scheduling rounds, booking the venue, and arranging referees are the essential pieces needed to run a tournament, and each can be handled as its own task.',
  },
  {
    slug: 'decomposition-34',
    question:
      'In the sports tournament bracket above, the semifinal matchups cannot be scheduled until the quarterfinal results are known. What does this best illustrate about decomposition?',
    options: [
      'The bracket should never have been decomposed into rounds in the first place',
      'Some sub-tasks depend on the outcome of earlier sub-tasks, so decomposition must also account for the correct order of work',
      'Quarterfinals and semifinals should always be scheduled by two completely unrelated teams of organizers',
      'Dependencies between rounds mean the tournament cannot be planned in advance at all',
    ],
    correctIndex: 1,
    explanation:
      'Decomposing the bracket into rounds is still useful, but since semifinal scheduling depends on quarterfinal results, planners need to sequence the sub-tasks correctly rather than treating them as fully independent.',
  },
  {
    slug: 'decomposition-35',
    question:
      'Two teams decompose "plan a school carnival." Team A splits it into "booths and games," "food vendors," "ticket sales," and "cleanup crew." Team B splits it into "stuff for kids" and "stuff for adults." Which decomposition is better, and why?',
    options: [
      'Team B, because splitting by age group is always clearer than splitting by activity type',
      'Team A, because their categories map to distinct operational areas of the event, while Team B\'s split is vague and many carnival activities apply to both kids and adults',
      'They are equally good because both teams created exactly the same number of categories',
      'Team B, because fewer categories always means a simpler and better plan',
    ],
    correctIndex: 1,
    explanation:
      'Team A\'s categories reflect real operational areas that need separate planning, while Team B\'s age-based split is ambiguous since booths, food, and tickets all serve both kids and adults.',
  },
  {
    slug: 'decomposition-36',
    question:
      'You are decomposing the task "write a mobile app" and create over 60 tiny sub-tasks, such as "decide the exact pixel width of the back button" and "choose the font weight of one label." What is the issue here?',
    options: [
      'There is no issue; more sub-tasks always means better decomposition',
      'The decomposition has gone too granular too early, creating overwhelming detail before the bigger features and structure are even defined',
      'Pixel widths and font weights should never be considered at any point in app development',
      'The app will now automatically run faster because of all the detail',
    ],
    correctIndex: 1,
    explanation:
      'Jumping straight to tiny visual details before defining major features and structure makes the project harder to manage, since the big picture gets lost among minor details.',
  },
  {
    slug: 'decomposition-37',
    question:
      'A class is decomposing "put on a school play." Which set of sub-tasks best covers the major parts of the production?',
    options: [
      'Casting actors, building the set, rehearsing scenes, and managing lighting and sound',
      'Only choosing the title of the play and stopping there',
      'Memorizing every line of every character before anything else is planned',
      'Selling tickets first and deciding what play to perform afterward',
    ],
    correctIndex: 0,
    explanation:
      'Casting, set building, rehearsals, and lighting/sound represent the major distinct areas of producing a play, each of which can be organized and worked on separately.',
  },
  {
    slug: 'decomposition-38',
    question:
      'After decomposing "plan a class trip to a museum" into transportation, entry tickets, lunch arrangements, and a tour schedule, what should the planners still check before finalizing everything?',
    options: [
      'Nothing further is needed once the categories are listed',
      'Whether the sub-tasks fit together correctly, for example making sure the tour schedule lines up with the bus arrival and departure times',
      'Whether the museum has the word "museum" in its official name',
      'Whether every student likes the same exhibit',
    ],
    correctIndex: 1,
    explanation:
      'Even with good sub-tasks, planners must check that the pieces fit together logically, like ensuring the tour schedule matches the transportation timing, since decomposed parts of a plan still need to connect.',
  },
]
