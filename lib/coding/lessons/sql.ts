import type { CodingLesson } from '../languages'

export const sql: CodingLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to SQL',
    summary: 'Talking to databases with SELECT',
    explanation: [
      'SQL (Structured Query Language) is how you create, read, update, and delete data stored in relational databases.',
      'SELECT columns FROM table; retrieves data. SELECT * FROM table; retrieves every column.',
      'Statements end with a semicolon ;. This playground runs SQLite — try creating a table and querying it.',
    ],
    example: "CREATE TABLE students (name TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria', 95), ('Leo', 88);\nSELECT * FROM students;",
    starterCode: "CREATE TABLE students (name TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria', 95), ('Leo', 88);\nSELECT name FROM students;",
  },
  {
    slug: 'filtering',
    title: 'Filtering with WHERE',
    summary: 'Narrowing down results that match a condition',
    explanation: [
      'WHERE filters rows based on a condition: SELECT * FROM students WHERE score >= 90;.',
      'Combine conditions with AND / OR, and use comparison operators =, !=, >, <, >=, <=.',
    ],
    example: "CREATE TABLE students (name TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria', 95), ('Leo', 88), ('Maya', 72);\nSELECT * FROM students WHERE score >= 80;",
    starterCode: "CREATE TABLE students (name TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria', 95), ('Leo', 88), ('Maya', 72);\nSELECT name FROM students WHERE score > 75;",
  },
  {
    slug: 'sorting-and-limiting',
    title: 'Sorting & Limiting',
    summary: 'Ordering results and taking only what you need',
    explanation: [
      'ORDER BY column sorts results — add DESC for descending order, ASC (the default) for ascending.',
      'LIMIT n restricts the number of rows returned — handy for "top N" style queries.',
    ],
    example: "CREATE TABLE students (name TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria', 95), ('Leo', 88), ('Maya', 72);\nSELECT * FROM students ORDER BY score DESC LIMIT 2;",
    starterCode: "CREATE TABLE students (name TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria', 95), ('Leo', 88), ('Maya', 72);\nSELECT name FROM students ORDER BY score ASC;",
  },
  {
    slug: 'aggregates',
    title: 'Aggregate Functions',
    summary: 'Summarising data with COUNT, SUM, AVG, and GROUP BY',
    explanation: [
      'Aggregate functions compute a single value from many rows: COUNT(*), SUM(column), AVG(column), MIN(column), MAX(column).',
      'GROUP BY groups rows that share a value so you can aggregate within each group, e.g. average score per class.',
    ],
    example: "CREATE TABLE students (name TEXT, class TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria','A',95), ('Leo','A',88), ('Maya','B',72), ('Sam','B',81);\nSELECT class, AVG(score) AS avg_score FROM students GROUP BY class;",
    starterCode: "CREATE TABLE students (name TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria', 95), ('Leo', 88), ('Maya', 72);\nSELECT COUNT(*) AS total, AVG(score) AS average FROM students;",
  },
  {
    slug: 'updating-and-deleting',
    title: 'Updating & Deleting',
    summary: 'Changing and removing existing rows',
    explanation: [
      'UPDATE table SET column = value WHERE condition; changes matching rows — always include a WHERE clause, or every row changes!',
      'DELETE FROM table WHERE condition; removes matching rows.',
    ],
    example: "CREATE TABLE students (name TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria', 95), ('Leo', 60);\nUPDATE students SET score = 70 WHERE name = 'Leo';\nDELETE FROM students WHERE score < 65;\nSELECT * FROM students;",
    starterCode: "CREATE TABLE students (name TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria', 95), ('Leo', 60);\nUPDATE students SET score = score + 5 WHERE name = 'Leo';\nSELECT * FROM students;",
  },
  {
    slug: 'joins',
    title: 'Joining Tables',
    summary: 'Combining rows from related tables',
    explanation: [
      'Real data is often spread across tables. JOIN combines rows from two tables based on a related column.',
      'INNER JOIN table2 ON table1.col = table2.col returns only rows with matches in both tables.',
    ],
    example: "CREATE TABLE students (id INTEGER, name TEXT);\nCREATE TABLE scores (student_id INTEGER, subject TEXT, score INTEGER);\nINSERT INTO students VALUES (1, 'Aria'), (2, 'Leo');\nINSERT INTO scores VALUES (1, 'Math', 95), (2, 'Math', 88);\nSELECT students.name, scores.subject, scores.score\nFROM students\nINNER JOIN scores ON students.id = scores.student_id;",
    starterCode: "CREATE TABLE students (id INTEGER, name TEXT);\nCREATE TABLE scores (student_id INTEGER, score INTEGER);\nINSERT INTO students VALUES (1, 'Aria'), (2, 'Leo');\nINSERT INTO scores VALUES (1, 95), (2, 88);\nSELECT students.name, scores.score\nFROM students\nINNER JOIN scores ON students.id = scores.student_id;",
  },
]
