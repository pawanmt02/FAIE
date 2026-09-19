# faie-todo-app

A functional React + Vite To-Do application built against the FAIE 100% blueprint. It is a focused, responsive task workspace rather than a static dashboard: every core task workflow is implemented and persisted in the browser.

## Requirements covered

- Create tasks with a semantic form and Enter-key submission.
- Read tasks in a semantic `<ul>` and `<li>` structure.
- Update tasks by toggling completion or editing text inline.
- Delete individual tasks and clear all completed tasks.
- Filter the task list by All, Active, and Completed.
- Prevent empty submissions with trimmed input validation.
- Persist tasks and theme preference with the `useLocalStorage` hook.
- Render a clear empty state when a filter has no results.
- Provide labelled icon-only controls, keyboard focus states, and WCAG-conscious contrast.
- Animate task additions and removals with Framer Motion.
- Responsive mobile-first layout with light and dark themes.

## Architecture

```text
src/main.jsx
  -> TodoApp.jsx (single source of truth and CRUD handlers)
      -> components/TodoForm.jsx
      -> components/TodoList.jsx
          -> components/TodoItem.jsx
      -> hooks/useLocalStorage.js
```

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```bash
npm run build
npm run preview
```

The project is ready to deploy to Vercel as a Vite static site. Use the default build command `npm run build` and output directory `dist`.
