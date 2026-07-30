import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod/v4';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { posts };
