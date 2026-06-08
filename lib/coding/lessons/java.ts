import type { CodingLesson } from '../languages'

export const java: CodingLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to Java',
    summary: 'Classes, the main method, and printing output',
    explanation: [
      'Java is a popular, strongly-typed language used for everything from Android apps to enterprise servers. Every program lives inside a class.',
      'Execution starts at public static void main(String[] args). System.out.println(...) prints a line of output.',
      'Each statement ends with a semicolon ;.',
    ],
    example: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, world!");\n    System.out.println(2 + 3 * 4);\n  }\n}',
    starterCode: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, world!");\n    System.out.println(7 * 6);\n  }\n}',
  },
  {
    slug: 'variables',
    title: 'Variables & Types',
    summary: 'Declaring typed variables',
    explanation: [
      'Java is statically typed — you state the type when declaring a variable: int age = 12; String name = "Aria";.',
      'Common types include int (whole numbers), double (decimals), boolean (true/false), and String (text).',
    ],
    example: 'public class Main {\n  public static void main(String[] args) {\n    String name = "Aria";\n    int age = 12;\n    System.out.println(name + " is " + age + " years old");\n  }\n}',
    starterCode: 'public class Main {\n  public static void main(String[] args) {\n    String city = "Pokhara";\n    int temperature = 24;\n    System.out.println(city + " is " + temperature + " degrees");\n  }\n}',
  },
  {
    slug: 'conditionals',
    title: 'Conditionals',
    summary: 'Branching with if / else if / else',
    explanation: [
      'if checks a condition in parentheses; else if checks another; else runs otherwise. Blocks are wrapped in { }.',
      'Comparison operators ==, !=, >, < produce boolean values that conditionals use.',
    ],
    example: 'public class Main {\n  public static void main(String[] args) {\n    int score = 82;\n    if (score >= 90) {\n      System.out.println("Grade: A");\n    } else if (score >= 75) {\n      System.out.println("Grade: B");\n    } else {\n      System.out.println("Keep practising!");\n    }\n  }\n}',
    starterCode: 'public class Main {\n  public static void main(String[] args) {\n    int temperature = 30;\n    if (temperature > 25) {\n      System.out.println("It is warm");\n    } else {\n      System.out.println("It is cool");\n    }\n  }\n}',
  },
  {
    slug: 'loops',
    title: 'Loops',
    summary: 'Repeating with for and while',
    explanation: [
      'A for loop has three parts: for (int i = 0; i < 5; i++) { ... } — start, condition, and update.',
      'A while loop repeats while its condition stays true.',
    ],
    example: 'public class Main {\n  public static void main(String[] args) {\n    for (int i = 1; i <= 5; i++) {\n      System.out.println("Step " + i);\n    }\n  }\n}',
    starterCode: 'public class Main {\n  public static void main(String[] args) {\n    for (int i = 1; i <= 3; i++) {\n      System.out.println("Count: " + i);\n    }\n  }\n}',
  },
  {
    slug: 'methods',
    title: 'Methods',
    summary: 'Reusable blocks of logic',
    explanation: [
      'A method is declared with a return type, name, and parameters: static int square(int n) { return n * n; }.',
      'Use static methods when you do not need an object instance — they can be called directly from main.',
    ],
    example: 'public class Main {\n  static int square(int n) {\n    return n * n;\n  }\n  public static void main(String[] args) {\n    System.out.println(square(6));\n    System.out.println(square(9));\n  }\n}',
    starterCode: 'public class Main {\n  static int doubleIt(int n) {\n    return n * 2;\n  }\n  public static void main(String[] args) {\n    System.out.println(doubleIt(21));\n  }\n}',
  },
  {
    slug: 'arrays',
    title: 'Arrays',
    summary: 'Storing ordered collections of values',
    explanation: [
      'An array holds a fixed-size collection of one type: int[] nums = {1, 2, 3, 4, 5};.',
      'Access elements with nums[0], get the length with nums.length, and loop with a for or for-each loop.',
    ],
    example: 'public class Main {\n  public static void main(String[] args) {\n    int[] scores = {70, 85, 92, 60};\n    int total = 0;\n    for (int s : scores) {\n      total += s;\n    }\n    System.out.println("Total: " + total);\n    System.out.println("Average: " + (total / scores.length));\n  }\n}',
    starterCode: 'public class Main {\n  public static void main(String[] args) {\n    int[] nums = {3, 6, 9};\n    for (int n : nums) {\n      System.out.println(n * n);\n    }\n  }\n}',
  },
]
