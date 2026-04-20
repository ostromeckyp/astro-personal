import { defineCollection} from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  // type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    image: z.url(),
    category: z.string(),
    slug: z.string(),
  }),
});

export const collections = {
  blog,
};
