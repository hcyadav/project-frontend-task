# 🚀 ADMIN PANEL MODULES — AUTHENTICATION + PATIENT MANAGEMENT

---

# 🧱 1. MODULE OVERVIEW

This document defines two core modules used in the admin panel application:

- **Authentication Module** — Login, token storage & protected route management
- **Patient Management Module** — Full CRUD with search & pagination

---

# 🔐 2. AUTHENTICATION MODULE (LOGIN)

---

## 🔹 STRUCTURE

### Login Page Layout

- Centered card form on a clean background
- App logo / name at the top
- Email input field
- Password input field (with show/hide toggle)
- "Remember Me" checkbox (optional)
- Login button (primary CTA)

---

## 📋 FORM FIELDS

| Field    | Type     | Validation                   |
| -------- | -------- | ---------------------------- |
| Email    | Text     | Required, valid email format |
| Password | Password | Required, min 6 characters   |

---

## 🎨 UI/UX BEHAVIOR

- Clean centered card with subtle shadow
- Inline validation errors below each field
- Show/hide toggle on password field
- Button disabled until both fields are filled
- Loading spinner on button during API call
- Error toast/message on wrong credentials

---

## ⚡ INTERACTIONS

- Submit form → validate → call login API
- On success → store token in `localStorage` → redirect to `/dashboard`
- On failure → display error message ("Invalid email or password")

---

## 🔒 AUTHENTICATION FLOW

```
User opens app
    ↓
Check token in localStorage
    ↓
Token exists?  →  YES → redirect to /patient
    ↓ NO
Show Login Page
    ↓
User enters Email + Password → Submit
    ↓
Validate inputs (client-side)
    ↓
Call API → POST /auth/login
    ↓
Success?  →  YES → store token in localStorage → redirect to /dashboard
    ↓ NO
Show error message ("Invalid credentials")
```

---

## 🛡️ TOKEN STORAGE & PROTECTED ROUTES

### Token Storage Strategy

```
On Login Success:
    localStorage.setItem("authToken", response.token)
    localStorage.setItem("userInfo", JSON.stringify(response.user))

On Every App Load:
    Read token from localStorage
    If token missing or expired → redirect to /login

On Logout:
    localStorage.removeItem("authToken")
    localStorage.removeItem("userInfo")
    redirect to /login
```

### Protected Route Guard (applies to ALL routes except /login)

```
User navigates to any route (e.g.  /patients)
    ↓
Route Guard checks: Does localStorage have "authToken"?
    ↓
YES → Allow access → render page
    ↓ NO
Redirect to /login immediately
```

### Token Maintenance Rules

- Token is checked on **every route change** (not just page load)
- Token is attached to **every API request** as Authorization header:
  `Authorization: Bearer <token>`
- If any API returns `401 Unauthorized` → auto logout → redirect `/login`
- Token expiry check is done before rendering any protected page
- Never expose token in URL params or query strings

### Routes & Protection Status

| Route                | Protected   | Redirect if No Token |
| -------------------- | ----------- | -------------------- |
| `/login`             | NO Public   | —                    |
| `/patients`          | YES Private | redirect to `/login` |
| `/patients/:id/edit` | YES Private | redirect to `/login` |

---

## 📱 RESPONSIVE DESIGN

### Desktop

- Centered card, max-width 420px

### Tablet

- Same card, slight width adjustment

### Mobile

- Full-width card with padding

---

## ✅ VALIDATION RULES

- Email: Required | Valid email format
- Password: Required | Minimum 6 characters
- Show field-level errors on blur or submit

---

---

# 👤 3. PATIENT MANAGEMENT MODULE

---

## 🔹 MODULE OVERVIEW

The Patient Management module allows admins to:

- View list of all patients (with pagination)
- Search patients by name
- Create new patients
- Edit/update existing patient information
- Delete patients

