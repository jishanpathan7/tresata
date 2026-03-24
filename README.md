# Tresata — Task Management App

A mobile-first **TO-DO** app built with **React**, **TypeScript**, and **Vite**. It matches the provided Figma-style layout: blue header, search, collapsible status groups, task cards with avatars and badges, add/edit forms, and a floating **+** button.

## Features

- **Task list** grouped by **In Progress**, **Pending**, and **Completed** (collapsible sections).
- **Search** across title and description.
- **Add task** (title + description); new tasks default to **Pending**.
- **Edit task** (title, description, **status** dropdown).
- **Delete** with confirmation dialog.
- **Mark complete** via the circular avatar (toggles between completed and pending); completed titles use strikethrough.
- **localStorage** persistence (`tresata-tasks`).
- **Responsive** layout (centered column, max width ~480px; scales on larger screens).
- **Animations**: card enter, dropdown, dialog, section content; respects `prefers-reduced-motion`.

## How to run

**Requirements:** Node.js **20.19+** or **22.12+** (Vite 8).

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

```bash
npm run build    # production build
npm run preview  # preview production build
npm run lint     # ESLint
```

## Project structure

- `src/hooks/useTasks.ts` — task state + localStorage sync.
- `src/types/task.ts` — `Task`, `TaskStatus`.
- `src/pages/` — list, add, edit screens.
- `src/components/` — header, search, sections, cards, form, FAB, dialogs, etc.

## Design decisions

- **React Router** (`react-router-dom`) for `/`, `/add`, `/edit/:id`. Non-home screens use a **top-left back control** that always navigates to **`/`** (home), matching the mobile design.
- **`useTasks` in `App`** and spread into route components keeps a single task array without Redux/context for this size.
- **CSS files per feature** (no CSS-in-JS) for clarity and easy theming via `src/index.css` variables.
- **`<details>`** for collapsible sections for accessible, keyboard-friendly expand/collapse without extra JS state.

## Evaluation notes

- **Edge cases:** Empty title blocked on add/edit; unknown edit id redirects home; delete is confirmed.
- **Performance:** Filtering/grouping uses `useMemo`; updates are O(n) on the task list.
