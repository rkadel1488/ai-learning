import type { CodingLesson } from '../languages'

export const html: CodingLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to HTML',
    summary: 'What HTML is and how a page is structured',
    explanation: [
      'HTML (HyperText Markup Language) is the skeleton of every web page. It uses "tags" — words wrapped in angle brackets like <p> — to describe the different parts of a document: headings, paragraphs, links, images, and more.',
      'Most tags come in pairs: an opening tag <p> and a closing tag </p>, with content in between. The browser reads these tags and renders them as a structured page.',
      'Try editing the code on the right and press Run to see your page update instantly.',
    ],
    example: '<h1>Hello, world!</h1>\n<p>This is a paragraph of text.</p>',
    starterCode: '<h1>My First Heading</h1>\n<p>My first paragraph.</p>',
  },
  {
    slug: 'elements-and-attributes',
    title: 'Elements & Attributes',
    summary: 'Adding extra information to tags with attributes',
    explanation: [
      'An HTML element is the opening tag, its content, and its closing tag together — e.g. <a href="...">link text</a> is one element.',
      'Attributes live inside the opening tag and give extra information: href tells a link where to go, src tells an image where to load from, and alt provides text for screen readers.',
      'Attributes always appear as name="value" pairs, separated by spaces.',
    ],
    example: '<a href="https://example.com">Visit Example</a>\n<img src="https://placekitten.com/200/120" alt="A cute kitten">',
    starterCode: '<a href="https://example.com">Click me</a>\n<img src="https://placekitten.com/150/100" alt="kitten">',
  },
  {
    slug: 'lists',
    title: 'Lists',
    summary: 'Grouping items with ordered and unordered lists',
    explanation: [
      'Use <ul> for an unordered (bulleted) list and <ol> for an ordered (numbered) list. Each item inside goes in its own <li> (list item) tag.',
      'Lists are everywhere on the web — navigation menus, recipes, to-do apps — anywhere you need to group related items.',
    ],
    example: '<ul>\n  <li>Tea</li>\n  <li>Coffee</li>\n</ul>\n<ol>\n  <li>Wake up</li>\n  <li>Code</li>\n</ol>',
    starterCode: '<h2>My favourite languages</h2>\n<ul>\n  <li>Python</li>\n  <li>JavaScript</li>\n</ul>',
  },
  {
    slug: 'tables',
    title: 'Tables',
    summary: 'Displaying tabular data with rows and columns',
    explanation: [
      'A table is built with <table>, rows with <tr> (table row), and cells with <td> (table data) or <th> (table header).',
      'Tables are great for structured data — schedules, price lists, comparisons — but should not be used just for page layout.',
    ],
    example: '<table border="1">\n  <tr><th>Name</th><th>Score</th></tr>\n  <tr><td>Aria</td><td>95</td></tr>\n  <tr><td>Leo</td><td>88</td></tr>\n</table>',
    starterCode: '<table border="1">\n  <tr><th>Day</th><th>Topic</th></tr>\n  <tr><td>Mon</td><td>HTML</td></tr>\n</table>',
  },
  {
    slug: 'forms',
    title: 'Forms & Inputs',
    summary: 'Collecting input from users',
    explanation: [
      'Forms let users enter information. The <form> element wraps inputs like <input>, <textarea>, and <button>.',
      'The type attribute on <input> changes its behaviour — type="text" for plain text, type="email" for emails, type="checkbox" for a tickbox, and so on.',
      'Every input should have a matching <label> so users (and screen readers) know what it is for.',
    ],
    example: '<form>\n  <label>Name: <input type="text" name="name"></label><br>\n  <label>I agree <input type="checkbox"></label><br>\n  <button type="button" onclick="alert(\'Submitted!\')">Submit</button>\n</form>',
    starterCode: '<form>\n  <label>Your name: <input type="text"></label><br>\n  <button type="button" onclick="alert(\'Hi!\')">Say hi</button>\n</form>',
  },
  {
    slug: 'semantic-html',
    title: 'Semantic HTML',
    summary: 'Writing HTML that describes meaning, not just looks',
    explanation: [
      'Semantic tags describe the role of their content: <header>, <nav>, <main>, <article>, <section>, and <footer> instead of generic <div> soup.',
      'Semantic markup helps browsers, search engines, and assistive technology understand your page — and makes your code far easier to read.',
    ],
    example: '<header><h1>My Site</h1></header>\n<nav><a href="#">Home</a> | <a href="#">About</a></nav>\n<main>\n  <article>\n    <h2>My First Post</h2>\n    <p>Semantic HTML rocks!</p>\n  </article>\n</main>\n<footer><p>&copy; 2026 My Site</p></footer>',
    starterCode: '<header><h1>My Page</h1></header>\n<main>\n  <article>\n    <h2>Hello</h2>\n    <p>This is semantic HTML.</p>\n  </article>\n</main>',
  },
]