> All API calls in this module must include the `Authorization: Bearer <token>` header. If token is missing or expired, the user is immediately redirected to `/login`.

---

## 📋 3.1 PATIENT LIST PAGE

### Page Structure

```
[ Page Title: Patient Management ]              [ + Add New Patient Button ]

[ Search Bar: Search by name... ]

┌─────────────────────────────────────────────────────────────────────────────┐
│  #  │ First Name │ Last Name │  DOB        │ Gender  │ Phone         │ Actions│
├─────────────────────────────────────────────────────────────────────────────┤
│  1  │ John       │ Doe       │ 01/12/1992  │ Male    │ +91 9876543210│ Edit Delete│
│  2  │ Sara       │ Khan      │ 15/05/1996  │ Female  │ +91 8765432109│ Edit Delete│
│  ...                                                                         │
└─────────────────────────────────────────────────────────────────────────────┘

[ Pagination: Prev   1  2  3 ...  Next ]
[ Showing 1-10 of 45 records ]
```

---

### Table Columns

| Column     | Description                    |
| ---------- | ------------------------------ |
| #          | Serial number                  |
| First Name | Patient's first name           |
| Last Name  | Patient's last name            |
| DOB        | Date of birth                  |
| Gender     | Male / Female / Other          |
| Phone      | Phone number with country code |
| Actions    | Edit and Delete buttons        |

---

## 🔍 3.2 SEARCH FUNCTIONALITY

- Search input at the top of the patient list
- Filters patient records by first name or last name in real-time
- Case-insensitive search
- Displays "No patients found" message when no match

### Behavior

```
User types name → filter list → show matching patients
Clear input → restore full list
```

---

## 📄 3.3 PAGINATION

- Display 10 patients per page (configurable)
- Navigation: Previous / Page Numbers / Next
- Show current range and total (e.g., "Showing 1-10 of 45")
- Disable Previous on first page, Next on last page

### Pagination Controls

```
Previous   [ 1 ]  [ 2 ]  [ 3 ]  ...  Next
Showing 1-10 of 45 records
```

---

## ➕ 3.4 CREATE PATIENT

### Trigger

- Click "+ Add New Patient" button → opens modal or navigates to dedicated form page

---

### 📋 CREATE PATIENT FORM FIELDS

> Fields based on the UI design reference

#### Row 1 — Name

| Field        | Type | Width      | Validation                 |
| ------------ | ---- | ---------- | -------------------------- |
| First Name\* | Text | Half-width | Required, min 2 characters |
| Last Name\*  | Text | Half-width | Required, min 2 characters |

Placeholder: "Enter First name" | "Enter Last name"

---

#### Row 2 — Personal Info

| Field           | Type     | Width      | Validation                       |
| --------------- | -------- | ---------- | -------------------------------- |
| Date of Birth\* | Date     | Half-width | Required, valid date, not future |
| Gender\*        | Dropdown | Half-width | Required — Male / Female / Other |

Placeholder: "Select date" | "Select gender" (with chevron dropdown icon)

---

#### Row 3 — Address

| Field     | Type | Width      | Validation |
| --------- | ---- | ---------- | ---------- |
| Address\* | Text | Full-width | Required   |

Placeholder: "Enter address"

---

#### Row 4 — Medical History

| Field             | Type     | Width      | Validation |
| ----------------- | -------- | ---------- | ---------- |
| Medical History\* | Textarea | Full-width | Required   |

Placeholder: "Enter medical history"

---

#### Row 5 — Allergies

| Field       | Type     | Width      | Validation |
| ----------- | -------- | ---------- | ---------- |
| Allergies\* | Textarea | Full-width | Required   |

Placeholder: "Enter allergies"

---

#### Row 6 — Current Medications

| Field                 | Type     | Width      | Validation |
| --------------------- | -------- | ---------- | ---------- |
| Current Medications\* | Textarea | Full-width | Required   |

Placeholder: "Enter current medications"

---

#### Row 7 — Contact Info

