import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: '~/blog',
    description: 'Personal blog — thoughts on technology, design, and building things.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/posts/${post.id}/`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
