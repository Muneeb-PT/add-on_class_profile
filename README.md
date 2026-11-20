# Aesthetix Edu-Tech — 5-Day Front-End Web Development Training

A beginner front-end learning repository for the **Aesthetix Edu-Tech 5-Day Intensive Training Program on Front-End Web Development**, conducted for students of **KMEA Engineering College**.

This repository brings together five days of beginner-friendly practical work using plain HTML, CSS and JavaScript. The final set includes a personal portfolio, resume exercise, calculator, client-side form validation and an interactive to-do mini project.

## Programme overview

| Detail | Information |
|---|---|
| Training provider | Aesthetix Edu-Tech |
| Institution | KMEA Engineering College, Ernakulam |
| Duration | 5 days |
| Stated total training hours | 30 hours |
| Core technologies | HTML, CSS and JavaScript |

## Five-day practical work

### Day 1 — Introduction to the Web & HTML fundamentals
**Concepts:** client–server basics, HTML document structure, headings, paragraphs, links, images, lists, tables, forms, input elements and semantic HTML.

**Implemented:** personal profile portfolio (`index.html`) and resume-style page (`resume.html`), including semantic sections, navigation, links, images, structured lists and an accessible HTML table.

### Day 2 — CSS fundamentals & styling
**Concepts:** CSS selectors, properties, colours, fonts, text styling, box model, borders and backgrounds.

**Implemented:** shared external stylesheet (`styles.css`), consistent typography, colour system, spacing, buttons, cards and reusable page components.

### Day 3 — Layout & responsive design
**Concepts:** Flexbox, CSS Grid, positioning, media queries and responsive design.

**Implemented:** responsive card grids, two-column sections, sticky header, mobile breakpoints and collapsible navigation across the pages.

### Day 4 — JavaScript basics & DOM
**Concepts:** variables, operators, conditions, functions, DOM updates and event handling.

**Implemented:**
- Calculator with arithmetic precedence, brackets, percentage, clear, backspace and keyboard support.
- Arithmetic expression parser that avoids `eval()` and `Function()`.
- Client-side form validation for name, email and message, with accessible error feedback.

### Day 5 — Mini project & deployment
**Concepts:** integrating HTML, CSS and JavaScript, debugging, basic UI/UX and an introduction to hosting with GitHub Pages or Netlify.

**Implemented:** responsive portfolio and an interactive to-do list with add, complete, delete and clear-completed actions. Tasks are stored in browser `localStorage` when storage is available.

## Project structure

```text
add-on_class_profile/
├── index.html        # Responsive personal portfolio
├── resume.html       # Resume page, HTML table and styled cards
├── calculator.html   # Calculator and form validation
├── todo.html         # Interactive to-do list mini project
├── styles.css        # Shared responsive stylesheet
├── script.js         # Navigation, calculator, validation and to-do logic
├── my.jpeg           # Profile photograph
└── README.md
```

## Run locally

1. Clone or download this repository.
2. Open the folder in VS Code or another editor.
3. Open `index.html` in a modern browser.
4. Use the navigation to visit the resume, calculator and to-do pages.

No build tools, frameworks or package installation are required.

## Live website

[Open the portfolio on GitHub Pages](https://muneeb-pt.github.io/add-on_class_profile/)

GitHub Pages may take a short time to publish new commits. Refresh the live page after deployment completes.

## Manual testing checklist

- Open every HTML page and check all navigation links.
- Resize the browser to mobile width; test the Menu button and press Escape to close it.
- On the calculator page, try `12 + 8`, `(4 + 6) * 2`, clear, backspace and division by zero.
- Use the keyboard for calculator input; Enter calculates, Backspace deletes and Escape clears.
- Submit the form empty, then test valid name, email and message values.
- On the to-do page, add a task, mark it complete, delete a task and clear completed tasks.
- Refresh the to-do page to check whether tasks persist in browser storage.

## Learning note

This is a beginner learning repository, not a production application. The code demonstrates practical tasks mapped to the supplied five-day programme; it should not be read as proof that every topic was taught or assessed in a classroom session. Use the examples to practise, modify the code and understand how each part works.
