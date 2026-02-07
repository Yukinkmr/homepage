import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    lang: z.enum(['ja', 'en']),
    tags: z.array(z.string()).default([]),
    description: z.string(),
  }),
});

export const collections = { blog };