| Field   | Type | Width      | Validation                          |
| ------- | ---- | ---------- | ----------------------------------- |
| Phone\* | Text | Half-width | Required, numeric, +91 prefix badge |
| Email\* | Text | Half-width | Required, valid email format        |

Placeholder: "Enter phone number" | "Enter email"
Phone field: "+91" displayed as a fixed left badge inside the input box

---

#### Row 8 — Emergency Contact

| Field                     | Type | Width      | Validation                          |
| ------------------------- | ---- | ---------- | ----------------------------------- |
| Emergency Contact Name\*  | Text | Half-width | Required, min 2 characters          |
| Emergency Contact Phone\* | Text | Half-width | Required, numeric, +91 prefix badge |

Placeholder: "Enter Emergency contact name" | "Enter emergency contact number"
Emergency phone field: "+91" displayed as a fixed left badge inside the input box

---

#### Submit Button

```
[ Create Patient ]
Full-width teal/primary color button at the bottom of the form
```

---

### 🎨 Create Form UI Details

- Two-column grid layout for all half-width fields
- Full-width fields span across both columns
- Labels appear above each input field
- Asterisk (\*) marks all required fields
- Placeholder text inside every input for guidance
- Phone and Emergency Contact Phone show +91 as a fixed left badge inside the input
- Gender uses a styled dropdown with chevron icon on the right
- Date of Birth uses a date picker input
- Textarea fields for Medical History, Allergies, Current Medications
- Inline error message shown in red below each invalid field on submit
- Primary submit button in teal/brand color, full-width

---

### Create Behavior

```
Admin fills all required fields → Click "Create Patient"
    ↓
Client-side validation runs on all fields
    ↓
All valid? → Call POST /patients API with Authorization header
    ↓
Success → Patient added to list → Show success toast → Close modal / redirect to list
    ↓ Failure (validation or API error)
Show inline field-level error messages
```

---

## ✏️ 3.5 EDIT / UPDATE PATIENT

### Trigger

- Click "Edit" button on a patient row → opens pre-filled modal or form page

---

### 📋 EDIT PATIENT FORM FIELDS

> Identical field layout as Create Patient — all fields pre-populated with existing data

#### Row 1 — Name

| Field        | Type | Width      | Pre-filled |
| ------------ | ---- | ---------- | ---------- |
| First Name\* | Text | Half-width | YES        |
| Last Name\*  | Text | Half-width | YES        |

---

#### Row 2 — Personal Info

| Field           | Type     | Width      | Pre-filled |
| --------------- | -------- | ---------- | ---------- |
| Date of Birth\* | Date     | Half-width | YES        |
| Gender\*        | Dropdown | Half-width | YES        |

---

#### Row 3 — Address

| Field     | Type | Width      | Pre-filled |
| --------- | ---- | ---------- | ---------- |
| Address\* | Text | Full-width | YES        |

---

#### Row 4 — Medical History

| Field             | Type     | Width      | Pre-filled |
| ----------------- | -------- | ---------- | ---------- |
| Medical History\* | Textarea | Full-width | YES        |

---

#### Row 5 — Allergies

| Field       | Type     | Width      | Pre-filled |
| ----------- | -------- | ---------- | ---------- |
| Allergies\* | Textarea | Full-width | YES        |

---

#### Row 6 — Current Medications

| Field                 | Type     | Width      | Pre-filled |
| --------------------- | -------- | ---------- | ---------- |
| Current Medications\* | Textarea | Full-width | YES        |

---

#### Row 7 — Contact Info

| Field   | Type | Width      | Pre-filled |
| ------- | ---- | ---------- | ---------- |
| Phone\* | Text | Half-width | YES        |
| Email\* | Text | Half-width | YES        |

---

#### Row 8 — Emergency Contact

