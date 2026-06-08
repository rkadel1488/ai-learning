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
  {
    slug: 'pointers',
    title: 'Pointers',
    summary: 'Storing addresses with & and dereferencing with *',
    explanation: [
      'A pointer holds the address of another variable: int x = 5; int *p = &x; — & takes an address, * declares a pointer or dereferences one.',
      '*p reads or writes the value at the address p points to, so *p = 10; changes x itself.',
      'Passing a pointer to a function lets that function modify the caller\'s variable directly — this is "passing by reference".',
    ],
    example: '#include <stdio.h>\n\nvoid increment(int *p) {\n  *p = *p + 1;\n}\n\nint main() {\n  int x = 5;\n  int *ptr = &x;\n  printf("Before: %d\\n", x);\n  printf("Address holds: %d\\n", *ptr);\n  increment(&x);\n  printf("After: %d\\n", x);\n  return 0;\n}',
    starterCode: '#include <stdio.h>\n\nvoid doubleValue(int *p) {\n  *p = *p * 2;\n}\n\nint main() {\n  int n = 21;\n  doubleValue(&n);\n  printf("%d\\n", n);\n  return 0;\n}',
  },
  {
    slug: 'strings',
    title: 'Strings in C',
    summary: 'Char arrays and the <string.h> helper functions',
    explanation: [
      'A C string is just a char array ending in a hidden \'\\0\' byte: char name[] = "Aria"; printf("%s\\n", name); prints it.',
      '#include <string.h> gives helpers like strlen (length), strcpy (copy), and strcmp (compare, returns 0 when equal).',
    ],
    example: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n  char greeting[20] = "Hello";\n  char name[] = "Aria";\n  printf("Length: %d\\n", (int)strlen(name));\n  strcat(greeting, ", ");\n  strcat(greeting, name);\n  printf("%s\\n", greeting);\n  if (strcmp(name, "Aria") == 0) {\n    printf("Names match\\n");\n  }\n  return 0;\n}',
    starterCode: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n  char word[20];\n  strcpy(word, "code");\n  printf("%s has %d letters\\n", word, (int)strlen(word));\n  return 0;\n}',
  },
  {
    slug: 'structs',
    title: 'Structs',
    summary: 'Grouping related fields into a custom type',
    explanation: [
      'struct lets you bundle several fields into one type: struct Point { int x; int y; };.',
      'Create and initialize an instance with struct Point p = {3, 4}; and access fields with the dot operator: p.x.',
    ],
    example: '#include <stdio.h>\n\nstruct Point {\n  int x;\n  int y;\n};\n\nint main() {\n  struct Point a = {3, 4};\n  struct Point b = {0, 0};\n  printf("a = (%d, %d)\\n", a.x, a.y);\n  printf("b = (%d, %d)\\n", b.x, b.y);\n  a.x = a.x + 1;\n  printf("a.x is now %d\\n", a.x);\n  return 0;\n}',
    starterCode: '#include <stdio.h>\n\nstruct Book {\n  char title[20];\n  int pages;\n};\n\nint main() {\n  struct Book b = {"C Basics", 120};\n  printf("%s has %d pages\\n", b.title, b.pages);\n  return 0;\n}',
  },
  {
    slug: 'recursion',
    title: 'Recursion',
    summary: 'Functions that call themselves to solve smaller problems',
    explanation: [
      'A recursive function calls itself with a smaller input, eventually reaching a base case that stops the recursion.',
      'factorial(n) = n * factorial(n - 1), with the base case factorial(0) = 1 — without a base case the recursion never ends.',
    ],
    example: '#include <stdio.h>\n\nint factorial(int n) {\n  if (n <= 1) {\n    return 1;\n  }\n  return n * factorial(n - 1);\n}\n\nint main() {\n  for (int i = 1; i <= 5; i++) {\n    printf("%d! = %d\\n", i, factorial(i));\n  }\n  return 0;\n}',
    starterCode: '#include <stdio.h>\n\nint fibonacci(int n) {\n  if (n <= 1) {\n    return n;\n  }\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nint main() {\n  printf("%d\\n", fibonacci(7));\n  return 0;\n}',
  },
  {
    slug: '2d-arrays',
    title: '2D Arrays',
    summary: 'Grids of values addressed with two indices',
    explanation: [
      'A 2D array is declared with two sizes: int grid[2][3] = {{1, 2, 3}, {4, 5, 6}}; — rows then columns.',
      'Visit every cell with nested loops: the outer loop walks rows, the inner loop walks columns, and grid[r][c] accesses one cell.',
    ],
    example: '#include <stdio.h>\n\nint main() {\n  int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};\n  int total = 0;\n  for (int r = 0; r < 2; r++) {\n    for (int c = 0; c < 3; c++) {\n      printf("%d ", grid[r][c]);\n      total += grid[r][c];\n    }\n    printf("\\n");\n  }\n  printf("Total: %d\\n", total);\n  return 0;\n}',
    starterCode: '#include <stdio.h>\n\nint main() {\n  int board[2][2] = {{1, 0}, {0, 1}};\n  for (int r = 0; r < 2; r++) {\n    for (int c = 0; c < 2; c++) {\n      printf("%d", board[r][c]);\n    }\n    printf("\\n");\n  }\n  return 0;\n}',
  },
  {
    slug: 'command-line-basics',
    title: 'Constants & Utility Programs',
    summary: 'Defining constants and combining concepts into a small program',
    explanation: [
      'Constants can be defined with #define MAX_SCORE 100 (a text substitution) or const int maxScore = 100; (a typed, immutable variable).',
      'Real programs combine arrays, loops, and functions — for example computing the minimum, maximum, and average of a list of values.',
    ],
    example: '#include <stdio.h>\n\n#define COUNT 5\n\nint main() {\n  int values[COUNT] = {12, 45, 7, 23, 39};\n  int min = values[0];\n  int max = values[0];\n  int total = 0;\n  for (int i = 0; i < COUNT; i++) {\n    if (values[i] < min) min = values[i];\n    if (values[i] > max) max = values[i];\n    total += values[i];\n  }\n  printf("Min: %d\\n", min);\n  printf("Max: %d\\n", max);\n  printf("Average: %d\\n", total / COUNT);\n  return 0;\n}',
    starterCode: '#include <stdio.h>\n\nconst int LIMIT = 3;\n\nint main() {\n  int nums[LIMIT] = {4, 8, 15};\n  int total = 0;\n  for (int i = 0; i < LIMIT; i++) {\n    total += nums[i];\n  }\n  printf("Sum: %d\\n", total);\n  return 0;\n}',
  },
]
