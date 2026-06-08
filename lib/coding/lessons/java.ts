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
  {
    slug: 'classes-and-objects',
    title: 'Classes & Objects',
    summary: 'Defining a class with fields and a constructor',
    explanation: [
      'A class is a blueprint with fields (data) and methods (behaviour). A constructor sets up a new object\'s initial state.',
      'Use the new keyword to create an instance, and dot notation like dog.bark() to call its methods.',
    ],
    example: 'class Dog {\n  String name;\n  int age;\n\n  Dog(String name, int age) {\n    this.name = name;\n    this.age = age;\n  }\n\n  void bark() {\n    System.out.println(name + " says Woof!");\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Dog rex = new Dog("Rex", 3);\n    Dog luna = new Dog("Luna", 5);\n    rex.bark();\n    luna.bark();\n    System.out.println(rex.name + " is " + rex.age + " years old");\n  }\n}',
    starterCode: 'class Book {\n  String title;\n\n  Book(String title) {\n    this.title = title;\n  }\n\n  void describe() {\n    System.out.println("Book: " + title);\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Book b = new Book("Java Basics");\n    b.describe();\n  }\n}',
  },
  {
    slug: 'inheritance',
    title: 'Inheritance',
    summary: 'Sharing behaviour with extends and super',
    explanation: [
      'A class can extend another class to reuse its fields and methods, forming a parent-child relationship.',
      'Use super(...) to call the parent constructor, and override a method by redeclaring it with the same signature in the subclass.',
    ],
    example: 'class Animal {\n  String name;\n\n  Animal(String name) {\n    this.name = name;\n  }\n\n  void speak() {\n    System.out.println(name + " makes a sound");\n  }\n}\n\nclass Cat extends Animal {\n  Cat(String name) {\n    super(name);\n  }\n\n  @Override\n  void speak() {\n    System.out.println(name + " says Meow");\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Animal generic = new Animal("Creature");\n    Animal cat = new Cat("Whiskers");\n    generic.speak();\n    cat.speak();\n  }\n}',
    starterCode: 'class Vehicle {\n  void drive() {\n    System.out.println("The vehicle moves");\n  }\n}\n\nclass Car extends Vehicle {\n  @Override\n  void drive() {\n    System.out.println("The car zooms down the road");\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Vehicle v = new Car();\n    v.drive();\n  }\n}',
  },
  {
    slug: 'interfaces',
    title: 'Interfaces',
    summary: 'Declaring contracts with interface and implements',
    explanation: [
      'An interface declares method signatures without bodies; a class agrees to the contract using implements and supplies the implementation.',
      'Different classes can implement the same interface in their own way, so code that uses the interface type works polymorphically with any of them.',
    ],
    example: 'interface Shape {\n  double area();\n}\n\nclass Circle implements Shape {\n  double radius;\n\n  Circle(double radius) {\n    this.radius = radius;\n  }\n\n  public double area() {\n    return Math.PI * radius * radius;\n  }\n}\n\nclass Square implements Shape {\n  double side;\n\n  Square(double side) {\n    this.side = side;\n  }\n\n  public double area() {\n    return side * side;\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Shape[] shapes = { new Circle(2), new Square(3) };\n    for (Shape s : shapes) {\n      System.out.println("Area: " + s.area());\n    }\n  }\n}',
    starterCode: 'interface Greeter {\n  String greet(String name);\n}\n\nclass Friendly implements Greeter {\n  public String greet(String name) {\n    return "Hello, " + name + "!";\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Greeter g = new Friendly();\n    System.out.println(g.greet("Aria"));\n  }\n}',
  },
  {
    slug: 'collections',
    title: 'Collections',
    summary: 'Storing growable lists with ArrayList',
    explanation: [
      'ArrayList<T> from java.util is a resizable list — import it with import java.util.*; and create one with new ArrayList<>().',
      'Use add(value) to append, get(index) to read, size() for the count, and a for-each loop to visit every element.',
    ],
    example: 'import java.util.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> fruits = new ArrayList<>();\n    fruits.add("apple");\n    fruits.add("banana");\n    fruits.add("cherry");\n\n    System.out.println("Count: " + fruits.size());\n    System.out.println("First: " + fruits.get(0));\n    for (String fruit : fruits) {\n      System.out.println("- " + fruit);\n    }\n  }\n}',
    starterCode: 'import java.util.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<Integer> numbers = new ArrayList<>();\n    numbers.add(10);\n    numbers.add(20);\n    numbers.add(30);\n    for (int n : numbers) {\n      System.out.println(n);\n    }\n  }\n}',
  },
  {
    slug: 'strings',
    title: 'Strings',
    summary: 'Working with text using common String methods',
    explanation: [
      'Strings support handy methods like length(), substring(start, end), toUpperCase(), and split(delimiter).',
      'Combine text with + concatenation, and compare contents with .equals(...) rather than == .',
    ],
    example: 'public class Main {\n  public static void main(String[] args) {\n    String message = "Hello, Java World";\n    System.out.println("Length: " + message.length());\n    System.out.println("Upper: " + message.toUpperCase());\n    System.out.println("Substring: " + message.substring(7, 11));\n\n    String[] words = message.split(" ");\n    for (String word : words) {\n      System.out.println("Word: " + word);\n    }\n\n    String greeting = "Hi" + ", " + "there";\n    System.out.println(greeting.equals("Hi, there"));\n  }\n}',
    starterCode: 'public class Main {\n  public static void main(String[] args) {\n    String name = "aria";\n    System.out.println(name.toUpperCase());\n    System.out.println(name.length());\n    System.out.println(name.equals("aria"));\n  }\n}',
  },
  {
    slug: 'exceptions',
    title: 'Exceptions',
    summary: 'Handling errors with try, catch, finally, and throw',
    explanation: [
      'Code that might fail goes in a try block; a matching catch block handles the resulting exception, and finally always runs afterwards.',
      'You can throw your own exceptions, including custom ones defined by extending Exception.',
    ],
    example: 'class InvalidAgeException extends Exception {\n  InvalidAgeException(String message) {\n    super(message);\n  }\n}\n\npublic class Main {\n  static void checkAge(int age) throws InvalidAgeException {\n    if (age < 0) {\n      throw new InvalidAgeException("Age cannot be negative");\n    }\n    System.out.println("Age " + age + " is valid");\n  }\n\n  public static void main(String[] args) {\n    try {\n      int result = 10 / 0;\n      System.out.println(result);\n    } catch (ArithmeticException e) {\n      System.out.println("Caught: " + e.getMessage());\n    } finally {\n      System.out.println("Division attempt finished");\n    }\n\n    try {\n      checkAge(-5);\n    } catch (InvalidAgeException e) {\n      System.out.println("Caught: " + e.getMessage());\n    }\n  }\n}',
    starterCode: 'public class Main {\n  public static void main(String[] args) {\n    try {\n      int[] nums = {1, 2, 3};\n      System.out.println(nums[5]);\n    } catch (ArrayIndexOutOfBoundsException e) {\n      System.out.println("Caught an error: " + e.getMessage());\n    } finally {\n      System.out.println("Done checking the array");\n    }\n  }\n}',
  },
]