| Field                     | Type | Width      | Pre-filled |
| ------------------------- | ---- | ---------- | ---------- |
| Emergency Contact Name\*  | Text | Half-width | YES        |
| Emergency Contact Phone\* | Text | Half-width | YES        |

---

#### Submit Button

```
[ Update Patient ]
Full-width teal/primary color button at the bottom of the form
```

---

### Edit Behavior

```
Admin clicks Edit on a patient row
    ↓
Form opens with all fields pre-filled with existing patient data
Admin edits desired fields → Click "Update Patient"
    ↓
Client-side validation runs on all fields
    ↓
All valid? → Call PUT /patients/:id API with Authorization header
    ↓
Success → Patient updated in list → Show success toast → Close modal / redirect to list
    ↓ Failure
Show inline field-level error messages
```

---

## 🗑️ 3.6 DELETE PATIENT

### Trigger

- Click "Delete" button on patient row

### Behavior

```
Admin clicks Delete on a patient row
    ↓
Show confirmation dialog:
"Are you sure you want to delete [First Name Last Name]?
 This action cannot be undone."
    ↓
Confirm → Call DELETE /patients/:id API with Authorization header
       → Remove patient from list → Show success toast
Cancel  → Close dialog, no action taken
```

---

## 🎨 UI/UX BEHAVIOR

- Table with alternating row colors for readability
- Hover effect on table rows
- Edit and Delete action buttons with icons and tooltips
- Modal overlays for Add/Edit with semi-transparent backdrop
- Toast notifications for all success/error states
- Confirmation dialog before every delete action
- Form fields highlight with red border on validation error
- Placeholder text in all inputs for user guidance

---

## 📱 RESPONSIVE DESIGN

### Desktop

- Full table with all columns visible
- Two-column form grid layout

### Tablet

- Table scrollable horizontally
- Form collapses to single column

### Mobile

- Card-based patient list instead of table
- Each patient card: name, DOB, phone + Edit/Delete buttons
- Form is single-column, full-width inputs

---

## ⚡ INTERACTIONS SUMMARY

| Action         | Trigger                | Result                            |
| -------------- | ---------------------- | --------------------------------- |
| View Patients  | Page load              | List loads with pagination        |
| Search         | Type in search box     | Real-time filter by name          |
| Add Patient    | Click "+ Add" button   | Open create form/modal            |
| Edit Patient   | Click Edit on row      | Open pre-filled form/modal        |
| Delete Patient | Click Delete on row    | Confirmation dialog then remove   |
| Paginate       | Click page number      | Load next/prev page of records    |
| Submit Create  | Click "Create Patient" | POST API → patient added to list  |
| Submit Edit    | Click "Update Patient" | PUT API → patient updated in list |

---

---

# 🗺️ 4. NAVIGATION FLOW

```
/login   (Public — no token required)
    ↓ On successful login → token saved to localStorage
/patients              (Protected — Patient List, search, pagination)
           ├── /patients/new   (Protected — Create Patient Form)
           └── /patients/:id/edit  (Protected — Edit Patient Form pre-filled)
```

---

# 🔐 5. TOKEN MANAGEMENT — GLOBAL RULES (ALL MODULES)

These rules apply across the entire project without exception:

---

## 📦 Storage

```javascript
// On Login Success
localStorage.setItem("authToken", token);
localStorage.setItem("userInfo", JSON.stringify(user));

// On Logout
localStorage.removeItem("authToken");
localStorage.removeItem("userInfo");
```

---

## 🔗 API Request Interceptor

Every API call across ALL modules must attach the token automatically:

```javascript
headers: {
  "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
  "Content-Type": "application/json"
}
```

---

## 🚧 Route Guard Logic

Applied before rendering ANY protected page:

```javascript
// On every route change
const token = localStorage.getItem("authToken");

if (!token) {
  redirect("/login");
  return;
}

// If any API responds with 401 Unauthorized
if (response.status === 401) {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userInfo");
  redirect("/login");
}
```

---

## 🔄 Token Lifecycle

