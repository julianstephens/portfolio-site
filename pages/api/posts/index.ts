import { PostPreviewRespSchema, PostRespSchema } from "@/utils/types";
import createClient from "edgedb";
import { NextApiRequest, NextApiResponse } from "next";

export const client = createClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.preview) {
    const posts = await client.query(`
      select Post {
        id,
        slug,
        title,
        date,
        description
      };`);
    const parsedPosts = PostPreviewRespSchema.parse(posts);
    res.status(200).json(parsedPosts);
  }

  const posts = await client.query(`
    select Post {
      id,
      slug,
      title,
      date,
      description,
      content
    };`);
  const parsedPosts = PostRespSchema.parse(posts);

  res.status(200).json(parsedPosts);
};

export default handler;
