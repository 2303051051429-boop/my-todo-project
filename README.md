<div align="center">

# ✅ Nexus Tasks

### A sleek, minimal, and powerful Todo App built with React, Vite & Tailwind CSS

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>

---

## 🌟 About the Project

**Nexus Tasks** is a beautifully designed, dark-mode task manager that runs entirely in the browser. Built with modern React patterns, it features smooth animations, persistent storage, priority labels, and a clean developer-inspired UI.

**Key Highlights:**
- 🖤 Stunning dark minimal interface with neon-yellow accents
- ⚡ Blazing fast with Vite's Hot Module Replacement (HMR)
- 💾 Tasks saved to `localStorage` — data persists on refresh
- 🎯 Priority levels: P1 (Critical) · P2 (Normal) · P3 (Low)
- ✨ Smooth enter/exit animations powered by Framer Motion
- ⌨️ Keyboard shortcut: `Ctrl + K` to focus the input instantly
- 📊 Live progress bar showing task completion percentage

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://reactjs.org/) | UI components & state management |
| [Vite 6](https://vitejs.dev/) | Dev server & build tool |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |
| [Lucide React](https://lucide.dev/) | Icons |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/2303051051429-boop/my-todo-project.git

# 2. Navigate into the project
cd my-todo-project

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open your browser at **http://localhost:3000** 🚀

---

## 📁 Project Structure

```
src/
├── components/
│   ├── TodoApp.tsx      # Main application logic & UI
│   ├── TaskItem.tsx     # Individual task row component
│   └── Effects.tsx      # Background & click ripple effects
├── types.ts             # TypeScript type definitions
├── App.tsx              # Root app component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

---

## 🎮 How to Use

1. **Add a task** — Type in the input field and press `Enter`
2. **Set priority** — Click the `P2` badge in the input to cycle through P1 → P2 → P3
3. **Complete a task** — Click on a task to toggle it done ✅
4. **Delete a task** — Hover a task and click the delete button
5. **Clear done tasks** — Click **"Purge Completed"** to remove all finished tasks
6. **Quick focus** — Press `Ctrl + K` (or `⌘ + K`) to jump to the input

---

## 🚀 Deployment

Build for production:
```bash
npm run build
```

The optimized output will be in the `dist/` folder — ready to deploy on [Vercel](https://vercel.com), [Netlify](https://netlify.com), or any static host.

---

## 📚 For Students — What You Can Learn

This project demonstrates:
- **React Hooks**: `useState`, `useEffect`, `useRef` in a real-world app
- **TypeScript**: Typed components and interfaces
- **localStorage**: Persisting app state across sessions
- **Framer Motion**: Declarative animations in React
- **Component Design**: Breaking UI into reusable, focused components
- **Keyboard UX**: Global keyboard shortcuts with `window.addEventListener`

### Extend It! Try These Challenges:
- [ ] Add a **due date** picker for each task
- [ ] Add **dark/light mode** toggle
- [ ] Add **drag-and-drop** to reorder tasks
- [ ] Connect to a **backend API** to sync tasks across devices

---

## 👤 Author

**Rupesh Devda**
- GitHub: [@2303051051429-boop](https://github.com/2303051051429-boop)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute it.
