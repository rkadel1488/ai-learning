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
  {
    slug: 'enums-and-switch',
    title: 'Enums & Switch Statements',
    summary: 'Naming fixed sets of values and branching with switch',
    explanation: [
      'An enum defines a fixed set of named constants, like enum Direction { UP, DOWN, LEFT, RIGHT };. It is a type-safe alternative to using plain numbers or strings to represent a small set of options.',
      'A switch statement branches on a single value: switch (x) { case A: ...; break; default: ...; }. Each case checks for equality with one value, and break stops it from falling through into the next case.',
      'Where if/else if chains re-check a condition each time, switch jumps straight to the matching case, which often reads more cleanly when you are comparing one value against several exact possibilities, such as an enum constant.',
    ],
    example: 'enum Direction {\n  UP, DOWN, LEFT, RIGHT\n}\n\npublic class Main {\n  static String describe(Direction dir) {\n    switch (dir) {\n      case UP:\n        return "Heading north";\n      case DOWN:\n        return "Heading south";\n      case LEFT:\n        return "Heading west";\n      case RIGHT:\n        return "Heading east";\n      default:\n        return "Unknown direction";\n    }\n  }\n\n  public static void main(String[] args) {\n    Direction current = Direction.LEFT;\n    System.out.println(describe(current));\n\n    int day = 3;\n    switch (day) {\n      case 1:\n        System.out.println("Monday");\n        break;\n      case 2:\n        System.out.println("Tuesday");\n        break;\n      case 3:\n        System.out.println("Wednesday");\n        break;\n      default:\n        System.out.println("Some other day");\n        break;\n    }\n  }\n}',
    starterCode: 'enum Season {\n  SPRING, SUMMER, FALL, WINTER\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Season today = Season.SUMMER;\n    switch (today) {\n      case SPRING:\n        System.out.println("Flowers are blooming");\n        break;\n      case SUMMER:\n        System.out.println("Time for the beach");\n        break;\n      case FALL:\n        System.out.println("Leaves are falling");\n        break;\n      case WINTER:\n        System.out.println("Grab a coat");\n        break;\n    }\n  }\n}',
  },
  {
    slug: 'generics-and-abstract-classes',
    title: 'Generics & Abstract Classes',
    summary: 'Writing reusable generic types and partial blueprints',
    explanation: [
      'A generic class works with a placeholder type, written in angle brackets: class Box<T> { private T value; ... }. The same Box class can hold a String, an Integer, or any other type, and the compiler still checks that the types stay consistent.',
      'An abstract class is a blueprint that cannot be instantiated directly. Unlike an interface, it can hold fields and provide fully working methods alongside abstract ones — methods declared without a body that every subclass must implement.',
      'This makes abstract classes useful when related classes share both state and some common behaviour, but still need to fill in a few details themselves, such as how to calculate their own area.',
    ],
    example: 'class Box<T> {\n  private T value;\n\n  Box(T value) {\n    this.value = value;\n  }\n\n  T getValue() {\n    return value;\n  }\n\n  void setValue(T value) {\n    this.value = value;\n  }\n}\n\nabstract class Shape {\n  String name;\n\n  Shape(String name) {\n    this.name = name;\n  }\n\n  abstract double area();\n\n  void describe() {\n    System.out.println(name + " has area " + area());\n  }\n}\n\nclass Rectangle extends Shape {\n  double width;\n  double height;\n\n  Rectangle(double width, double height) {\n    super("Rectangle");\n    this.width = width;\n    this.height = height;\n  }\n\n  @Override\n  double area() {\n    return width * height;\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Box<String> nameBox = new Box<>("Aria");\n    Box<Integer> ageBox = new Box<>(12);\n    System.out.println("Box holds: " + nameBox.getValue());\n    System.out.println("Box holds: " + ageBox.getValue());\n\n    Shape rect = new Rectangle(4, 5);\n    rect.describe();\n  }\n}',
    starterCode: 'class Pair<T> {\n  private T first;\n  private T second;\n\n  Pair(T first, T second) {\n    this.first = first;\n    this.second = second;\n  }\n\n  void show() {\n    System.out.println(first + " and " + second);\n  }\n}\n\nabstract class Animal {\n  abstract void makeSound();\n\n  void introduce() {\n    System.out.println("I am an animal");\n    makeSound();\n  }\n}\n\nclass Dog extends Animal {\n  @Override\n  void makeSound() {\n    System.out.println("Woof!");\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Pair<Integer> scores = new Pair<>(10, 20);\n    scores.show();\n\n    Animal pet = new Dog();\n    pet.introduce();\n  }\n}',
  },
]
