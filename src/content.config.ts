import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
  schema: z.object({
    title: z.string(),
    published: z.coerce.date(),
    created: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    path: z.string().optional(),
    repoUrl: z.string().url().optional(),
    summary: z.string().optional(),
    image: z.string().optional(),
    complete: z.boolean().optional(),
    deployUrl: z.string().url().optional(),
    flags: z.array(z.string()).optional(),
  }),
});

export const collections = { portfolio };
