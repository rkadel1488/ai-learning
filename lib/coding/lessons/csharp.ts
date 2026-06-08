import type { CodingLesson } from '../languages'

export const csharp: CodingLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to C#',
    summary: 'Classes, the Main method, and Console.WriteLine',
    explanation: [
      'C# is Microsoft\'s flagship language, used for everything from desktop apps to games (Unity) to web servers. Code lives inside classes.',
      'Execution starts at static void Main(string[] args). Console.WriteLine(...) prints a line of output.',
      'Each statement ends with a semicolon ;.',
    ],
    example: 'using System;\n\nclass Program {\n  static void Main(string[] args) {\n    Console.WriteLine("Hello, world!");\n    Console.WriteLine(2 + 3 * 4);\n  }\n}',
    starterCode: 'using System;\n\nclass Program {\n  static void Main(string[] args) {\n    Console.WriteLine("Hello, world!");\n    Console.WriteLine(7 * 6);\n  }\n}',
  },
  {
    slug: 'variables',
    title: 'Variables & Types',
    summary: 'Declaring typed variables',
    explanation: [
      'C# is statically typed — you state the type when declaring: int age = 12; string name = "Aria"; double price = 4.5;.',
      'Common types include int, double, bool, char, and string. Use $"..." (string interpolation) to embed variables in text.',
    ],
    example: 'using System;\n\nclass Program {\n  static void Main(string[] args) {\n    string name = "Aria";\n    int age = 12;\n    Console.WriteLine($"{name} is {age} years old");\n  }\n}',
    starterCode: 'using System;\n\nclass Program {\n  static void Main(string[] args) {\n    string city = "Pokhara";\n    int temperature = 24;\n    Console.WriteLine($"{city} is {temperature} degrees");\n  }\n}',
  },
  {
    slug: 'conditionals',
    title: 'Conditionals',
    summary: 'Branching with if / else if / else',
    explanation: [
      'if checks a condition in parentheses; else if checks another; else runs otherwise. Blocks are wrapped in { }.',
      'Comparison operators ==, !=, >, < produce bool values that conditionals use.',
    ],
    example: 'using System;\n\nclass Program {\n  static void Main(string[] args) {\n    int score = 82;\n    if (score >= 90) {\n      Console.WriteLine("Grade: A");\n    } else if (score >= 75) {\n      Console.WriteLine("Grade: B");\n    } else {\n      Console.WriteLine("Keep practising!");\n    }\n  }\n}',
    starterCode: 'using System;\n\nclass Program {\n  static void Main(string[] args) {\n    int temperature = 30;\n    if (temperature > 25) {\n      Console.WriteLine("It is warm");\n    } else {\n      Console.WriteLine("It is cool");\n    }\n  }\n}',
  },
  {
    slug: 'loops',
    title: 'Loops',
    summary: 'Repeating with for and while',
    explanation: [
      'A for loop has three parts: for (int i = 1; i <= 5; i++) { ... } — start, condition, and update.',
      'A while loop repeats while its condition stays true.',
    ],
    example: 'using System;\n\nclass Program {\n  static void Main(string[] args) {\n    for (int i = 1; i <= 5; i++) {\n      Console.WriteLine($"Step {i}");\n    }\n  }\n}',
    starterCode: 'using System;\n\nclass Program {\n  static void Main(string[] args) {\n    for (int i = 1; i <= 3; i++) {\n      Console.WriteLine($"Count: {i}");\n    }\n  }\n}',
  },
  {
    slug: 'methods',
    title: 'Methods',
    summary: 'Reusable blocks of logic',
    explanation: [
      'A method is declared with a return type, name, and parameters: static int Square(int n) { return n * n; }.',
      'Static methods belong to the class itself and can be called directly from Main.',
    ],
    example: 'using System;\n\nclass Program {\n  static int Square(int n) {\n    return n * n;\n  }\n  static void Main(string[] args) {\n    Console.WriteLine(Square(6));\n    Console.WriteLine(Square(9));\n  }\n}',
    starterCode: 'using System;\n\nclass Program {\n  static int DoubleIt(int n) {\n    return n * 2;\n  }\n  static void Main(string[] args) {\n    Console.WriteLine(DoubleIt(21));\n  }\n}',
  },
  {
    slug: 'arrays',
    title: 'Arrays',
    summary: 'Storing ordered collections of values',
    explanation: [
      'An array holds a fixed-size collection of one type: int[] scores = {70, 85, 92, 60};.',
      'Access elements with scores[0], get the length with scores.Length, and loop with a for or foreach loop.',
    ],
    example: 'using System;\n\nclass Program {\n  static void Main(string[] args) {\n    int[] scores = {70, 85, 92, 60};\n    int total = 0;\n    foreach (int s in scores) {\n      total += s;\n    }\n    Console.WriteLine($"Total: {total}");\n    Console.WriteLine($"Average: {total / scores.Length}");\n  }\n}',
    starterCode: 'using System;\n\nclass Program {\n  static void Main(string[] args) {\n    int[] nums = {3, 6, 9};\n    foreach (int n in nums) {\n      Console.WriteLine(n * n);\n    }\n  }\n}',
  },
]
