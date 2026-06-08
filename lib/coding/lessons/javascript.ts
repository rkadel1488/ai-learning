import type { CodingLesson } from '../languages'

export const javascript: CodingLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to JavaScript',
    summary: 'Making web pages interactive — and printing your first output',
    explanation: [
      'JavaScript is the programming language of the web. It runs in the browser and can react to clicks, update content, fetch data, and much more.',
      'console.log(...) prints a value to the console — perfect for checking what your code is doing. In this playground, anything you log appears in the Output panel.',
      'Statements usually end with a semicolon ; (optional, but good practice).',
    ],
    example: "console.log('Hello, world!');\nconsole.log(2 + 3 * 4);",
    starterCode: "console.log('Hello, world!');\nconsole.log(10 - 4);",
  },
  {
    slug: 'variables',
    title: 'Variables & Data Types',
    summary: 'Storing values with let and const',
    explanation: [
      'Variables store values so you can use them later. Use let for values that may change, and const for values that should not be reassigned.',
      'JavaScript has several basic types: numbers (42), strings ("hello"), booleans (true/false), arrays ([1,2,3]), and objects ({name: "Aria"}).',
      'Template strings — backticks with ${...} — let you mix variables into text easily.',
    ],
    example: "const name = 'Aria';\nlet age = 12;\nage = age + 1;\nconsole.log(`${name} is now ${age} years old`);",
    starterCode: "const city = 'Kathmandu';\nlet temperature = 22;\nconsole.log(`${city} is ${temperature}°C today`);",
  },
  {
    slug: 'conditionals',
    title: 'Conditionals',
    summary: 'Making decisions with if, else if, and else',
    explanation: [
      'if statements run code only when a condition is true. else if checks another condition, and else runs when nothing else matched.',
      'Comparison operators like ===, !==, >, and < produce true or false, which conditionals use to decide what to do.',
    ],
    example: "const score = 82;\nif (score >= 90) {\n  console.log('Grade: A');\n} else if (score >= 75) {\n  console.log('Grade: B');\n} else {\n  console.log('Keep practising!');\n}",
    starterCode: "const temperature = 30;\nif (temperature > 25) {\n  console.log('It is warm');\n} else {\n  console.log('It is cool');\n}",
  },
  {
    slug: 'loops',
    title: 'Loops',
    summary: 'Repeating actions with for and while',
    explanation: [
      'A for loop repeats code a set number of times: for (let i = 0; i < 5; i++) { ... }.',
      'A while loop repeats as long as a condition stays true — useful when you do not know in advance how many times you need to repeat.',
      'Arrays also have handy loop-like methods such as .forEach(item => ...) and .map(item => ...).',
    ],
    example: "for (let i = 1; i <= 5; i++) {\n  console.log(`Step ${i}`);\n}\n\nconst fruits = ['apple', 'banana', 'mango'];\nfruits.forEach(f => console.log(f.toUpperCase()));",
    starterCode: "for (let i = 1; i <= 3; i++) {\n  console.log(`Count: ${i}`);\n}",
  },
  {
    slug: 'functions',
    title: 'Functions',
    summary: 'Packaging reusable blocks of logic',
    explanation: [
      'A function is a reusable block of code. Define one with function name(params) { ... } or as an arrow function const name = (params) => { ... }.',
      'Functions can take inputs (parameters) and give back an output with return.',
    ],
    example: "function double(n) {\n  return n * 2;\n}\n\nconst greet = (name) => `Hello, ${name}!`;\n\nconsole.log(double(21));\nconsole.log(greet('World'));",
    starterCode: "function square(n) {\n  return n * n;\n}\nconsole.log(square(6));",
  },
  {
    slug: 'arrays-and-objects',
    title: 'Arrays & Objects',
    summary: 'Working with collections and structured data',
    explanation: [
      'Arrays hold ordered lists of values: const nums = [1, 2, 3]. Access items with nums[0], get the length with nums.length.',
      'Objects hold named properties: const dog = { name: "Rex", age: 3 }. Access them with dog.name or dog["name"].',
      'Methods like .map(), .filter(), and .reduce() transform arrays without writing manual loops.',
    ],
    example: "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconst evens = numbers.filter(n => n % 2 === 0);\nconsole.log(doubled);\nconsole.log(evens);\n\nconst student = { name: 'Aria', grade: 7 };\nconsole.log(`${student.name} is in grade ${student.grade}`);",
    starterCode: "const scores = [70, 85, 92, 60];\nconst passing = scores.filter(s => s >= 70);\nconsole.log(passing);",
  },
]
