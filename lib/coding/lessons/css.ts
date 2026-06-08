import type { CodingLesson } from '../languages'

export const css: CodingLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to CSS',
    summary: 'How CSS styles HTML elements',
    explanation: [
      'CSS (Cascading Style Sheets) controls how HTML looks — colours, fonts, spacing, layout, and more.',
      'A CSS rule has a selector (which elements to style) and a declaration block in {} with property: value; pairs.',
      'In this playground your CSS is applied to a small HTML preview so you can see the effect immediately.',
    ],
    example: 'p {\n  color: violet;\n  font-size: 20px;\n}\nh1 {\n  text-align: center;\n}',
    starterCode: 'h1 {\n  color: teal;\n}\np {\n  font-size: 18px;\n}',
  },
  {
    slug: 'selectors',
    title: 'Selectors',
    summary: 'Targeting exactly the elements you want to style',
    explanation: [
      'Element selectors (p, h1) target every element of that type. Class selectors (.card) target elements with class="card". ID selectors (#header) target the single element with that id.',
      'You can combine selectors — e.g. .card p targets paragraphs inside elements with class "card".',
    ],
    example: '.highlight {\n  background: yellow;\n}\n#title {\n  font-weight: bold;\n}\nul li {\n  color: slategray;\n}',
    starterCode: '.highlight {\n  background: lightblue;\n}\n#title {\n  color: crimson;\n}',
  },
  {
    slug: 'box-model',
    title: 'The Box Model',
    summary: 'Margin, border, padding, and content',
    explanation: [
      'Every HTML element is a rectangular box made of four layers, from the inside out: content, padding, border, and margin.',
      'padding adds space inside the border; margin adds space outside it; border draws a line around the padding.',
      'Understanding the box model is the key to controlling spacing and layout.',
    ],
    example: 'div {\n  width: 200px;\n  padding: 16px;\n  border: 2px solid teal;\n  margin: 20px;\n  background: #eef;\n}',
    starterCode: '.box {\n  padding: 12px;\n  border: 3px dashed orange;\n  margin: 16px;\n}',
  },
  {
    slug: 'flexbox',
    title: 'Flexbox Layout',
    summary: 'Arranging items in a row or column with ease',
    explanation: [
      'Setting display: flex on a container turns its children into a flexible row (by default).',
      'justify-content controls horizontal alignment (e.g. center, space-between); align-items controls vertical alignment.',
      'Flexbox is the modern way to build navigation bars, card layouts, and centred content.',
    ],
    example: '.row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}\n.row div {\n  background: #c4b5fd;\n  padding: 10px;\n  border-radius: 6px;\n}',
    starterCode: '.row {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n}',
  },
  {
    slug: 'colors-and-units',
    title: 'Colours & Units',
    summary: 'Naming colours and sizing things precisely',
    explanation: [
      'Colours can be named (red), hex (#ff6600), or functions like rgb(255,102,0) and hsl(24,100%,50%).',
      'Sizes can be absolute (px) or relative (%, em, rem, vw, vh) — relative units help your design adapt to different screens.',
    ],
    example: 'h1 {\n  color: #7c3aed;\n  font-size: 2rem;\n}\n.banner {\n  background: linear-gradient(90deg, #8b5cf6, #4f46e5);\n  padding: 2vh 4vw;\n}',
    starterCode: 'h1 {\n  color: rgb(124, 58, 237);\n}\n.banner {\n  background: #e0e7ff;\n  padding: 1rem;\n}',
  },
  {
    slug: 'transitions',
    title: 'Transitions & Hover Effects',
    summary: 'Adding smooth, interactive animations',
    explanation: [
      'The transition property smoothly animates a CSS change over time, e.g. transition: all 0.3s ease.',
      'Combine it with the :hover pseudo-class to make elements respond when the user moves their mouse over them.',
    ],
    example: 'button {\n  background: #4f46e5;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 8px;\n  transition: transform 0.2s ease, background 0.2s ease;\n}\nbutton:hover {\n  background: #7c3aed;\n  transform: scale(1.08);\n}',
    starterCode: 'button {\n  background: teal;\n  color: white;\n  padding: 10px 18px;\n  border: none;\n  border-radius: 6px;\n  transition: background 0.2s;\n}\nbutton:hover {\n  background: darkcyan;\n}',
  },
]
