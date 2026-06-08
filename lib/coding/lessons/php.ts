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
]
