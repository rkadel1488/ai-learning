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
  {
    slug: 'classes-and-objects',
    title: 'Classes & Objects',
    summary: 'Defining a class with fields and a constructor',
    explanation: [
      'A class is a blueprint with fields (data) and methods (behaviour). A constructor runs when you create a new instance with new.',
      'Use dot notation like dog.Bark() to call methods on an object and access its fields.',
    ],
    example: 'using System;\n\nclass Dog {\n  public string Name;\n  public int Age;\n\n  public Dog(string name, int age) {\n    Name = name;\n    Age = age;\n  }\n\n  public void Bark() {\n    Console.WriteLine($"{Name} says Woof!");\n  }\n}\n\nclass Program {\n  static void Main(string[] args) {\n    Dog rex = new Dog("Rex", 3);\n    Dog luna = new Dog("Luna", 5);\n    rex.Bark();\n    luna.Bark();\n    Console.WriteLine($"{rex.Name} is {rex.Age} years old");\n  }\n}',
    starterCode: 'using System;\n\nclass Book {\n  public string Title;\n\n  public Book(string title) {\n    Title = title;\n  }\n\n  public void Describe() {\n    Console.WriteLine($"Book: {Title}");\n  }\n}\n\nclass Program {\n  static void Main(string[] args) {\n    Book b = new Book("C# Basics");\n    b.Describe();\n  }\n}',
  },
  {
    slug: 'inheritance',
    title: 'Inheritance',
    summary: 'Sharing behaviour with base classes and override',
    explanation: [
      'A class can inherit from another with a colon, e.g. class Cat : Animal, reusing its fields and methods.',
      'Mark a parent method virtual and a child method override to customise behaviour, and use base(...) to call the parent constructor or methods.',
    ],
    example: 'using System;\n\nclass Animal {\n  public string Name;\n\n  public Animal(string name) {\n    Name = name;\n  }\n\n  public virtual void Speak() {\n    Console.WriteLine($"{Name} makes a sound");\n  }\n}\n\nclass Cat : Animal {\n  public Cat(string name) : base(name) { }\n\n  public override void Speak() {\n    Console.WriteLine($"{Name} says Meow");\n  }\n}\n\nclass Program {\n  static void Main(string[] args) {\n    Animal generic = new Animal("Creature");\n    Animal cat = new Cat("Whiskers");\n    generic.Speak();\n    cat.Speak();\n  }\n}',
    starterCode: 'using System;\n\nclass Vehicle {\n  public virtual void Drive() {\n    Console.WriteLine("The vehicle moves");\n  }\n}\n\nclass Car : Vehicle {\n  public override void Drive() {\n    Console.WriteLine("The car zooms down the road");\n  }\n}\n\nclass Program {\n  static void Main(string[] args) {\n    Vehicle v = new Car();\n    v.Drive();\n  }\n}',
  },
  {
    slug: 'interfaces',
    title: 'Interfaces',
    summary: 'Declaring contracts with interface and implementing them',
    explanation: [
      'An interface declares method signatures without bodies; a class agrees to the contract by listing it after a colon and providing implementations.',
      'Code written against the interface type can work with any implementing class, giving you polymorphism.',
    ],
    example: 'using System;\n\ninterface IShape {\n  double Area();\n}\n\nclass Circle : IShape {\n  public double Radius;\n\n  public Circle(double radius) {\n    Radius = radius;\n  }\n\n  public double Area() {\n    return Math.PI * Radius * Radius;\n  }\n}\n\nclass Square : IShape {\n  public double Side;\n\n  public Square(double side) {\n    Side = side;\n  }\n\n  public double Area() {\n    return Side * Side;\n  }\n}\n\nclass Program {\n  static void Main(string[] args) {\n    IShape[] shapes = { new Circle(2), new Square(3) };\n    foreach (IShape s in shapes) {\n      Console.WriteLine($"Area: {s.Area()}");\n    }\n  }\n}',
    starterCode: 'using System;\n\ninterface IGreeter {\n  string Greet(string name);\n}\n\nclass Friendly : IGreeter {\n  public string Greet(string name) {\n    return $"Hello, {name}!";\n  }\n}\n\nclass Program {\n  static void Main(string[] args) {\n    IGreeter g = new Friendly();\n    Console.WriteLine(g.Greet("Aria"));\n  }\n}',
  },
  {
    slug: 'collections',
    title: 'Collections',
    summary: 'Storing growable lists with List<T>',
    explanation: [
      'List<T> from System.Collections.Generic is a resizable list — import the namespace and create one with new List<T>().',
      'Use Add(value) to append, indexing like list[0] to read, Count for the size, and foreach to visit every element.',
    ],
    example: 'using System;\nusing System.Collections.Generic;\n\nclass Program {\n  static void Main(string[] args) {\n    List<string> fruits = new List<string>();\n    fruits.Add("apple");\n    fruits.Add("banana");\n    fruits.Add("cherry");\n\n    Console.WriteLine($"Count: {fruits.Count}");\n    Console.WriteLine($"First: {fruits[0]}");\n    foreach (string fruit in fruits) {\n      Console.WriteLine($"- {fruit}");\n    }\n  }\n}',
    starterCode: 'using System;\nusing System.Collections.Generic;\n\nclass Program {\n  static void Main(string[] args) {\n    List<int> numbers = new List<int>();\n    numbers.Add(10);\n    numbers.Add(20);\n    numbers.Add(30);\n    foreach (int n in numbers) {\n      Console.WriteLine(n);\n    }\n  }\n}',
  },
  {
    slug: 'linq',
    title: 'LINQ',
    summary: 'Querying collections with Where, Select, and OrderBy',
    explanation: [
      'LINQ (System.Linq) lets you query lists in a declarative style: Where filters, Select transforms, and OrderBy sorts.',
      'These methods return sequences you can loop over with foreach, often chained together and finished with ToList().',
    ],
    example: 'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n  static void Main(string[] args) {\n    List<int> numbers = new List<int> { 5, 1, 9, 3, 8, 2 };\n\n    var evens = numbers.Where(n => n % 2 == 0);\n    Console.WriteLine("Evens:");\n    foreach (int n in evens) {\n      Console.WriteLine(n);\n    }\n\n    var doubled = numbers.Select(n => n * 2).ToList();\n    Console.WriteLine($"First doubled: {doubled[0]}");\n\n    var sorted = numbers.OrderBy(n => n).ToList();\n    Console.WriteLine("Sorted:");\n    foreach (int n in sorted) {\n      Console.WriteLine(n);\n    }\n  }\n}',
    starterCode: 'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n  static void Main(string[] args) {\n    List<string> names = new List<string> { "Mira", "Eli", "Aria", "Sam" };\n    var shortNames = names.Where(n => n.Length <= 3).ToList();\n    foreach (string n in shortNames) {\n      Console.WriteLine(n);\n    }\n  }\n}',
  },
  {
    slug: 'exception-handling',
    title: 'Exception Handling',
    summary: 'Handling errors with try, catch, finally, and throw',
    explanation: [
      'Risky code goes in a try block; a matching catch block handles the exception, and finally always runs afterwards.',
      'You can throw your own exceptions, including custom ones defined by extending Exception.',
    ],
    example: 'using System;\n\nclass InvalidAgeException : Exception {\n  public InvalidAgeException(string message) : base(message) { }\n}\n\nclass Program {\n  static void CheckAge(int age) {\n    if (age < 0) {\n      throw new InvalidAgeException("Age cannot be negative");\n    }\n    Console.WriteLine($"Age {age} is valid");\n  }\n\n  static void Main(string[] args) {\n    try {\n      int a = 10;\n      int b = 0;\n      Console.WriteLine(a / b);\n    } catch (DivideByZeroException e) {\n      Console.WriteLine($"Caught: {e.Message}");\n    } finally {\n      Console.WriteLine("Division attempt finished");\n    }\n\n    try {\n      CheckAge(-5);\n    } catch (InvalidAgeException e) {\n      Console.WriteLine($"Caught: {e.Message}");\n    }\n  }\n}',
    starterCode: 'using System;\n\nclass Program {\n  static void Main(string[] args) {\n    try {\n      int[] nums = { 1, 2, 3 };\n      Console.WriteLine(nums[5]);\n    } catch (IndexOutOfRangeException e) {\n      Console.WriteLine($"Caught an error: {e.Message}");\n    } finally {\n      Console.WriteLine("Done checking the array");\n    }\n  }\n}',
  },
]
