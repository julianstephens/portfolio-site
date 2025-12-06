import { defineCollection, z } from "astro:content";

const portfolio = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    published: z.coerce.date(),
    created: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    path: z.string().optional(),
    repoUrl: z.string().url().optional(),
    summary: z.string().optional(),
    image: z.string().optional(),
    flags: z.array(z.string()).optional(),
  }),
});

export const collections = { portfolio };
