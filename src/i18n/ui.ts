// UI translation dictionaries — EN / ZH
// Usage: LANG.ui[locale]['nav.home']
// Blog post content translations live in content collections, not here.

export const LANG = {
  ui: {
    en: {
      'site.title': '~/blog',
      'site.description':
        'Personal blog — thoughts on technology, design, and building things.',

      'nav.home': 'Home',
      'nav.writing': 'Writing',
      'nav.all_posts': 'All Posts',
      'nav.rss_feed': 'RSS Feed',
      'nav.about': 'About',
      'nav.rss': 'RSS',

      'home.greeting': "Hey, I'm",
      'home.bio':
        'I write about software engineering, frontend architecture, and the craft of building elegant things on the web. This is my corner of the internet — a quiet place for long-form thinking.',
      'home.writing': 'Writing',
      'home.empty': 'No posts yet. Check back soon.',

      'post.back': 'Back',
      'post.back_home': 'Back to home',
      'post.read': 'Read',

      'about.title': 'About',
      'about.intro':
        'Hi, I\'m <strong class="text-neutral-900 dark:text-neutral-100">[Your Name]</strong> — a software engineer who cares deeply about craft, clarity, and the spaces between the pixels.',
      'about.heading_blog': 'This Blog',
      'about.blog_text':
        'This is my quiet corner of the internet. No algorithms, no engagement metrics, no comments — just long-form writing about the things I find interesting. I write about frontend architecture, developer tooling, design philosophy, and whatever else refuses to fit into a tweet.',
      'about.heading_colophon': 'Colophon',
      'about.colophon_text':
        'Built with <a href="https://astro.build">Astro</a>, styled with TailwindCSS, and set in Inter & Noto Sans SC. Zero client-side JavaScript by default. The source code is available on <a href="https://github.com">GitHub</a>.',
      'about.heading_contact': 'Contact',
      'about.contact_text':
        'The best way to reach me is via <a href="https://github.com">GitHub</a> or <a href="/rss.xml">RSS</a>. I don\'t use social media much, but you might find me lurking on the quiet parts of the internet.',

      'footer.crafted': 'crafted with care',
      'footer.top': '↑ top',

      'archive.title': 'Archive',
      'archive.heading': 'All Posts',
      'tags.title': 'Posts tagged',
      'tags.empty': 'No posts with this tag yet.',
      'tags.all': 'All Tags',

      'toc.heading': 'On this page',
      'readtime.min': 'min read',

      'copy.link': 'Copy link',
      'copy.copied': 'Copied!',
      'copy.code': 'Copy code',

      'search.title': 'Search',
      'search.tags': 'Tags',
      'search.date': 'By Year',
      'search.clear': 'Clear',
      'search.filters': 'Filters',
      'search.all': 'All',
      'search.no_results': 'No posts found.',

      'newsletter.title': 'Subscribe',
      'newsletter.text': 'Get new posts delivered to your inbox. No spam, ever.',
      'newsletter.placeholder': 'your@email.com',
      'newsletter.button': 'Subscribe',

      '404.title': 'Page not found',
      '404.text': 'The page you\'re looking for doesn\'t exist or has been moved.',
      '404.back': 'Back to home',

      'theme.light': 'Light',
      'theme.dark': 'Dark',
    },

    zh: {
      'site.title': '~/blog',
      'site.description': '个人博客 — 关于技术、设计与创造的思考。',

      'nav.home': '首页',
      'nav.writing': '文章',
      'nav.all_posts': '全部文章',
      'nav.rss_feed': 'RSS 订阅',
      'nav.about': '关于',
      'nav.rss': 'RSS',

      'home.greeting': '你好，我是',
      'home.bio':
        '我写关于软件工程、前端架构，以及在 Web 上构建优雅之物的技艺。这里是互联网的一隅 — 一个安静的长文思考空间。',
      'home.writing': '文章',
      'home.empty': '暂无文章，敬请期待。',

      'post.back': '返回',
      'post.back_home': '返回首页',
      'post.read': '阅读',

      'about.title': '关于',
      'about.intro':
        '你好，我是 <strong class="text-neutral-900 dark:text-neutral-100">[Your Name]</strong> — 一名关注技艺、清晰度与像素之间空间的软件工程师。',
      'about.heading_blog': '关于本站',
      'about.blog_text':
        '这是我在互联网上的安静角落。没有算法，没有互动指标，没有评论区 — 只有关于我感兴趣的事物的长文写作。我写前端架构、开发者工具、设计哲学，以及任何不适合塞进一条推文的内容。',
      'about.heading_colophon': '技术栈',
      'about.colophon_text':
        '使用 <a href="https://astro.build">Astro</a> 构建，TailwindCSS 样式，字体为 Inter 与 Noto Sans SC。默认零客户端 JavaScript。源代码托管在 <a href="https://github.com">GitHub</a>。',
      'about.heading_contact': '联系',
      'about.contact_text':
        '联系我的最佳方式是通过 <a href="https://github.com">GitHub</a> 或 <a href="/rss.xml">RSS</a>。我不太用社交媒体，但你可能会在互联网安静的角落找到我。',

      'footer.crafted': '精心打造',
      'footer.top': '↑ 顶部',

      'archive.title': '归档',
      'archive.heading': '全部文章',
      'tags.title': '标签',
      'tags.empty': '暂无此标签的文章。',
      'tags.all': '全部标签',

      'toc.heading': '目录',
      'readtime.min': '分钟阅读',

      'copy.link': '复制链接',
      'copy.copied': '已复制！',
      'copy.code': '复制代码',

      'search.title': '搜索',
      'search.tags': '标签',
      'search.date': '按年份',
      'search.clear': '清除',
      'search.filters': '筛选',
      'search.all': '全部',
      'search.no_results': '未找到匹配文章。',

      'newsletter.title': '订阅',
      'newsletter.text': '新文章直接发送到你的邮箱，不打扰。',
      'newsletter.placeholder': '你的邮箱',
      'newsletter.button': '订阅',

      '404.title': '页面不存在',
      '404.text': '你访问的页面不存在或已被移动。',
      '404.back': '返回首页',

      'theme.light': '浅色',
      'theme.dark': '深色',
    },
  },
} as const;

export type Locale = keyof typeof LANG.ui;
export type UIKey = keyof typeof LANG.ui.en;

/** Get a UI string for the given locale, with fallback to English. */
export function t(locale: Locale, key: UIKey): string {
  return LANG.ui[locale]?.[key] ?? LANG.ui.en[key] ?? key;
}
