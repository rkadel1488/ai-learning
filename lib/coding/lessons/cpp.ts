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
  {
    slug: 'classes-and-objects',
    title: 'Classes & Objects',
    summary: 'Bundling data and behaviour with classes',
    explanation: [
      'A class groups data (fields) and behaviour (methods) into one type: private fields are hidden, while public methods form the interface.',
      'A constructor runs when an object is created — Dog d("Rex", 3); — and methods like d.bark() act on that object\'s own fields.',
    ],
    example: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Dog {\n  private:\n    string name;\n    int age;\n  public:\n    Dog(string n, int a) {\n      name = n;\n      age = a;\n    }\n    void describe() {\n      cout << name << " is " << age << " years old" << endl;\n    }\n};\n\nint main() {\n  Dog rex("Rex", 3);\n  Dog luna("Luna", 5);\n  rex.describe();\n  luna.describe();\n  return 0;\n}',
    starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Counter {\n  private:\n    int count;\n  public:\n    Counter() {\n      count = 0;\n    }\n    void increment() {\n      count = count + 1;\n    }\n    int value() {\n      return count;\n    }\n};\n\nint main() {\n  Counter c;\n  c.increment();\n  c.increment();\n  c.increment();\n  cout << c.value() << endl;\n  return 0;\n}',
  },
  {
    slug: 'inheritance',
    title: 'Inheritance',
    summary: 'Building new classes from existing ones',
    explanation: [
      'A derived class reuses a base class with `: public Base`, inheriting its fields and methods while adding or changing its own.',
      'Marking a base method `virtual` lets a derived class override it with its own version, and calling it through a base pointer or reference picks the derived behaviour.',
    ],
    example: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Animal {\n  public:\n    string name;\n    Animal(string n) {\n      name = n;\n    }\n    virtual void speak() {\n      cout << name << " makes a sound" << endl;\n    }\n};\n\nclass Cat : public Animal {\n  public:\n    Cat(string n) : Animal(n) {}\n    void speak() override {\n      cout << name << " says Meow" << endl;\n    }\n};\n\nint main() {\n  Animal generic("Creature");\n  Cat whiskers("Whiskers");\n  generic.speak();\n  whiskers.speak();\n  return 0;\n}',
    starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Shape {\n  public:\n    virtual void describe() {\n      cout << "A shape" << endl;\n    }\n};\n\nclass Square : public Shape {\n  public:\n    void describe() override {\n      cout << "A square has 4 equal sides" << endl;\n    }\n};\n\nint main() {\n  Square s;\n  s.describe();\n  return 0;\n}',
  },
  {
    slug: 'references-and-pointers',
    title: 'References & Pointers',
    summary: 'Aliasing variables and working with addresses',
    explanation: [
      'A reference is an alias for an existing variable: int &ref = x; — changes through ref change x directly, with no special syntax needed.',
      'A pointer stores an address: int *p = &x; and *p accesses the value there. Passing a reference parameter (void f(int &n)) lets a function modify the caller\'s variable, unlike passing by value which copies it.',
    ],
    example: '#include <iostream>\nusing namespace std;\n\nvoid addOneByValue(int n) {\n  n = n + 1;\n}\n\nvoid addOneByReference(int &n) {\n  n = n + 1;\n}\n\nint main() {\n  int x = 10;\n  addOneByValue(x);\n  cout << "After by-value: " << x << endl;\n  addOneByReference(x);\n  cout << "After by-reference: " << x << endl;\n  int *p = &x;\n  cout << "Pointer reads: " << *p << endl;\n  *p = 100;\n  cout << "After *p = 100: " << x << endl;\n  return 0;\n}',
    starterCode: '#include <iostream>\nusing namespace std;\n\nvoid doubleIt(int &n) {\n  n = n * 2;\n}\n\nint main() {\n  int value = 21;\n  doubleIt(value);\n  cout << value << endl;\n  return 0;\n}',
  },
  {
    slug: 'stl-maps-and-sets',
    title: 'Maps & Sets',
    summary: 'Key-value lookups and unique collections from the STL',
    explanation: [
      'A map<KeyType, ValueType> (#include <map>) stores key-value pairs and looks values up by key: ages["Aria"] = 12;.',
      'A set<Type> (#include <set>) stores unique values in sorted order — inserting a duplicate has no effect, and count() checks membership.',
    ],
    example: '#include <iostream>\n#include <map>\n#include <set>\n#include <string>\nusing namespace std;\n\nint main() {\n  map<string, int> ages;\n  ages["Aria"] = 12;\n  ages["Bodhi"] = 9;\n  ages["Aria"] = 13;\n  for (auto const &entry : ages) {\n    cout << entry.first << " is " << entry.second << endl;\n  }\n\n  set<int> uniqueNums;\n  uniqueNums.insert(4);\n  uniqueNums.insert(2);\n  uniqueNums.insert(4);\n  cout << "Set size: " << uniqueNums.size() << endl;\n  if (uniqueNums.count(2) > 0) {\n    cout << "2 is in the set" << endl;\n  }\n  return 0;\n}',
    starterCode: '#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\n\nint main() {\n  map<string, int> scores;\n  scores["Aria"] = 90;\n  scores["Bodhi"] = 75;\n  cout << "Aria scored " << scores["Aria"] << endl;\n  cout << "Bodhi scored " << scores["Bodhi"] << endl;\n  return 0;\n}',
  },
  {
    slug: 'strings',
    title: 'Strings in C++',
    summary: 'Working with std::string methods',
    explanation: [
      'std::string supports +, comparisons (==, <), and methods like length(), substr(start, len), and find(text) which returns the starting index or string::npos if not found.',
      'These methods make text processing far more convenient than raw C char arrays.',
    ],
    example: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string first = "Hello";\n  string second = "world";\n  string greeting = first + ", " + second + "!";\n  cout << greeting << endl;\n  cout << "Length: " << greeting.length() << endl;\n  cout << "Substring: " << greeting.substr(7, 5) << endl;\n  size_t pos = greeting.find("world");\n  if (pos != string::npos) {\n    cout << "Found world at index " << pos << endl;\n  }\n  if (first == "Hello") {\n    cout << "first equals Hello" << endl;\n  }\n  return 0;\n}',
    starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string word = "programming";\n  cout << "Length: " << word.length() << endl;\n  cout << "First 4: " << word.substr(0, 4) << endl;\n  return 0;\n}',
  },
  {
    slug: 'exceptions',
    title: 'Exceptions',
    summary: 'Handling errors with try, throw, and catch',
    explanation: [
      'A try block runs code that might fail; throw raises an exception, and a matching catch block handles it instead of crashing the program.',
      'std::exception is the standard base type for exceptions, and you can derive your own custom exception classes from it by overriding what().',
    ],
    example: '#include <iostream>\n#include <stdexcept>\n#include <string>\nusing namespace std;\n\nclass NegativeValueError : public exception {\n  public:\n    const char *what() const throw() {\n      return "value must not be negative";\n    }\n};\n\ndouble safeSqrt(double x) {\n  if (x < 0) {\n    throw NegativeValueError();\n  }\n  return x * x;\n}\n\nint main() {\n  try {\n    cout << safeSqrt(4) << endl;\n    cout << safeSqrt(-9) << endl;\n  } catch (const NegativeValueError &e) {\n    cout << "Caught error: " << e.what() << endl;\n  }\n\n  try {\n    throw runtime_error("something went wrong");\n  } catch (const exception &e) {\n    cout << "Caught: " << e.what() << endl;\n  }\n  return 0;\n}',
    starterCode: '#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nint divide(int a, int b) {\n  if (b == 0) {\n    throw runtime_error("division by zero");\n  }\n  return a / b;\n}\n\nint main() {\n  try {\n    cout << divide(10, 2) << endl;\n    cout << divide(5, 0) << endl;\n  } catch (const exception &e) {\n    cout << "Error: " << e.what() << endl;\n  }\n  return 0;\n}',
  },
]
