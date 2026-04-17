# 🚀 COMMON LAYOUT MODULE (HEADER + SIDEBAR + FOOTER)

---

# 🧱 1. MODULE OVERVIEW

This module defines the common layout structure used across the admin panel and user-facing application.

It includes:

- Global Header (Top Navigation)
- Left Collapsible Sidebar (Navigation Modules)
- Footer (mention copyright)

---

# 🖥️ 2. HEADER (TOP NAVBAR)

## 🔹 STRUCTURE

### Left Section (Navigation Links)

---

## 🎨 UI/UX BEHAVIOR

- Sticky header (fixed at top)
- Clean minimal design
- Highlight active page
- Responsive menu (hamburger on mobile)

---

## ⚡ INTERACTIONS

- Clicking menu navigates to respective pages
- Smooth hover effects

---

# 📂 3. LEFT COLLAPSIBLE SIDEBAR

---

## 🔹 MAIN FEATURES

- Fully collapsible sidebar
- Icons for each module
- Smooth expand/collapse animation

---

## 📁 MENU STRUCTURE

### 1️⃣ Patient Management (Collapsible)

- patient

---

---

## 🔻 BOTTOM SECTION

- Logout Button (always visible at bottom)
- Logged-in User Name (e.g., "Hi, John")
- Optional:
  - Profile dropdown
  - Logout option

---

## 🎨 UI/UX BEHAVIOR

- Sidebar can be:
  - Expanded (full view)
  - Collapsed (icon-only view)

- Active menu highlighted
- Smooth transitions

---

## 📱 RESPONSIVE DESIGN

### Desktop

- Full sidebar visible

### Tablet

- Collapsible sidebar

### Mobile

- Drawer-style sidebar (overlay)

---

## ⚡ INTERACTIONS

- Click parent → expand/collapse
- Click child → navigate page
- Logout → clear token & redirect to login

---

# 🔐 AUTHENTICATION HANDLING

1. User logs in
2. Token stored (localStorage/cookies)
3. Sidebar & Header visible only after login
4. Logout button:  
   → Clear token  
   → Redirect to /login

---

# 🧭 4. FOOTER SECTION

---

## 🔹 CONTENT STRUCTURE

### Left Side

- © 2026 Your Company Name
- All rights reserved

---

---

## 🎨 UI/UX BEHAVIOR

- Fixed or static footer (based on page)
- Minimal design
- Light background / subtle border

---

## 📱 RESPONSIVE DESIGN

- Stack content vertically on mobile
- Center align text

---

# 🎯 5. GLOBAL LAYOUT STRUCTURE

---

## | Header (Top Navbar) |

| Sidebar | Main Content Area |
| | |
| | |

---

## | Footer |

---

# ⚡ 6. UX BEST PRACTICES

- Consistent spacing & alignment
- Use icons with labels
- Fast navigation experience
- Clear active states

---

# 🧠 7. PROMPT FOR AI UI GENERATION

Create a modern admin dashboard layout with:

1. A sticky header with navigation links:

   and logged-in user name on right side.

2. A collapsible left sidebar with:
   - Product Management (Product)

Design should be clean, minimal, responsive,
and similar to modern SaaS dashboards.
Use smooth animations and proper spacing.

---

# ✅ FINAL RESULT

✔ Common reusable layout  
✔ Scalable navigation structure  
✔ Clean UI/UX  
✔ Responsive design  
✔ Authentication-aware layout
**No nested routes in sidebar**

---
