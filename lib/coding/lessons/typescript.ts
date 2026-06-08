import type { CodingLesson } from '../languages'

export const typescript: CodingLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to TypeScript',
    summary: 'JavaScript with types attached',
    explanation: [
      'TypeScript is JavaScript with an extra layer: type annotations. You write let age: number = 12 to tell the tool what kind of value a variable should hold.',
      'These annotations help catch mistakes — like adding a number to a string by accident — before your code ever runs.',
      'Behind the scenes, the types are checked and then stripped away, leaving plain JavaScript that runs in the browser.',
    ],
    example: "let age: number = 12;\nlet name: string = 'Aria';\nlet isStudent: boolean = true;\n\nconsole.log(`${name} is ${age} years old`);\nconsole.log(`Student? ${isStudent}`);\n\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(add(2, 3));",
    starterCode: "let city: string = 'Kathmandu';\nlet temperature: number = 22;\n\nconsole.log(`${city} is ${temperature} degrees today`);",
  },
  {
    slug: 'interfaces-and-types',
    title: 'Interfaces & Type Aliases',
    summary: 'Describing the shape of objects',
    explanation: [
      'An interface describes the shape an object should have: interface User { name: string; age: number }. Any object matching that shape can be treated as a User.',
      'A type alias does something similar with the type keyword: type Point = { x: number; y: number }, and can also name unions and other type combinations.',
      'You can use an interface or type alias as the type of a function parameter, so the function only accepts objects with the right shape.',
    ],
    example: "interface User {\n  name: string;\n  age: number;\n}\n\ntype Point = { x: number; y: number };\n\nfunction describeUser(user: User): string {\n  return `${user.name} is ${user.age} years old`;\n}\n\nfunction distanceFromOrigin(point: Point): number {\n  return Math.sqrt(point.x * point.x + point.y * point.y);\n}\n\nconst aria: User = { name: 'Aria', age: 12 };\nconsole.log(describeUser(aria));\nconsole.log(distanceFromOrigin({ x: 3, y: 4 }));",
    starterCode: "interface Book {\n  title: string;\n  pages: number;\n}\n\nfunction summarize(book: Book): string {\n  return `${book.title} has ${book.pages} pages`;\n}\n\nconst myBook: Book = { title: 'TypeScript Basics', pages: 120 };\nconsole.log(summarize(myBook));",
  },
  {
    slug: 'functions-and-generics',
    title: 'Functions & Generics',
    summary: 'Typing parameters, return values, and writing reusable generic functions',
    explanation: [
      'You can annotate a function\'s parameters and return type, like function greet(name: string): string, so TypeScript checks both what goes in and what comes out.',
      'Generics let a function work with many types while staying type-safe: function identity<T>(x: T): T returns whatever type it was given.',
      'The placeholder T stands in for "whatever type the caller uses" — TypeScript fills it in automatically based on the argument.',
    ],
    example: "function greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nfunction firstItem<T>(items: T[]): T {\n  return items[0];\n}\n\nconsole.log(greet('World'));\nconsole.log(identity(42));\nconsole.log(identity('TypeScript'));\nconsole.log(firstItem([10, 20, 30]));\nconsole.log(firstItem(['a', 'b', 'c']));",
    starterCode: "function double(n: number): number {\n  return n * 2;\n}\n\nfunction wrapInArray<T>(value: T): T[] {\n  return [value];\n}\n\nconsole.log(double(21));\nconsole.log(wrapInArray('hello'));\nconsole.log(wrapInArray(99));",
  },
  {
    slug: 'classes',
    title: 'Classes',
    summary: 'Typed classes with constructor properties and access modifiers',
    explanation: [
      'A TypeScript class can declare the types of its properties, and the constructor can use access modifiers like public and private to both declare and assign properties in one step.',
      'public members can be used from outside the class, while private members can only be accessed from within the class itself.',
      'Methods on a class can have typed parameters and return types just like regular functions.',
    ],
    example: "class Animal {\n  public name: string;\n  private sound: string;\n\n  constructor(name: string, sound: string) {\n    this.name = name;\n    this.sound = sound;\n  }\n\n  speak(): string {\n    return `${this.name} says ${this.sound}`;\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name: string) {\n    super(name, 'Woof');\n  }\n\n  fetch(): string {\n    return `${this.name} fetches the ball!`;\n  }\n}\n\nconst rex = new Dog('Rex');\nconsole.log(rex.speak());\nconsole.log(rex.fetch());",
    starterCode: "class Counter {\n  private count: number = 0;\n\n  increment(): number {\n    this.count += 1;\n    return this.count;\n  }\n\n  getCount(): number {\n    return this.count;\n  }\n}\n\nconst counter = new Counter();\ncounter.increment();\ncounter.increment();\nconsole.log(counter.getCount());",
  },
  {
    slug: 'enums-and-unions',
    title: 'Enums & Union Types',
    summary: 'Naming sets of related values and combining types with |',
    explanation: [
      'An enum gives friendly names to a fixed set of related values, like enum Direction { Up, Down, Left, Right }, which you can refer to as Direction.Up.',
      'A union type allows a value to be one of several specific types or literal values, like type Status = "idle" | "loading" | "done".',
      'Union types are great for representing a small, known set of possible states a value can be in.',
    ],
    example: "enum Direction {\n  Up,\n  Down,\n  Left,\n  Right,\n}\n\ntype Status = 'idle' | 'loading' | 'done';\n\nfunction describeStatus(status: Status): string {\n  if (status === 'idle') return 'Waiting to start';\n  if (status === 'loading') return 'Working on it...';\n  return 'All finished!';\n}\n\nconsole.log(Direction.Up);\nconsole.log(Direction.Left);\nconsole.log(describeStatus('loading'));\nconsole.log(describeStatus('done'));",
    starterCode: "enum Level {\n  Beginner,\n  Intermediate,\n  Advanced,\n}\n\ntype Theme = 'light' | 'dark';\n\nfunction describeTheme(theme: Theme): string {\n  return theme === 'light' ? 'Bright mode' : 'Dark mode';\n}\n\nconsole.log(Level.Intermediate);\nconsole.log(describeTheme('dark'));",
  },
  {
    slug: 'arrays-and-tuples',
    title: 'Arrays & Tuples',
    summary: 'Typed lists and fixed-shape grouped values',
    explanation: [
      'A typed array says what kind of values it holds, like number[] for a list of numbers or string[] for a list of strings.',
      'A tuple is a fixed-length array where each position has its own type, like [string, number] for a name paired with an age.',
      'Tuples are useful when you want to group a small, fixed set of related values that each have a different meaning.',
    ],
    example: "const scores: number[] = [70, 85, 92, 60];\nconst names: string[] = ['Aria', 'Kiran', 'Maya'];\n\nconst passing = scores.filter(s => s >= 70);\nconsole.log(passing);\n\nconst person: [string, number] = ['Aria', 12];\nconst [personName, personAge] = person;\nconsole.log(`${personName} is ${personAge}`);\n\nconst entries: [string, number][] = [\n  ['Aria', 92],\n  ['Kiran', 78],\n];\nfor (const [entryName, entryScore] of entries) {\n  console.log(`${entryName}: ${entryScore}`);\n}",
    starterCode: "const temperatures: number[] = [18, 22, 25, 19];\nconst average = temperatures.reduce((sum, t) => sum + t, 0) / temperatures.length;\nconsole.log(average);\n\nconst point: [number, number] = [3, 4];\nconsole.log(`x=${point[0]}, y=${point[1]}`);",
  },
  {
    slug: 'type-narrowing',
    title: 'Type Narrowing',
    summary: 'Checking a value\'s type before using it',
    explanation: [
      'When a value could be more than one type, like string | number, TypeScript lets you narrow it down using checks such as typeof.',
      'Inside an if (typeof value === "string") block, TypeScript knows the value is a string and lets you safely use string methods on it.',
      'instanceof works the same way for classes, letting you check whether an object is an instance of a particular class before treating it as one.',
    ],
    example: "type Input = string | number;\n\nfunction describe(value: Input): string {\n  if (typeof value === 'string') {\n    return `Text of length ${value.length}: \"${value}\"`;\n  }\n  return `Number doubled: ${value * 2}`;\n}\n\nclass Cat {\n  meow(): string { return 'Meow!'; }\n}\n\nclass Robot {\n  beep(): string { return 'Beep!'; }\n}\n\nfunction makeSound(thing: Cat | Robot): string {\n  if (thing instanceof Cat) {\n    return thing.meow();\n  }\n  return thing.beep();\n}\n\nconsole.log(describe('hello'));\nconsole.log(describe(21));\nconsole.log(makeSound(new Cat()));\nconsole.log(makeSound(new Robot()));",
    starterCode: "type Id = string | number;\n\nfunction formatId(id: Id): string {\n  if (typeof id === 'number') {\n    return `#${id.toFixed(0)}`;\n  }\n  return id.toUpperCase();\n}\n\nconsole.log(formatId(42));\nconsole.log(formatId('abc123'));",
  },
]
