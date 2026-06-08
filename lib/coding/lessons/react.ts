import type { CodingLesson } from '../languages'

export const react: CodingLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to React',
    summary: 'Building UIs out of components with JSX',
    explanation: [
      'React is a library for building user interfaces out of small, reusable pieces called components. A component is just a function that returns what should appear on screen.',
      'JSX is a syntax that lets you write HTML-like markup inside JavaScript, like <h1>Hello</h1> — it gets transformed into regular function calls behind the scenes.',
      'ReactDOM.createRoot(container).render(<App />) takes a component and draws it onto the page.',
    ],
    example: "function App() {\n  return (\n    <div>\n      <h1>Hello, React!</h1>\n      <p>This is your first component.</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
    starterCode: "function App() {\n  return <h1>Welcome to React</h1>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
  },
  {
    slug: 'jsx-basics',
    title: 'JSX Basics',
    summary: 'Mixing expressions, attributes, and tags in your markup',
    explanation: [
      'Curly braces {} let you drop any JavaScript expression straight into your JSX, like {2 + 2} or {user.name}.',
      'JSX attributes look like HTML but use camelCase and className instead of class, since class is a reserved word in JavaScript.',
      'Tags that have no children can self-close with a slash, like <img /> or <br />.',
    ],
    example: "function App() {\n  const name = 'Aria';\n  const score = 92;\n\n  return (\n    <div className=\"card\">\n      <h2>Hello, {name}!</h2>\n      <p>Your score is {score} out of 100.</p>\n      <p>Doubled: {score * 2}</p>\n      <hr />\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
    starterCode: "function App() {\n  const language = 'React';\n\n  return (\n    <div className=\"box\">\n      <h2>Learning {language}</h2>\n      <p>2 + 2 = {2 + 2}</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
  },
  {
    slug: 'props',
    title: 'Props',
    summary: 'Passing data into components',
    explanation: [
      'Props are how a parent component passes data down to a child component, similar to arguments passed into a function.',
      'A component receives its props as an object: function Greeting(props) { return <p>{props.name}</p> }. You can also destructure them directly: function Greeting({ name }) { ... }.',
      'Props make components reusable — the same component can render differently depending on what data it receives.',
    ],
    example: "function Greeting({ name, role }) {\n  return (\n    <li>\n      {name} — <strong>{role}</strong>\n    </li>\n  );\n}\n\nfunction App() {\n  return (\n    <ul>\n      <Greeting name=\"Aria\" role=\"Captain\" />\n      <Greeting name=\"Kiran\" role=\"Coder\" />\n      <Greeting name=\"Maya\" role=\"Designer\" />\n    </ul>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
    starterCode: "function Badge({ label, color }) {\n  return <span className={color}>{label}</span>;\n}\n\nfunction App() {\n  return (\n    <div>\n      <Badge label=\"New\" color=\"green\" />\n      <Badge label=\"Hot\" color=\"red\" />\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
  },
  {
    slug: 'state-and-hooks',
    title: 'State & Hooks',
    summary: 'Letting components remember and update values with useState',
    explanation: [
      'State is data a component remembers between renders. The useState hook gives you a value and a function to update it: const [count, setCount] = React.useState(0).',
      'Calling the setter function (like setCount(count + 1)) updates the state and tells React to re-render the component with the new value.',
      'Because React is loaded globally here, hooks are accessed as React.useState, React.useEffect, and so on.',
    ],
    example: "function Counter() {\n  const [count, setCount] = React.useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Add one</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Counter />);",
    starterCode: "function Counter() {\n  const [count, setCount] = React.useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Counter />);",
  },
  {
    slug: 'event-handling',
    title: 'Event Handling',
    summary: 'Responding to clicks and other user actions',
    explanation: [
      'In JSX, you attach event handlers with camelCase props like onClick, onChange, or onSubmit, and pass them a function to run.',
      'Event handlers are often used together with useState to update what the component remembers in response to what the user does.',
      'Writing onClick={() => doSomething()} creates a function that only runs when the event actually happens, not while rendering.',
    ],
    example: "function LikeButton() {\n  const [likes, setLikes] = React.useState(0);\n  const [liked, setLiked] = React.useState(false);\n\n  function handleClick() {\n    setLikes(liked ? likes - 1 : likes + 1);\n    setLiked(!liked);\n  }\n\n  return (\n    <div>\n      <button onClick={handleClick}>{liked ? 'Liked!' : 'Like'}</button>\n      <p>{likes} people like this</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<LikeButton />);",
    starterCode: "function ColorPicker() {\n  const [color, setColor] = React.useState('gray');\n\n  return (\n    <div>\n      <p>Selected color: {color}</p>\n      <button onClick={() => setColor('red')}>Red</button>\n      <button onClick={() => setColor('blue')}>Blue</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<ColorPicker />);",
  },
  {
    slug: 'conditional-rendering',
    title: 'Conditional Rendering',
    summary: 'Showing different JSX depending on a condition',
    explanation: [
      'You can use a regular JavaScript if statement before the return to decide what JSX to send back.',
      'Inside JSX, the && operator shows something only when a condition is true: {isLoggedIn && <p>Welcome back!</p>}.',
      'The ternary operator condition ? a : b lets you pick between two pieces of JSX in a single expression.',
    ],
    example: "function Status({ isOnline, messages }) {\n  return (\n    <div>\n      <p>Status: {isOnline ? 'Online 🟢' : 'Offline ⚪'}</p>\n      {messages > 0 && <p>You have {messages} new messages</p>}\n      {messages === 0 && <p>No new messages</p>}\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <div>\n      <Status isOnline={true} messages={3} />\n      <Status isOnline={false} messages={0} />\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
    starterCode: "function Greeting({ loggedIn }) {\n  return (\n    <div>\n      {loggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}\n      {loggedIn && <button>Log out</button>}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Greeting loggedIn={true} />);",
  },
  {
    slug: 'lists-and-keys',
    title: 'Lists & Keys',
    summary: 'Rendering arrays of data with .map()',
    explanation: [
      'To render a list of items, use .map() to turn an array of data into an array of JSX elements.',
      'Each item in a rendered list needs a unique key prop, like key={item.id} — this helps React keep track of which item is which when the list changes.',
      'Keys should come from stable data (like an id), not from the array index, whenever possible.',
    ],
    example: "function TodoList() {\n  const todos = [\n    { id: 1, text: 'Learn JSX' },\n    { id: 2, text: 'Build a component' },\n    { id: 3, text: 'Use props and state' },\n  ];\n\n  return (\n    <ul>\n      {todos.map(todo => (\n        <li key={todo.id}>{todo.text}</li>\n      ))}\n    </ul>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<TodoList />);",
    starterCode: "function FruitList() {\n  const fruits = ['Apple', 'Banana', 'Mango'];\n\n  return (\n    <ul>\n      {fruits.map((fruit, index) => (\n        <li key={index}>{fruit}</li>\n      ))}\n    </ul>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<FruitList />);",
  },
  {
    slug: 'effects',
    title: 'Effects',
    summary: 'Running code in response to rendering with useEffect',
    explanation: [
      'The useEffect hook lets a component run code "on the side" — after it renders — such as logging, fetching data, or setting up a timer.',
      'React.useEffect(() => { ... }, []) with an empty array runs the effect only once, right after the component first appears.',
      'If you list values in the second argument, like [count], the effect re-runs whenever those values change.',
    ],
    example: "function Welcome() {\n  const [seconds, setSeconds] = React.useState(0);\n\n  React.useEffect(() => {\n    console.log('Welcome component mounted');\n    const timer = setInterval(() => {\n      setSeconds(s => s + 1);\n    }, 1000);\n    return () => clearInterval(timer);\n  }, []);\n\n  React.useEffect(() => {\n    console.log(`Seconds elapsed: ${seconds}`);\n  }, [seconds]);\n\n  return <p>Seconds since mount: {seconds}</p>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Welcome />);",
    starterCode: "function Logger() {\n  const [count, setCount] = React.useState(0);\n\n  React.useEffect(() => {\n    console.log('Logger mounted');\n  }, []);\n\n  React.useEffect(() => {\n    console.log(`Count is now ${count}`);\n  }, [count]);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increase</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Logger />);",
  },
]