| Event                 | Action                                           |
| --------------------- | ------------------------------------------------ |
| Login success         | Store token in localStorage                      |
| Page / route load     | Check token exists → allow or redirect /login    |
| Every API call        | Attach token in Authorization Bearer header      |
| API returns 401       | Clear token + userInfo → redirect /login         |
| Token expired (JWT)   | Clear token + userInfo → redirect /login         |
| Logout button clicked | Clear token + userInfo → redirect /login         |
| Browser tab reopened  | Token persists in localStorage (stays logged in) |

---

## 🔒 Security Rules

- Token is never passed in URL query params
- Token is never logged to console in production
- On logout, both authToken and userInfo are cleared from localStorage
- All protected API endpoints validate the token server-side as well
- Sidebar, Header, and all navigation only render after token is confirmed valid

---

# 🎯 6. GLOBAL UX BEST PRACTICES

- Consistent spacing and alignment across all modules
- Use icons alongside labels for better scannability
- Toast notifications for all success and error feedback
- Confirmation dialogs before destructive actions (delete)
- Empty states for tables with no data ("No patients found")
- Loading spinners or skeletons during data fetch
- Inline field-level errors (not just a top-level banner)
- All form fields: asterisk (\*) marks required fields
- Responsive layout across desktop, tablet, and mobile

---

# 🧠 7. PROMPT FOR AI UI GENERATION

Create an admin panel application with two core modules:

**1. Authentication Module:**

- Clean centered login form with email and password fields
- Inline validation, loading state, and error handling
- On success: store token in localStorage → redirect to /patient
- Route guard: check localStorage token on every page load and route change
- API interceptor: attach Bearer token automatically to every API request
- On 401 response or missing token: auto clear storage and redirect to /login

**2. Patient Management Module:**

- Patient list table: First Name, Last Name, DOB, Gender, Phone, Actions (Edit/Delete)
- Search bar to filter patients by name in real-time
- Pagination controls (10 per page) with page numbers and showing X-Y of Z count
- "+ Add New Patient" button opens a form with these fields in order:
  - First Name* (half-width) | Last Name* (half-width)
  - Date of Birth* date picker (half-width) | Gender* dropdown (half-width)
  - Address\* text (full-width)
  - Medical History\* textarea (full-width)
  - Allergies\* textarea (full-width)
  - Current Medications\* textarea (full-width)
  - Phone* with +91 badge (half-width) | Email* (half-width)
  - Emergency Contact Name* (half-width) | Emergency Contact Phone* with +91 badge (half-width)
  - "Create Patient" full-width teal submit button
- Edit button per row → same form pre-filled with patient data → "Update Patient" button
- Delete button per row → confirmation dialog before removal
- All API calls automatically include Authorization: Bearer token header
- Toast notifications for all CRUD success and error states

Design: clean minimal teal-and-white color scheme, two-column form grid
(stacks to single column on mobile), smooth transitions, inline validation errors,
proper hover and active states on all interactive elements.

---

# ✅ 8. FINAL RESULT

✔ Authentication module with login and token-based session management
✔ Token stored in localStorage and attached to every single API request
✔ Protected route guard on ALL routes — auto redirect to /login if no token
✔ Auto logout and redirect on 401 Unauthorized from any API call
✔ Patient list with real-time search and pagination (10 per page)
✔ Full CRUD — Create, Read, Update, Delete patients
✔ Detailed patient form with 10 fields across 8 rows:
First Name, Last Name, DOB, Gender, Address, Medical History,
Allergies, Current Medications, Phone, Email,
Emergency Contact Name, Emergency Contact Phone
✔ Two-column responsive form layout matching UI design reference
✔ +91 country code badge on Phone and Emergency Contact Phone fields
✔ Mobile-responsive layout across all modules
✔ UX best practices: toasts, confirmations, inline errors, loading states
✔ Scalable clean admin panel structure — no report module

---
