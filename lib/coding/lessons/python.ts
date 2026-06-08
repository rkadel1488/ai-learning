import type { CodingLesson } from '../languages'

export const python: CodingLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to Python',
    summary: 'Friendly syntax and your first print statement',
    explanation: [
      'Python is famous for being readable and beginner-friendly. There are no semicolons or curly braces — indentation (spaces) defines blocks of code.',
      'print(...) displays output. Try changing the text below and press Run — your output appears in the Output panel.',
      'Lines starting with # are comments — notes for humans that Python ignores.',
    ],
    example: "print('Hello, world!')\nprint(2 + 3 * 4)\n# This is a comment",
    starterCode: "print('Hello, world!')\nprint(7 * 6)",
  },
  {
    slug: 'variables',
    title: 'Variables & Types',
    summary: 'Storing and combining values',
    explanation: [
      'Create a variable by assigning a value: name = "Aria". Python figures out the type automatically — strings, integers, floats, booleans, lists, and more.',
      'f-strings — f"{variable}" — let you embed variables directly inside text.',
    ],
    example: "name = 'Aria'\nage = 12\nprint(f'{name} is {age} years old')\nprint(type(age))",
    starterCode: "city = 'Pokhara'\ntemperature = 24\nprint(f'{city} is {temperature} degrees today')",
  },
  {
    slug: 'conditionals',
    title: 'Conditionals',
    summary: 'Choosing what happens with if / elif / else',
    explanation: [
      'if checks a condition; elif ("else if") checks another; else runs when nothing matched. Each block is defined purely by indentation.',
      'Comparisons like ==, !=, >, and < produce True or False.',
    ],
    example: "score = 82\nif score >= 90:\n    print('Grade: A')\nelif score >= 75:\n    print('Grade: B')\nelse:\n    print('Keep practising!')",
    starterCode: "temperature = 30\nif temperature > 25:\n    print('It is warm')\nelse:\n    print('It is cool')",
  },
  {
    slug: 'loops',
    title: 'Loops',
    summary: 'Repeating actions with for and while',
    explanation: [
      'A for loop walks through a sequence: for i in range(5): repeats with i = 0,1,2,3,4.',
      'A while loop repeats as long as its condition stays True.',
      'You can loop directly over lists: for fruit in fruits: ...',
    ],
    example: "for i in range(1, 6):\n    print(f'Step {i}')\n\nfruits = ['apple', 'banana', 'mango']\nfor fruit in fruits:\n    print(fruit.upper())",
    starterCode: "for i in range(1, 4):\n    print(f'Count: {i}')",
  },
  {
    slug: 'functions',
    title: 'Functions',
    summary: 'Packaging reusable logic with def',
    explanation: [
      'Define a function with def name(parameters):. Use return to send a value back to the caller.',
      'Functions help you avoid repeating yourself and make programs easier to understand.',
    ],
    example: "def double(n):\n    return n * 2\n\ndef greet(name):\n    return f'Hello, {name}!'\n\nprint(double(21))\nprint(greet('World'))",
    starterCode: "def square(n):\n    return n * n\n\nprint(square(6))",
  },
  {
    slug: 'lists-and-dicts',
    title: 'Lists & Dictionaries',
    summary: 'Working with collections of data',
    explanation: [
      'Lists hold ordered values: numbers = [1, 2, 3]. Use numbers[0] to access, len(numbers) for the length, and numbers.append(4) to add.',
      'Dictionaries hold key-value pairs: student = {"name": "Aria", "grade": 7}. Access values with student["name"].',
      'List comprehensions like [n * 2 for n in numbers] transform lists in one concise line.',
    ],
    example: "numbers = [1, 2, 3, 4, 5]\ndoubled = [n * 2 for n in numbers]\nevens = [n for n in numbers if n % 2 == 0]\nprint(doubled)\nprint(evens)\n\nstudent = {'name': 'Aria', 'grade': 7}\nprint(f\"{student['name']} is in grade {student['grade']}\")",
    starterCode: "scores = [70, 85, 92, 60]\npassing = [s for s in scores if s >= 70]\nprint(passing)",
  },
]
