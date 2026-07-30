# CLAUDE.md — Universal Development & Design Standards

> **Read this first.** This document defines the high-level workflow, design philosophy, and coding standards for this project. It intentionally avoids specific technical implementations or folder structures, focusing instead on overarching principles and project governance.

---

## 1. Mandatory Workflow & Git Protocol (Highest Priority)

As an AI development assistant, you **MUST** strictly follow this continuous integration workflow:

- **GitHub Push Requirement:** After completing any significant update (e.g., bug fix, component refactoring, UI optimization, or new feature rollout), you **must** proactively prompt and guide the user to push the code to the Git/GitHub repository.
- **Commit Message Standard:** Generate clear, semantic commit messages following the Conventional Commits format (`<type>: <description>`). 
  - *Examples:* `feat: 统一全站阅读排版与层级体系`, `fix: 修复非语义化标签嵌套导致的渲染异常`
- **Documentation Synchronization:** If a change modifies core functionalities, introduces new dependencies, or alters the project's setup, **immediately** update `README.md` and related architectural documentation.
- **Completion Prompt:** At the end of every significant task execution, you must explicitly conclude with:
  > **"代码修改已完成。请检查并在测试无误后，让我为您生成 Git Commit 信息并引导推送到 GitHub。"**

---

## 2. Design Philosophy & UX Principles

- **Minimalism & Signal-to-Noise Ratio:** Prioritize the reading and content experience. Every UI element must justify its existence. Remove unnecessary borders, heavy shadows, and redundant decorative elements. Rely on typography and generous whitespace (breathing room) to separate sections.
- **Accessibility & Contrast (WCAG):** Never sacrifice readability for aesthetics. Ensure all secondary texts, meta-information, and disabled states maintain sufficient contrast against their background (especially in low-contrast "paper-like" or warm themes).
- **Visual Hierarchy:** Establish and strictly adhere to a consistent typographic scale. Headings (H1, H2, H3) must be structurally distinct from body text through size, weight, and substantial top/bottom margins.
- **Micro-Interactions:** All interactive elements (buttons, links, cards) must have subtle, predictable, and logical feedback states (hover, active, focus). Transitions should be smooth and fast.

---

## 3. Localization & Uniformity (Strict Rule)

- **Unified Language:** The primary language of the user interface is Simplified Chinese. Never mix English terminologies in user-facing elements unless it is a globally recognized technical term.
- **Data Formatting:** Implement a single source of truth for date, time, and numerical formatting (e.g., strictly use `YYYY年MM月DD日` or `YYYY-MM-DD`). Prevent format fragmentation across different pages or modules.
- **Consistent Terminology:** Ensure functional copy (e.g., "阅读时间", "返回", "搜索", "标签") maintains absolute consistency across the entire application.

---

## 4. Code Quality & Architectural Norms

- **Semantic HTML & Standards Compliance:** Output strictly valid and semantic DOM structures. **Zero tolerance for HTML anti-patterns** (e.g., absolutely no nested `<a>` tags, no interactive elements inside other interactive elements). Use native semantic tags properly for SEO and screen-reader compatibility.
- **Component Decoupling:** Design UI modules (like Table of Contents, Code Blocks, Article Cards) as independent, cohesive components. Avoid hardcoding parent-specific layout constraints (like absolute widths or fixed margins) inside child components.
- **Maintainability over Cleverness:** Write readable, predictable code. Leave clear, concise comments for complex logic. Avoid "magic numbers" in styling or logic; extract them into configuration files, CSS variables, or design tokens.
- **Dependency Hygiene:** Do not introduce heavy or complex third-party libraries for trivial features that can be efficiently solved with native Web APIs (e.g., prefer native `IntersectionObserver` over large scrolling libraries).

---

## 5. Proactive Assistance

- Always point out potential UX friction, accessibility violations, or code smells when you spot them in the user's provided code, even if not explicitly asked. Propose high-level, standard-compliant solutions.

---
*This document acts as the supreme constitution for all AI interactions within this project.*