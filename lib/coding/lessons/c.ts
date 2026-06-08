import type { CodingLesson } from '../languages'

export const c: CodingLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to C',
    summary: 'Headers, the main function, and printf',
    explanation: [
      'C is a foundational systems language — fast, low-level, and the ancestor of many modern languages. Programs start by including headers like #include <stdio.h>.',
      'Execution starts at int main() { ... }. printf("...") prints text, and \\n starts a new line.',
      'Each statement ends with a semicolon ;, and main typically ends with return 0;.',
    ],
    example: '#include <stdio.h>\n\nint main() {\n  printf("Hello, world!\\n");\n  printf("%d\\n", 2 + 3 * 4);\n  return 0;\n}',
    starterCode: '#include <stdio.h>\n\nint main() {\n  printf("Hello, world!\\n");\n  printf("%d\\n", 7 * 6);\n  return 0;\n}',
  },
  {
    slug: 'variables',
    title: 'Variables & Types',
    summary: 'Declaring typed variables and format specifiers',
    explanation: [
      'C is statically typed — you state the type when declaring: int age = 12; double price = 4.5; char grade = \'A\';.',
      'printf uses format specifiers to print values: %d for int, %f for double, %c for char, %s for strings (char arrays).',
    ],
    example: '#include <stdio.h>\n\nint main() {\n  char name[] = "Aria";\n  int age = 12;\n  printf("%s is %d years old\\n", name, age);\n  return 0;\n}',
    starterCode: '#include <stdio.h>\n\nint main() {\n  char city[] = "Pokhara";\n  int temperature = 24;\n  printf("%s is %d degrees\\n", city, temperature);\n  return 0;\n}',
  },
  {
    slug: 'conditionals',
    title: 'Conditionals',
    summary: 'Branching with if / else if / else',
    explanation: [
      'if checks a condition in parentheses; else if checks another; else runs otherwise. Blocks are wrapped in { }.',
      'Comparison operators ==, !=, >, < produce 0 (false) or non-zero (true) values that conditionals use.',
    ],
    example: '#include <stdio.h>\n\nint main() {\n  int score = 82;\n  if (score >= 90) {\n    printf("Grade: A\\n");\n  } else if (score >= 75) {\n    printf("Grade: B\\n");\n  } else {\n    printf("Keep practising!\\n");\n  }\n  return 0;\n}',
    starterCode: '#include <stdio.h>\n\nint main() {\n  int temperature = 30;\n  if (temperature > 25) {\n    printf("It is warm\\n");\n  } else {\n    printf("It is cool\\n");\n  }\n  return 0;\n}',
  },
  {
    slug: 'loops',
    title: 'Loops',
    summary: 'Repeating with for and while',
    explanation: [
      'A for loop has three parts: for (int i = 1; i <= 5; i++) { ... } — start, condition, and update.',
      'A while loop repeats while its condition stays true (non-zero).',
    ],
    example: '#include <stdio.h>\n\nint main() {\n  for (int i = 1; i <= 5; i++) {\n    printf("Step %d\\n", i);\n  }\n  return 0;\n}',
    starterCode: '#include <stdio.h>\n\nint main() {\n  for (int i = 1; i <= 3; i++) {\n    printf("Count: %d\\n", i);\n  }\n  return 0;\n}',
  },
  {
    slug: 'functions',
    title: 'Functions',
    summary: 'Reusable blocks of logic',
    explanation: [
      'A function is declared with a return type, name, and parameters: int square(int n) { return n * n; }.',
      'Functions must be declared (or defined) before they are used in main, or given a prototype above main.',
    ],
    example: '#include <stdio.h>\n\nint square(int n) {\n  return n * n;\n}\n\nint main() {\n  printf("%d\\n", square(6));\n  printf("%d\\n", square(9));\n  return 0;\n}',
    starterCode: '#include <stdio.h>\n\nint doubleIt(int n) {\n  return n * 2;\n}\n\nint main() {\n  printf("%d\\n", doubleIt(21));\n  return 0;\n}',
  },
  {
    slug: 'arrays',
    title: 'Arrays',
    summary: 'Storing ordered collections of values',
    explanation: [
      'An array holds a fixed-size collection of one type: int scores[] = {70, 85, 92, 60};.',
      'Access elements with scores[0], and find the length with sizeof(scores) / sizeof(scores[0]).',
    ],
    example: '#include <stdio.h>\n\nint main() {\n  int scores[] = {70, 85, 92, 60};\n  int total = 0;\n  int len = sizeof(scores) / sizeof(scores[0]);\n  for (int i = 0; i < len; i++) {\n    total += scores[i];\n  }\n  printf("Total: %d\\n", total);\n  printf("Average: %d\\n", total / len);\n  return 0;\n}',
    starterCode: '#include <stdio.h>\n\nint main() {\n  int nums[] = {3, 6, 9};\n  for (int i = 0; i < 3; i++) {\n    printf("%d\\n", nums[i] * nums[i]);\n  }\n  return 0;\n}',
  },
]
