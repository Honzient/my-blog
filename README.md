# ~/blog

一个基于 [Astro](https://astro.build) 的极简个人博客，支持中英双语、深色模式、全文搜索与 RSS 订阅。

## 技术栈

- **Astro 7** — 静态站点生成，默认零客户端 JavaScript
- **Tailwind CSS 4** — 原子化样式与设计令牌（`@theme`）
- **Shiki** — 代码高亮 + 自定义复制/语言标签栏
- **@astrojs/sitemap / @astrojs/rss** — SEO 与订阅支持

## 快速开始

```bash
npm install
npm run dev      # 本地开发
npm run build    # 类型检查 + 生产构建（输出到 dist/）
npm run preview  # 预览生产构建
```

## 目录结构

```
src/
├── components/     # 可复用组件（导航、搜索、目录、代码块等）
├── content/posts/  # Markdown 文章（frontmatter 见 src/content.config.ts）
├── i18n/ui.ts      # 中英双语 UI 文案（单一数据源）
├── layouts/        # BaseLayout（SEO head、主题、页头页脚）
├── lib/            # 日期格式化、搜索逻辑等工具
├── pages/          # 路由（zh 根路径 + en/ 前缀）
├── site.config.ts  # 站点元信息（标题、作者、域名）
└── styles/global.css
public/             # favicon.svg、robots.txt
```

## 国际化

- 中文站为根路径（`/`），英文站统一加 `/en` 前缀。
- 所有界面文案集中在 `src/i18n/ui.ts`，通过 `t(locale, key)` 读取。
- 日期格式化统一走 `src/lib/date.ts`（zh：`2026年7月1日`，en：`July 1, 2026`）。
- 文章内容共享同一份 Markdown（中英双语正文请写在同文件中，由模板统一渲染）。

## 部署前配置

- `src/site.config.ts`：替换 `author` 与 `url`（当前为占位值 `https://example.com`）。
- `public/robots.txt`：同步替换 Sitemap 域名。
- `astro.config.mjs` 中的站点地址会自动读取 `SITE.url`。

## 主要功能

- 搜索：主页内联搜索（窄屏）+ 固定侧栏搜索（超宽屏），支持关键词、标签、年份筛选。
- 文章页：阅读进度条、目录（滚动高亮）、复制链接、代码复制、图片灯箱、上一篇/下一篇。
- 可访问性：跳转正文链接、键盘可操作下拉菜单、Esc 关闭灯箱、动态主题按钮标签。