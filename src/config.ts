import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/blog' }),
  // type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    image: z.string().url(),
    category: z.string(),
    slug: z.string(),
  }),
});

export const collections = {
  blog,
};
