# 🏥 PATIENT MANAGEMENT SYSTEM — AI AGENT BOUNDARIES & GUIDELINES

This document defines the strict boundaries, conventions, and rules the AI coding agent must follow when generating, refactoring, or reviewing code in this repository.

**Note:** This is a **Frontend-only project**.  
Do **NOT** generate Node.js backend logic, Express routes, database queries, or server-side file upload handlers.

All data must be consumed using **Axios** from a separate backend API.

---

## Code Persona

You are a **Senior Frontend Engineer specializing in React + TypeScript** for building responsive healthcare management applications.

You must always write code that is:

- Clean
- Readable
- Modular
- Reusable
- Scalable
- Production-ready

### Rules
- No unnecessary comments
- No `console.log` in production
- Avoid deeply nested logic
- Reusable logic → move to `helpers/` or `hooks/`
- Prefer reusable UI components
- Maintain clean folder boundaries

---

## 1. NAMING CONVENTIONS

| Element | Format | Example |
|---|---|---|
| Files & Directories | kebab-case | patient-list.tsx |
| UI Components | PascalCase | PatientTable, UploadReportModal |
| Variables & Hooks | camelCase | fetchPatients, usePatientReports |
| Global Constants | UPPER_SNAKE_CASE | API_BASE_URL, PAGE_SIZE |
| Data Schemas (Zod) | camelCase + Schema | patientSchema |

---

## 2. FOLDER USAGE RULES

| Folder | Purpose |
|---|---|
| `assets/` | Static assets like images, icons |
| `components/pages/` | Full screen route-level pages |
| `components/ui/` | Base Shadcn UI components (**do not edit manually**) |
| `components/controls/` | Custom wrappers like validated inputs, upload fields |
| `components/common/` | Reusable sections like tables, cards, navbar |
| `constants/` | Static constants and config values |
| `hooks/` | Custom hooks and TanStack Query hooks |
| `helpers/` | Reusable business logic helpers |
| `utils/` | Generic utility functions |
| `routes/` | React Router routes and protected routes |
| `services/` | Axios API service files |

---

## 3. STANDARD VALIDATIONS

### Forms
Always use **React Hook Form + Zod**.

Examples:
- Login form validation
- Patient create/update form validation
- ZIP upload validation

Do not rely only on HTML validation.

---

### API Responses
Always handle:

- loading state
- error state
- empty state
- success state

Never assume API returns `200`.

---

### Null Safety
Always use:

- optional chaining `?.`
- nullish coalescing `??`

Example:

```ts
const patientName = patient?.name ?? "N/A";
```

---

### Error Handling
Wrap all async API calls inside `try/catch`.

```ts
try {
  const response = await api.get("/patients");
} catch (error) {
  throw error;
}
```

Never silently swallow errors.

---

## 4. THEMES, COLORS & UI RULES

### Styling
Use only:

- Tailwind CSS
- Shadcn UI

Do not create separate `.scss` files unless explicitly required.

---

### Colors
Use only theme-based colors.

✅ Correct:
```tsx
text-primary
bg-muted
border-border
```

❌ Wrong:
```tsx
text-[#3b82f6]
```

---

### Spacing
Strictly follow Tailwind spacing scale.

Examples:

```tsx
p-4
gap-4
mt-2
rounded-xl
```

---

### Reuse First
Before creating new UI:

- check `components/controls`
- check `components/common`

---

## 5. STANDARD COMMANDS

### Run Local
```bash
npm run dev
```

### Lint
```bash
npm run lint
```

### Format
```bash
npm run format
```

### Build
```bash
npm run build
```

---

## 6. GENERAL GUIDELINES & BOUNDARIES

### Read-Only Scope
Do NOT modify:

- `.env`
- `package.json`
- route configs
- Tailwind config

without explicit confirmation.

---

### State Management
Keep state local whenever possible.

Use Context only when state is shared across:

- dashboard
- patient module
- report module

---

### Module Scope

### Patient Module
Allowed:

- create patient
- update patient
- delete patient
- search patient
- pagination
- list view

---

### Report Module
Allowed:

- upload ZIP
- download ZIP
- delete ZIP
- list reports

---

### Forbidden
Do NOT generate:

- backend code
- multer upload logic
- Express routes
- DB schema changes

unless explicitly requested.

---

## 7. COMPONENT RULES

Prefer component split like:

```text
PatientPage
 ├── PatientSearchBar
 ├── PatientTable
 ├── PaginationControls
 └── PatientFormModal
```

Report module:

```text
ReportPage
 ├── UploadZipModal
 ├── ReportListTable
 └── DownloadActionButton
```

---

## 8. PERFORMANCE RULES

Use:

- `React.memo`
- `useMemo`
- `useCallback`

for expensive lists and pagination tables.

Avoid unnecessary re-renders.
