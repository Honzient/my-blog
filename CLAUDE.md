# CLAUDE.md — AI System Instructions

> **Read this first.** Every AI agent working on this project must read this file before making any changes. It defines the technical and design standards that keep this project coherent.

---

## 1. Tech Stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | [Astro](https://astro.build) | 7.x |
| Language | TypeScript (strict mode) | 6.x |
| CSS | [TailwindCSS](https://tailwindcss.com) | 4.x |
| Typography | `@tailwindcss/typography` (prose) | latest |
| Code Highlighting | Shiki (Astro built-in) | — |
| Package Manager | **npm only** | — |
| Fonts | Inter + Noto Sans SC (Google Fonts) | — |

### Why Astro?

- **Content-first by design.** Blog output is 100% static HTML/CSS with zero client JS by default. Only hydrate interactive islands when truly needed.
- **Markdown as a first-class citizen.** Content Collections provide type-safe, validated Markdown with frontmatter schema.
- **File-based routing.** `src/pages/about.astro` → `/about`. Zero config, zero boilerplate.
- **Islands Architecture.** Framework components (React, Vue, Svelte) can be embedded only where interactivity is required — but think twice before adding them.

### Key Dependencies

| Package | Purpose |
|---------|---------|
| `astro` | Static site generator |
| `@astrojs/check` | TypeScript type checking for `.astro` files |
| `typescript` | Language type safety |
| `tailwindcss` | Utility-first CSS framework (v4, CSS-first config) |
| `@tailwindcss/vite` | TailwindCSS Vite plugin (Astro integration) |
| `@tailwindcss/typography` | Beautiful Markdown prose styling via `prose` class |
| `zod` | Schema validation for content collection frontmatter |

---

## 2. Style Guide (Design Philosophy)

### Core Principle: **Minimalist & Elegant**

This is a personal blog. Every design decision should answer: *"Does this add calmness, or does it add noise?"*

### Color Palette

- **Base:** Neutral scale (`neutral-50` through `neutral-950`) — pure black, white, and gray.
- **Accent:** None. No bright brand colors, no gradients. Let the content (text, images) provide color.
- **Interactions:** Subtle transitions to `neutral-400`/`neutral-500` on hover. Never use saturated colors for hover states.
- **Backgrounds:** White (`white` / `bg-white`) by default. Light gray (`neutral-50` / `bg-neutral-50`) for subtle card backgrounds if needed.

### Typography

- **Body font:** `Inter` (Latin) + `Noto Sans SC` (CJK fallback), sans-serif stack.
- **Mono font:** `JetBrains Mono` or `Fira Code` for inline code and code blocks.
- **Scale:** Use Tailwind's built-in scale (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-3xl`, `text-4xl`). No custom font sizes.
- **Line height:** `leading-relaxed` for body text, `leading-tight` or `leading-snug` for headings.
- **Font weight:** Regular (400) for body, medium (500) for emphasis, semibold (600) for headings, bold (700) sparingly.

### Whitespace

- **Generous padding and margins.** When in doubt, add more space. Visual breathing room is the #1 design tool.
- Use `py-24`, `mb-20`, `gap-8` over tight spacing. Never crowd elements.
- Max content width is `max-w-3xl` (48rem / ~768px) for a comfortable reading measure.

### Motion & Transitions

- **Subtle and fast.** `duration-200` is the standard. Never exceed `duration-300`.
- Use `transition-colors` for color changes, `transition-transform` for hover lifts.
- Page-load animation: `animate-fade-in` (opacity + translateY 8px, 0.5s).
- Hover: `translate-x-1` for horizontal nudges, `-translate-y-[1px]` for lifts. Keep it barely perceptible.

### Anti-Patterns (DO NOT USE)

- ❌ Bright/neon colors or saturated accent colors
- ❌ Heavy box shadows (`shadow-lg`, `shadow-xl`)
- ❌ Rounded corners larger than `rounded-lg`
- ❌ Gradient backgrounds or text
- ❌ Bouncy or long animations (>300ms)
- ❌ Borders thicker than 1px
- ❌ Cards with prominent backgrounds (keep them transparent or `bg-neutral-50`)

### Do

- ✅ Subtle 1px borders (`border-neutral-100`, `border-neutral-200`)
- ✅ `rounded-lg` for images and code blocks
- ✅ `rounded-full` for small tags/chips
- ✅ Fade-in page transitions
- ✅ Generous whitespace between sections
- ✅ Clean monochrome palette with high contrast for readability

---

## 3. Project Structure

```
my-blog/
├── astro.config.mjs          # Astro + Tailwind + Shiki config
├── tsconfig.json             # TypeScript strict config
├── package.json              # Dependencies & scripts (npm only)
├── .env.example              # Environment variable template
├── .gitignore
├── CLAUDE.md                 # ← This file
│
└── src/
    ├── styles/
    │   └── global.css        # Tailwind imports, @theme tokens, base styles
    │
    ├── content.config.ts     # Content collection schemas + loaders
    ├── content/
    │   └── posts/            # ← All Markdown blog posts live here
    │       └── *.md
    │
    ├── layouts/
    │   └── BaseLayout.astro  # Root HTML shell (fonts, meta, header, footer)
    │
    ├── components/
    │   ├── PostCard.astro       # Article preview card (used on homepage)
    │   ├── FloatingPanel.astro  # Bottom-right quick-actions panel (idle fade)
    │   └── *.astro              # Add reusable UI components here
    │
    └── pages/
        ├── index.astro       # Homepage: intro + post list
        └── posts/
            └── [...slug].astro  # Dynamic post detail page
```

### Key rules

- **Blog posts** go in `src/content/posts/` as `.md` (or `.mdx`) files.
- **Reusable UI** goes in `src/components/`.
- **Pages** are in `src/pages/` — Astro file-based routing.
- **Layouts** wrap pages; they go in `src/layouts/`.
- **Global styles** belong in `src/styles/global.css`.

---

## 4. Dependencies & Environment

### Package Manager

- **Use npm only.** Do NOT run `yarn`, `pnpm`, or `bun`.
- Install: `npm install <package>`
- Run scripts: `npm run dev`, `npm run build`, `npm run preview`

### Adding a New Dependency

When adding a third-party package to this project:

1. Install it: `npm install <package>`
2. **Immediately** update this `CLAUDE.md` — add the package to the **Key Dependencies** table in Section 1 with a one-line description of its purpose.
3. If it requires environment variables, add them to `.env.example`.

### Removing a Dependency

When a package is no longer used:

1. Uninstall it: `npm uninstall <package>`
2. Remove its entry from the **Key Dependencies** table in this file.
3. Remove its environment variables from `.env.example`.

### Environment Variables

- All env vars must be documented in `.env.example` with comments.
- `.env` must remain in `.gitignore` — never commit real secrets.
- Reference env vars in Astro via `import.meta.env.VITE_*` for client-side, or process.env for server-side (build time).

---

## 5. Command Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (hot reload at localhost:4321) |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run arbitrary Astro CLI commands |

---

## 6. Content Authoring

### Blog Post Frontmatter

Every `.md` file in `src/content/posts/` must have:

```yaml
---
title: "Post Title"
description: "A short summary for previews and SEO."
publishedAt: 2026-07-29
updatedAt: 2026-07-29   # optional
tags:                   # optional
  - tech
  - design
draft: false            # true = hidden from production
---
```

### Images & Assets

- Place images in `src/content/posts/` alongside the `.md` file, or in `public/` for global assets.
- Reference them with relative paths in Markdown: `![alt](./image.png)`.

---

*This document evolves with the project. When design decisions change, update it. When dependencies are added or removed, update it. When you learn something about the codebase that surprised you, add it.*
