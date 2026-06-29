import type { CTQuestion } from '../types'

export const dataRepresentation: CTQuestion[] = [
  {
    slug: 'data-representation-1',
    question: 'What does "data representation" mean in computer science?',
    options: [
      'How information is stored and organized so it can be used by computers or people',
      'How fast a computer can process instructions',
      'The color scheme of a website',
      'The brand of computer hardware being used',
    ],
    correctIndex: 0,
    explanation:
      'Data representation is about choosing how to store and organize information, such as using numbers, text, or lists, so it can be understood and processed correctly.',
  },
  {
    slug: 'data-representation-2',
    question: 'Computers store all data using which number system at the lowest level?',
    options: [
      'Roman numerals',
      'Binary (only 0s and 1s)',
      'Base-12 (twelve digits)',
      'Hexadecimal letters only',
    ],
    correctIndex: 1,
    explanation:
      'Computer hardware represents data as electrical signals that are either on or off, which is naturally captured using binary, a number system with only two digits: 0 and 1.',
  },
  {
    slug: 'data-representation-3',
    question: 'What decimal (base-10) number does the binary number 101 represent?',
    options: ['3', '4', '5', '6'],
    correctIndex: 2,
    explanation:
      'In binary, 101 means (1×4) + (0×2) + (1×1) = 4 + 0 + 1 = 5, so 101 in binary equals 5 in decimal.',
  },
  {
    slug: 'data-representation-4',
    question: 'What decimal (base-10) number does the binary number 1010 represent?',
    options: ['8', '9', '10', '12'],
    correctIndex: 2,
    explanation:
      'In binary, 1010 means (1×8) + (0×4) + (1×2) + (0×1) = 8 + 0 + 2 + 0 = 10, so 1010 in binary equals 10 in decimal.',
  },
  {
    slug: 'data-representation-5',
    question: 'Which of these is an example of a "boolean" data type?',
    options: [
      'The number 42',
      'The text "hello"',
      'A value that is either true or false',
      'A list of three colors',
    ],
    correctIndex: 2,
    explanation:
      'A boolean is a data type that can only hold one of two values, true or false, which is useful for representing yes/no or on/off situations.',
  },
  {
    slug: 'data-representation-6',
    question: 'Which of these would normally be stored as a "string" (text) data type?',
    options: [
      'A student\'s name, like "Maya"',
      'Whether a light switch is on',
      'The number of apples in a basket',
      'A list of test scores',
    ],
    correctIndex: 0,
    explanation:
      'A string is a sequence of characters used to represent text, such as a name, so "Maya" is naturally stored as a string rather than a number or boolean.',
  },
  {
    slug: 'data-representation-7',
    question:
      'Why would a programmer choose to store "3" as a number instead of as the text "3"?',
    options: [
      'Text always takes up less storage space than numbers',
      'Storing it as a number allows the computer to do math with it, like adding or comparing values',
      'Numbers cannot be displayed on a screen',
      'There is no difference between the two for a computer',
    ],
    correctIndex: 1,
    explanation:
      'When a value is stored as an actual number, the computer can perform calculations like addition or comparisons; if it were stored as text, the computer would treat it as a sequence of characters instead.',
  },
  {
    slug: 'data-representation-8',
    question: 'What is a "list" (or array) used for in data representation?',
    options: [
      'Storing a single true or false value',
      'Storing an ordered collection of multiple items, like a set of scores or names',
      'Connecting a computer to the internet',
      'Converting text into binary automatically',
    ],
    correctIndex: 1,
    explanation:
      'A list, or array, stores multiple related items together in a specific order, such as a list of student names or game scores, making it easy to access and manage them as a group.',
  },
  {
    slug: 'data-representation-9',
    question:
      'A "key-value pair" stores data by pairing a label with information. Which example best shows a key-value pair?',
    options: [
      'A single number like 17 with no label',
      'Pairing the key "favoriteColor" with the value "blue"',
      'A list containing only the numbers 1, 2, and 3',
      'A true or false answer with no extra information',
    ],
    correctIndex: 1,
    explanation:
      'A key-value pair connects a descriptive label (the key, like "favoriteColor") with the actual data (the value, like "blue"), making it easy to look up information by its label.',
  },
  {
    slug: 'data-representation-10',
    question:
      'A table (or grid) made of rows and columns is most useful for representing which kind of data?',
    options: [
      'A single true or false value',
      'One isolated number with no related information',
      'Many records that each share the same set of categories, like names paired with ages and grades',
      'A single word with no structure',
    ],
    correctIndex: 2,
    explanation:
      'Tables organize data into rows (individual records) and columns (shared categories), which works well when many items all need to be described using the same set of properties.',
  },
  {
    slug: 'data-representation-11',
    question:
      'You want to store just a simple shopping list of item names to buy at the store. Which representation is the simplest, most appropriate choice?',
    options: [
      'A full table with rows and columns for every possible grocery detail',
      'A single boolean value',
      'A simple list (array) of item names',
      'A key-value pair with only one key',
    ],
    correctIndex: 2,
    explanation:
      'Since a shopping list is just an ordered collection of item names with no extra categories needed, a simple list is the most appropriate and easiest representation to use.',
  },
  {
    slug: 'data-representation-12',
    question:
      'You are tracking each student\'s name, age, and grade for an entire class. Why would a table be a better choice than several separate, unconnected lists?',
    options: [
      'Because tables cannot store names, only numbers',
      'Because a table keeps each student\'s name, age, and grade linked together in one row, instead of risking them getting mismatched across separate lists',
      'Because separate lists are always faster to search than tables',
      'Because tables can only have one column',
    ],
    correctIndex: 1,
    explanation:
      'A table keeps related information about the same student together in a single row, which prevents mistakes that could happen if names, ages, and grades were stored in separate, unconnected lists that could get out of sync.',
  },
  {
    slug: 'data-representation-13',
    question:
      'A game needs to track whether each of 5 players has "won" or "lost" their last match, along with their player names. Which representation is most appropriate?',
    options: [
      'A single binary number representing the whole game',
      'One long string combining all the names and results with no clear structure',
      'A table or list of key-value pairs, where each player\'s name is linked to a boolean for win/loss',
      'A single boolean shared by all 5 players',
    ],
    correctIndex: 2,
    explanation:
      'Since there are multiple players who each need their own name paired with their own true/false result, a table or list of key-value pairs correctly keeps each player\'s name connected to their individual win/loss status.',
  },
]
