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
  {
    slug: 'subqueries',
    title: 'Subqueries',
    summary: 'Nesting one query inside another',
    explanation: [
      'A subquery is a SELECT placed inside another query — in a WHERE clause to filter, or in a FROM clause as a temporary table.',
      'The inner query runs first, and its result is used by the outer query, e.g. WHERE score > (SELECT AVG(score) FROM students).',
    ],
    example: "CREATE TABLE students (name TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria', 95), ('Leo', 88), ('Maya', 72);\nSELECT name, score FROM students\nWHERE score > (SELECT AVG(score) FROM students);",
    starterCode: "CREATE TABLE students (name TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria', 95), ('Leo', 88), ('Maya', 72);\nSELECT name FROM students\nWHERE score = (SELECT MAX(score) FROM students);",
  },
  {
    slug: 'unions',
    title: 'Combining Results with UNION',
    summary: 'Stacking the rows from two SELECT statements',
    explanation: [
      'UNION combines the results of two SELECT statements into one result set, removing duplicate rows.',
      'UNION ALL does the same but keeps duplicates — both queries must select the same number of columns with compatible types.',
    ],
    example: "CREATE TABLE current_students (name TEXT);\nCREATE TABLE alumni (name TEXT);\nINSERT INTO current_students VALUES ('Aria'), ('Leo');\nINSERT INTO alumni VALUES ('Maya'), ('Aria');\nSELECT name FROM current_students\nUNION\nSELECT name FROM alumni;",
    starterCode: "CREATE TABLE current_students (name TEXT);\nCREATE TABLE alumni (name TEXT);\nINSERT INTO current_students VALUES ('Aria'), ('Leo');\nINSERT INTO alumni VALUES ('Maya'), ('Aria');\nSELECT name FROM current_students\nUNION ALL\nSELECT name FROM alumni;",
  },
  {
    slug: 'constraints-and-keys',
    title: 'Constraints & Keys',
    summary: 'Letting the database enforce your data rules',
    explanation: [
      'PRIMARY KEY uniquely identifies each row, NOT NULL requires a value, and UNIQUE forbids duplicates in a column.',
      'FOREIGN KEY links a column to a primary key in another table, keeping related data consistent.',
    ],
    example: "CREATE TABLE students (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE\n);\nCREATE TABLE scores (\n  student_id INTEGER,\n  score INTEGER,\n  FOREIGN KEY (student_id) REFERENCES students(id)\n);\nINSERT INTO students VALUES (1, 'Aria', 'aria@example.com');\nINSERT INTO scores VALUES (1, 95);\nSELECT students.name, scores.score\nFROM students\nINNER JOIN scores ON students.id = scores.student_id;",
    starterCode: "CREATE TABLE students (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE\n);\nINSERT INTO students VALUES (1, 'Aria', 'aria@example.com');\nINSERT INTO students VALUES (2, 'Leo', 'leo@example.com');\nSELECT * FROM students;",
  },
  {
    slug: 'views',
    title: 'Views',
    summary: 'Saving a query as a reusable virtual table',
    explanation: [
      'CREATE VIEW name AS SELECT ...; saves a query under a name you can reuse like a table.',
      'A view does not store data itself — every time you query it, the underlying SELECT runs again with fresh results.',
    ],
    example: "CREATE TABLE students (name TEXT, class TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria','A',95), ('Leo','A',88), ('Maya','B',72);\nCREATE VIEW top_students AS\n  SELECT name, class, score FROM students WHERE score >= 85;\nSELECT * FROM top_students;",
    starterCode: "CREATE TABLE students (name TEXT, class TEXT, score INTEGER);\nINSERT INTO students VALUES ('Aria','A',95), ('Leo','A',88), ('Maya','B',72);\nCREATE VIEW class_a AS\n  SELECT name, score FROM students WHERE class = 'A';\nSELECT * FROM class_a;",
  },
  {
    slug: 'transactions',
    title: 'Transactions',
    summary: 'Grouping changes so they all succeed or all fail',
    explanation: [
      'BEGIN TRANSACTION starts a group of changes that are applied together — COMMIT saves them, ROLLBACK undoes them all.',
      'Transactions keep your data consistent: if something goes wrong partway through, ROLLBACK returns the database to where it started.',
    ],
    example: "CREATE TABLE accounts (name TEXT, balance INTEGER);\nINSERT INTO accounts VALUES ('Aria', 100), ('Leo', 50);\nBEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 20 WHERE name = 'Aria';\nUPDATE accounts SET balance = balance + 20 WHERE name = 'Leo';\nCOMMIT;\nSELECT * FROM accounts;",
    starterCode: "CREATE TABLE accounts (name TEXT, balance INTEGER);\nINSERT INTO accounts VALUES ('Aria', 100), ('Leo', 50);\nBEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE name = 'Aria';\nROLLBACK;\nSELECT * FROM accounts;",
  },
  {
    slug: 'string-and-date-functions',
    title: 'String & Date Functions',
    summary: 'Transforming text and working with dates in queries',
    explanation: [
      'SQLite has built-in string functions like UPPER(), LOWER(), LENGTH(), and SUBSTR(text, start, length) for reshaping text.',
      "Date functions such as date('now') and strftime('%Y', column) let you compute and format dates inside a query.",
    ],
    example: "CREATE TABLE students (name TEXT, joined TEXT);\nINSERT INTO students VALUES ('Aria', '2024-09-01'), ('Leo', '2023-01-15');\nSELECT UPPER(name) AS shout_name,\n       LENGTH(name) AS name_length,\n       SUBSTR(name, 1, 3) AS short_name,\n       strftime('%Y', joined) AS join_year\nFROM students;",
    starterCode: "CREATE TABLE students (name TEXT, joined TEXT);\nINSERT INTO students VALUES ('Aria', '2024-09-01'), ('Leo', '2023-01-15');\nSELECT LOWER(name) AS lower_name, strftime('%Y', joined) AS join_year\nFROM students;",
  },
]
