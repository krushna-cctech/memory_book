# Interactive Farewell Memory Book

An elegant, digital scrapbook experience dedicated to a teammate who is leaving the team. It is built to feel like opening a physical storybook, telling their journey page-by-page.

## Technology Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## Getting Started

### 1. Install Dependencies
Run the installation with peer dependencies enabled:
```bash
npm install --legacy-peer-deps
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Production Build
Validate types and compile the optimized production bundle:
```bash
npm run build
```

---

## Customization Guide

### Customize Teammate Data
To update the details of the main character (name, role, department, years, intro, and chapter titles), edit the static configuration file:
*   [data/farewell.ts](file:///d:/Farewll%20website/farewell-memory-book/data/farewell.ts)

The types supporting this schema are defined in:
*   [types/farewell.ts](file:///d:/Farewll%20website/farewell-memory-book/types/farewell.ts)

### Replace Avatar Image
Replace the default profile vector with the teammate's image:
*   Place the image inside the `public/avatars/` directory (e.g. `public/avatars/rahul.jpg`).
*   Update the `avatar` path inside `data/farewell.ts`:
    ```typescript
    avatar: "/avatars/rahul.jpg"
    ```

---

## Design System

The app utilizes a warm, light paper editorial theme to emulate a physical memory notebook:

*   **Background**: `#F7F1E8` (Warm paper, accented with a vintage SVG noise filter)
*   **Primary text/borders**: `#5B4636` (Dark brown)
*   **Secondary details**: `#D8BFA3` (Soft beige)
*   **Accents**: `#C96B5B` (Terracotta red)
*   **Highlights**: `#E8C96A` (Golden stars/labels)
*   **Body Text**: `#302A26` (Dark charcoal)
*   **Typography**: *Playfair Display* (Serif headings), *Inter* (Sans body text), and *Caveat* (Handwritten notes)
