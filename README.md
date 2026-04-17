# 🏥 Patient Management & Report System - Frontend Setup

This repository contains the **Frontend application** for a patient setup management system. It's built with React for handling patients and their reports.

## 🚀 Frontend Technology Stack

| Layer                 | Technology                    | Purpose                                                                 |
|----------------------|-----------------------------|-------------------------------------------------------------------------|
| Framework            | React (via Vite)            | Fast UI rendering and development                                      |
| Language             | TypeScript (ES6+)           | Strong typing and maintainable code                                    |
| Routing              | React Router DOM            | Navigation mechanism                                                   |
| Styling              | Tailwind CSS + Shadcn/UI    | Clean, responsive UI                                                   |
| Forms & Validation   | React Hook Form + Zod       | Form handling and validation                                           |
| State Management     | Context API                 | Manage global state (auth, ui configs)                                 |
| Server State         | TanStack Query              | API data fetching and caching                                          |
| Data Fetching        | Axios                       | API communication                                                      |
| Icons                | Lucide React                | UI icons                                                               |

## 📁 Component Architecture

The project employs a robust **Two-Tier Component System**:
- **Tier 1 (Base UI):** Raw primitive components installed via Shadcn/UI found in `src/components/ui/`
- **Tier 2 (Controls):** Custom robust form wrappers executing business logic located in `src/components/controls/`

## 🗂 Folder Structure

```
src/
├── assets/           # Static assets, images, icons
├── components/       # Component tree
│   ├── ui/           # Base Shadcn UI primitives
│   ├── controls/     # Reusable form/state wrappers
│   ├── common/       # Cross-page common sections
│   └── pages/        # Complete page level views
├── constants/        # Application constants & enums
├── hooks/            # Custom reusable react hooks
├── helpers/          # Business logic helpers
├── routes/           # AppRouter and Protected routes
├── services/         # Axios config and API clients
└── utils/            # General utilities
```

## 🛠 Required Standards and Boundaries

### 📝 Naming Conventions

- Files & Directories: `kebab-case.tsx`
- React Components: `PascalCase`
- Hooks & Helpers: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

### 💻 Development Workflow Boundary

- Do not modify `.env` or `package.json` logic directly outside standard additions.
- Always use **React Hook Form + Zod** strictly for any Form implementation.
- Gracefully handle API response layouts (Loading, Error, Empty, Success).

### 🎨 Themes & UI Rules

- **Use ONLY Tailwind CSS and Shadcn UI.** No direct css hacking unless essential for complex custom micro-animations.
- **Custom Application Colors Setup**:
    - Primary: `#B8860B`
    - Secondary: `#000000`
    - Ternary: `#0A2463`

## ⚙️ Standard Commands

Install dependencies:
```bash
npm install
```

Start the application:
```bash
npm run dev
```

Build the application for deployment:
```bash
npm run build
```
