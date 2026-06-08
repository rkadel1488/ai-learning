import type { CodingLesson } from '../languages'

export const php: CodingLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to PHP',
    summary: 'PHP tags, echo, and your first output',
    explanation: [
      'PHP is a server-side scripting language that powers a huge share of the web (including WordPress). Code lives between <?php and ?> tags.',
      'echo "..."; prints output. Strings can use single or double quotes — double quotes allow variable interpolation.',
      'Each statement ends with a semicolon ;. Variables start with a dollar sign, like $name.',
    ],
    example: '<?php\necho "Hello, world!\\n";\necho 2 + 3 * 4;\necho "\\n";\n?>',
    starterCode: '<?php\necho "Hello, world!\\n";\necho 7 * 6;\necho "\\n";\n?>',
  },
  {
    slug: 'variables',
    title: 'Variables & Types',
    summary: 'Storing and combining values',
    explanation: [
      'Create a variable with a $ prefix: $name = "Aria"; $age = 12;. PHP figures out the type automatically.',
      'Inside double-quoted strings, variables are interpolated directly: "echo $name is $age";. Use . to concatenate strings.',
    ],
    example: '<?php\n$name = "Aria";\n$age = 12;\necho "$name is $age years old\\n";\necho gettype($age) . "\\n";\n?>',
    starterCode: '<?php\n$city = "Pokhara";\n$temperature = 24;\necho "$city is $temperature degrees today\\n";\n?>',
  },
  {
    slug: 'conditionals',
    title: 'Conditionals',
    summary: 'Branching with if / elseif / else',
    explanation: [
      'if checks a condition; elseif checks another; else runs otherwise. Blocks are wrapped in { }.',
      'Comparison operators ==, !=, >, < produce true or false, which conditionals use to decide what to run.',
    ],
    example: '<?php\n$score = 82;\nif ($score >= 90) {\n  echo "Grade: A\\n";\n} elseif ($score >= 75) {\n  echo "Grade: B\\n";\n} else {\n  echo "Keep practising!\\n";\n}\n?>',
    starterCode: '<?php\n$temperature = 30;\nif ($temperature > 25) {\n  echo "It is warm\\n";\n} else {\n  echo "It is cool\\n";\n}\n?>',
  },
  {
    slug: 'loops',
    title: 'Loops',
    summary: 'Repeating actions with for and while',
    explanation: [
      'A for loop has three parts: for ($i = 1; $i <= 5; $i++) { ... } — start, condition, and update.',
      'A while loop repeats as long as its condition stays true. foreach loops walk through arrays directly.',
    ],
    example: '<?php\nfor ($i = 1; $i <= 5; $i++) {\n  echo "Step $i\\n";\n}\n$fruits = ["apple", "banana", "mango"];\nforeach ($fruits as $fruit) {\n  echo strtoupper($fruit) . "\\n";\n}\n?>',
    starterCode: '<?php\nfor ($i = 1; $i <= 3; $i++) {\n  echo "Count: $i\\n";\n}\n?>',
  },
  {
    slug: 'functions',
    title: 'Functions',
    summary: 'Packaging reusable logic with function',
    explanation: [
      'Define a function with function name($parameters) { ... }. Use return to send a value back to the caller.',
      'Functions help you avoid repeating yourself and make programs easier to read.',
    ],
    example: '<?php\nfunction double($n) {\n  return $n * 2;\n}\nfunction greet($name) {\n  return "Hello, $name!";\n}\necho double(21) . "\\n";\necho greet("World") . "\\n";\n?>',
    starterCode: '<?php\nfunction square($n) {\n  return $n * $n;\n}\necho square(6) . "\\n";\n?>',
  },
  {
    slug: 'arrays',
    title: 'Arrays',
    summary: 'Working with ordered and associative collections',
    explanation: [
      'Indexed arrays hold ordered values: $numbers = [1, 2, 3];. Access with $numbers[0], and count() gives the length.',
      'Associative arrays hold key-value pairs: $student = ["name" => "Aria", "grade" => 7]; — access with $student["name"].',
    ],
    example: '<?php\n$scores = [70, 85, 92, 60];\n$total = 0;\nforeach ($scores as $s) {\n  $total += $s;\n}\necho "Total: $total\\n";\necho "Average: " . intdiv($total, count($scores)) . "\\n";\n\n$student = ["name" => "Aria", "grade" => 7];\necho "{$student[\'name\']} is in grade {$student[\'grade\']}\\n";\n?>',
    starterCode: '<?php\n$scores = [70, 85, 92, 60];\n$passing = array_filter($scores, fn($s) => $s >= 70);\nprint_r(array_values($passing));\n?>',
  },
  {
    slug: 'string-functions',
    title: 'String Functions',
    summary: 'Measuring, transforming, and formatting text',
    explanation: [
      'strlen($s) counts characters, strtoupper / strtolower change case, and str_replace($search, $replace, $s) swaps text.',
      'trim($s) removes surrounding whitespace, and sprintf("%s is %d", $name, $age) builds formatted strings from placeholders.',
    ],
    example: '<?php\n$name = "  Aria  ";\necho strlen($name) . "\\n";\necho strtoupper(trim($name)) . "\\n";\necho str_replace("Aria", "Maya", trim($name)) . "\\n";\necho sprintf("%s is %d years old\\n", trim($name), 12);\n?>',
    starterCode: '<?php\n$word = "hello";\necho strtoupper($word) . "\\n";\necho strlen($word) . "\\n";\necho str_replace("l", "L", $word) . "\\n";\n?>',
  },
  {
    slug: 'associative-arrays-in-depth',
    title: 'Associative Arrays In Depth',
    summary: 'Looping, sorting, mapping, and reducing key-value data',
    explanation: [
      'foreach ($array as $key => $value) walks through an associative array giving you both the key and the value.',
      'ksort() sorts by key and asort() sorts by value while keeping keys attached; array_map() transforms every value and array_reduce() folds them into one result.',
    ],
    example: '<?php\n$scores = ["Leo" => 88, "Aria" => 95, "Maya" => 72];\nforeach ($scores as $name => $score) {\n  echo "$name scored $score\\n";\n}\nksort($scores);\necho "Sorted by name: " . implode(", ", array_keys($scores)) . "\\n";\n$bonused = array_map(fn($s) => $s + 5, $scores);\necho "With bonus: " . implode(", ", $bonused) . "\\n";\n$total = array_reduce($scores, fn($carry, $s) => $carry + $s, 0);\necho "Total: $total\\n";\n?>',
    starterCode: '<?php\n$prices = ["apple" => 2, "banana" => 1, "mango" => 3];\nasort($prices);\nforeach ($prices as $fruit => $price) {\n  echo "$fruit costs $price\\n";\n}\n?>',
  },
  {
    slug: 'oop-basics',
    title: 'OOP Basics',
    summary: 'Classes, constructors, properties, and methods',
    explanation: [
      'A class is a blueprint: class Student { public $name; } groups data and behaviour together.',
      '__construct($...) runs automatically when you create an object with new, and methods are functions defined inside the class that act on its properties.',
    ],
    example: '<?php\nclass Student {\n  public $name;\n  public $score;\n\n  public function __construct($name, $score) {\n    $this->name = $name;\n    $this->score = $score;\n  }\n\n  public function describe() {\n    return "$this->name scored $this->score";\n  }\n}\n\n$aria = new Student("Aria", 95);\n$leo = new Student("Leo", 88);\necho $aria->describe() . "\\n";\necho $leo->describe() . "\\n";\n?>',
    starterCode: '<?php\nclass Counter {\n  public $count;\n\n  public function __construct() {\n    $this->count = 0;\n  }\n\n  public function increment() {\n    $this->count += 1;\n  }\n}\n\n$c = new Counter();\n$c->increment();\n$c->increment();\necho "Count: $c->count\\n";\n?>',
  },
  {
    slug: 'superglobals-and-forms',
    title: 'Superglobals & Forms',
    summary: 'How PHP reads incoming request data like $_GET and $_POST',
    explanation: [
      'In a real web app, $_GET and $_POST hold form/query data sent by the browser, and $_SERVER holds info about the request — PHP fills these in automatically for each HTTP request.',
      "This sandbox has no real HTTP request, so we simulate one with a plain associative array and access it the same way you'd access $_POST.",
      'Always validate incoming data — check that a key exists with isset() before trusting its value.',
    ],
    example: '<?php\n// Simulating what $_POST might contain after a form submission\n$_POST = ["username" => "aria123", "age" => "12"];\n\nif (isset($_POST["username"]) && trim($_POST["username"]) !== "") {\n  echo "Welcome, " . $_POST["username"] . "!\\n";\n} else {\n  echo "Username is required\\n";\n}\n\n$age = isset($_POST["age"]) ? (int) $_POST["age"] : 0;\necho "Age next year: " . ($age + 1) . "\\n";\n?>',
    starterCode: '<?php\n// Simulating $_GET data from a URL like page.php?name=Leo\n$_GET = ["name" => "Leo"];\n\n$name = isset($_GET["name"]) ? $_GET["name"] : "Guest";\necho "Hello, $name!\\n";\n?>',
  },
  {
    slug: 'error-handling',
    title: 'Error Handling',
    summary: 'Catching problems gracefully with try/catch/finally',
    explanation: [
      'Wrap risky code in a try block; if it throw new Exception("message"), a matching catch (Exception $e) block handles it instead of crashing the script.',
      'finally runs whether or not an exception was thrown — useful for cleanup that must always happen.',
    ],
    example: '<?php\nfunction divide($a, $b) {\n  if ($b === 0) {\n    throw new Exception("Cannot divide by zero");\n  }\n  return $a / $b;\n}\n\ntry {\n  echo divide(10, 2) . "\\n";\n  echo divide(10, 0) . "\\n";\n} catch (Exception $e) {\n  echo "Error: " . $e->getMessage() . "\\n";\n} finally {\n  echo "Done trying to divide\\n";\n}\n?>',
    starterCode: '<?php\nfunction checkAge($age) {\n  if ($age < 0) {\n    throw new Exception("Age cannot be negative");\n  }\n  return "Age is $age";\n}\n\ntry {\n  echo checkAge(12) . "\\n";\n  echo checkAge(-5) . "\\n";\n} catch (Exception $e) {\n  echo "Error: " . $e->getMessage() . "\\n";\n}\n?>',
  },
  {
    slug: 'regular-expressions',
    title: 'Regular Expressions',
    summary: 'Matching and replacing text patterns with preg_*',
    explanation: [
      'preg_match($pattern, $subject, $matches) tests whether a string matches a pattern (written between slashes, like \'/[0-9]+/\') and captures the result.',
      'preg_replace($pattern, $replacement, $subject) finds every match of a pattern and swaps it for replacement text.',
    ],
    example: '<?php\n$text = "Contact: aria@example.com or call 98765";\n\nif (preg_match(\'/[\\w.]+@[\\w.]+/\', $text, $matches)) {\n  echo "Found email: " . $matches[0] . "\\n";\n}\n\n$digitsOnly = preg_replace(\'/[^0-9]/\', \'\', $text);\necho "Digits only: $digitsOnly\\n";\n\n$masked = preg_replace(\'/[0-9]/\', \'#\', $text);\necho "Masked: $masked\\n";\n?>',
    starterCode: '<?php\n$word = "Hello123World456";\n\nif (preg_match(\'/[0-9]+/\', $word, $matches)) {\n  echo "First number found: " . $matches[0] . "\\n";\n}\n\n$lettersOnly = preg_replace(\'/[0-9]/\', \'\', $word);\necho "Letters only: $lettersOnly\\n";\n?>',
  },
]
