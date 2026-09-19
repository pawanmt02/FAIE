# faie-demo-project

A responsive FAIE optimization baseline for frontend application submissions. The project turns the PDR into a focused quality operations dashboard with visible quality signals, interactive checks, and persistent preferences.

## Features

- Responsive dashboard from 320px upward with mobile navigation.
- Quality metric cards for overall quality, accessibility, performance, and coverage.
- Searchable quality checks with passed/review toggles.
- User story coverage and recent activity views.
- Theme preference persisted in `localStorage`.
- Semantic landmarks, labelled controls, keyboard-friendly buttons, visible focus states, and empty-state handling.
- Vite production build with no runtime network dependency for application data.

## Architecture

```text
src/main.jsx
  -> App.jsx
      -> Navigation + project context
      -> Metric cards
      -> Quality checks state + filtering
      -> Score and coverage panels
      -> Activity panel
  -> styles.css (responsive design tokens and layout)
```

UI rendering stays in `App.jsx`; quality check filtering and status changes are local state; the theme preference is the only persisted user setting. This keeps the baseline intentionally small while leaving room to extract domain components as the product grows.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
npm run preview
```
