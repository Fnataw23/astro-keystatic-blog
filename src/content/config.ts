import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['construction', 'renovation', 'plumbing', 'electrical', 'design']),
    coverImage: z.string().optional(),
    videoUrl: z.string().optional(),
    videoFile: z.string().optional(),
  }),
});

export const collections = { posts };
