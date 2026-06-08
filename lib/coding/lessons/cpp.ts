import type { CodingLesson } from '../languages'

export const cpp: CodingLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to C++',
    summary: 'Headers, the main function, and cout',
    explanation: [
      'C++ extends C with object-oriented features while staying close to the hardware. Programs include headers like #include <iostream> and use the std namespace.',
      'Execution starts at int main() { ... }. std::cout << ... << std::endl; prints output, with << chaining values together.',
      'Each statement ends with a semicolon ;, and main typically ends with return 0;.',
    ],
    example: '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, world!" << endl;\n  cout << (2 + 3 * 4) << endl;\n  return 0;\n}',
    starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, world!" << endl;\n  cout << (7 * 6) << endl;\n  return 0;\n}',
  },
  {
    slug: 'variables',
    title: 'Variables & Types',
    summary: 'Declaring typed variables',
    explanation: [
      'C++ is statically typed — you state the type when declaring: int age = 12; double price = 4.5; string name = "Aria"; (requires #include <string>).',
      'Common types include int, double, bool, char, and string. Combine values in cout with <<.',
    ],
    example: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string name = "Aria";\n  int age = 12;\n  cout << name << " is " << age << " years old" << endl;\n  return 0;\n}',
    starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string city = "Pokhara";\n  int temperature = 24;\n  cout << city << " is " << temperature << " degrees" << endl;\n  return 0;\n}',
  },
  {
    slug: 'conditionals',
    title: 'Conditionals',
    summary: 'Branching with if / else if / else',
    explanation: [
      'if checks a condition in parentheses; else if checks another; else runs otherwise. Blocks are wrapped in { }.',
      'Comparison operators ==, !=, >, < produce bool values (true or false) that conditionals use.',
    ],
    example: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int score = 82;\n  if (score >= 90) {\n    cout << "Grade: A" << endl;\n  } else if (score >= 75) {\n    cout << "Grade: B" << endl;\n  } else {\n    cout << "Keep practising!" << endl;\n  }\n  return 0;\n}',
    starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int temperature = 30;\n  if (temperature > 25) {\n    cout << "It is warm" << endl;\n  } else {\n    cout << "It is cool" << endl;\n  }\n  return 0;\n}',
  },
  {
    slug: 'loops',
    title: 'Loops',
    summary: 'Repeating with for and while',
    explanation: [
      'A for loop has three parts: for (int i = 1; i <= 5; i++) { ... } — start, condition, and update.',
      'A while loop repeats while its condition stays true.',
    ],
    example: '#include <iostream>\nusing namespace std;\n\nint main() {\n  for (int i = 1; i <= 5; i++) {\n    cout << "Step " << i << endl;\n  }\n  return 0;\n}',
    starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n  for (int i = 1; i <= 3; i++) {\n    cout << "Count: " << i << endl;\n  }\n  return 0;\n}',
  },
  {
    slug: 'functions',
    title: 'Functions',
    summary: 'Reusable blocks of logic',
    explanation: [
      'A function is declared with a return type, name, and parameters: int square(int n) { return n * n; }.',
      'Functions defined above main can be called directly from it.',
    ],
    example: '#include <iostream>\nusing namespace std;\n\nint square(int n) {\n  return n * n;\n}\n\nint main() {\n  cout << square(6) << endl;\n  cout << square(9) << endl;\n  return 0;\n}',
    starterCode: '#include <iostream>\nusing namespace std;\n\nint doubleIt(int n) {\n  return n * 2;\n}\n\nint main() {\n  cout << doubleIt(21) << endl;\n  return 0;\n}',
  },
  {
    slug: 'vectors',
    title: 'Arrays & Vectors',
    summary: 'Storing ordered collections of values',
    explanation: [
      'A fixed-size array holds one type: int nums[] = {1, 2, 3};. A vector (#include <vector>) is a resizable array: vector<int> scores = {70, 85, 92, 60};.',
      'Access elements with scores[0], get the size with scores.size(), and loop with a for or range-based for loop.',
    ],
    example: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> scores = {70, 85, 92, 60};\n  int total = 0;\n  for (int s : scores) {\n    total += s;\n  }\n  cout << "Total: " << total << endl;\n  cout << "Average: " << (total / (int)scores.size()) << endl;\n  return 0;\n}',
    starterCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> nums = {3, 6, 9};\n  for (int n : nums) {\n    cout << (n * n) << endl;\n  }\n  return 0;\n}',
  },
]
