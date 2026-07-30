---
title: "使用 Astro + TailwindCSS 构建极速博客的完整指南"
description: "从零搭建一个零 JS、完美 Lighthouse 分数的静态博客，深度解析 Astro 7 的内容集合、动态路由与 TailwindCSS 4 的 CSS-first 配置。"
publishedAt: 2026-07-01
tags:
  - tech
  - tutorial
draft: false
---

Astro 是我用过最适合构建内容型网站的工具。它不像 Next.js 那样为每个页面注入几十 KB 的运行时 JS，也不像 Hugo 那样把你困在 Go 模板的语法里。它只做一件事：以最小的代价把 Markdown 变成 HTML。

## 为什么是 Astro？

当你面对下面这些需求时，Astro 是正确答案：

- 博客、文档站、营销页面（内容为主、交互为辅）
- 需要 Markdown/MDX 作为一等公民
- 希望默认输出零 JS，只在必要时按需加载
- 想要 TypeScript 类型安全的前置数据（frontmatter）

### 项目初始化

```bash
npm create astro@latest my-blog -- --template minimal
cd my-blog
npm install
```

初始目录结构精炼到令人感动：

```
my-blog/
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── src/
    └── pages/
        └── index.astro
```

## 内容集合：类型安全的 Markdown

Astro 的内容集合（Content Collections）解决了博客最核心的问题：如何保证每一篇 Markdown 的前置数据都是正确且完整的。

### 定义 Schema

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
```

如果你忘了写 `title` 或把 `publishedAt` 写成了字符串——**构建直接报错**，不会默默地生成一个有问题的页面。

### 查询与过滤

```astro
---
import { getCollection } from 'astro:content';

// 获取所有非草稿文章，按日期倒序
const posts = (await getCollection('posts'))
  .filter((p) => !p.data.draft)
  .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
---

<ul>
  {posts.map((post) => (
    <li>
      <a href={`/posts/${post.id}`}>{post.data.title}</a>
      <time>{post.data.publishedAt.toLocaleDateString('zh-CN')}</time>
    </li>
  ))}
</ul>
```

## 动态路由：`[...slug]` 的神奇

Astro 的文件路由意味着 `src/pages/posts/[...slug].astro` 会自动处理 `/posts/hello-world`、`/posts/frontend-architecture` 等所有路径。

```astro
---
import { getCollection } from 'astro:content';

// getStaticPaths 告诉 Astro 构建哪些页面
export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts
    .filter((p) => !p.data.draft)
    .map((post) => ({
      params: { slug: post.id },
      props: { post },
    }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<article>
  <h1>{post.data.title}</h1>
  <Content /> <!-- 渲染 Markdown 正文 -->
</article>
```

## TailwindCSS 4：CSS-first 配置

TailwindCSS 4 最大的改变是**不再需要 `tailwind.config.js`**——所有配置都在 CSS 里完成：

```css
@import 'tailwindcss';

@theme {
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --color-brand: #3b82f6;
}

/* 暗色模式：使用 class 策略而非 media query */
@variant dark (&:where(.dark, .dark *));
```

### 暗色模式的 FOUC 防护

```html
<!-- 在 <head> 中插入 inline script，页面渲染前执行 -->
<script is:inline>
  (function() {
    const t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

这段脚本**必须在 `<head>` 中且使用 `is:inline`**，确保它在任何 DOM 渲染之前执行。否则用户会看到一次白色的闪烁。

### Typography 插件的精细定制

```css
@utility prose {
  --tw-prose-body: var(--color-neutral-700);
  --tw-prose-headings: var(--color-neutral-900);
  --tw-prose-code: var(--color-neutral-800);
  --tw-prose-pre-bg: var(--color-neutral-900);
}

html.dark .prose {
  --tw-prose-body: var(--color-neutral-300);
  --tw-prose-headings: var(--color-neutral-100);
}
```

## Shiki 代码高亮

Astro 内置了 Shiki，开箱即用：

```js
// astro.config.mjs
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: true,       // 长代码自动换行
    },
  },
});
```

## 性能

一个标准的 Astro 博客构建后：

- **HTML/CSS 体积**：15-40 KB（gzip 后更小）
- **JavaScript**：0 KB（除非你主动引入）
- **Lighthouse 分数**：四个 100

这不是优化出来的，是**架构设计决定的**——没有东西需要优化，因为根本没有多余的代码。

## 什么时候不用 Astro？

如果你在构建 SaaS 后台、实时协作工具、或高度交互的应用——Next.js 或 Remix 会更合适。但如果你在构建博客、文档、或任何「内容优先」的东西，Astro 是目前最好的选择。
