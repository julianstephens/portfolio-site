import { z } from "zod";

export const PostSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  date: z
    .bigint()
    .or(z.number())
    .transform((date) => Number(date)),
  content: z.string(),
  description: z.nullable(z.string()).optional(),
  tags: z.nullable(z.array(z.string())).optional(),
});

export const PostRespSchema = z.array(PostSchema);

export const PostPreviewSchema = PostSchema.omit({ tags: true, content: true });

export const PostPreviewRespSchema = z.array(PostPreviewSchema);

export type Post = z.infer<typeof PostSchema>;

export type PostResp = z.infer<typeof PostRespSchema>;

export type PostPreview = z.infer<typeof PostPreviewSchema>;

export type PostPreviewResp = z.infer<typeof PostPreviewRespSchema>;

export type MDXPost = {
  code: string;
  frontmatter: Post;
};

export type Props = {
  posts: MDXPost[];
};

export const { NEXT_API_URL: API_URL } = process.env;
