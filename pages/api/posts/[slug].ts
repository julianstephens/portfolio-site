import client from "@/utils/edb";
import { PostSchema } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  const post = await client.query(`
    select Post {
      id,
      slug,
      title,
      date,
      description,
      content
    }
    filter Post.slug = '${slug}';
  `);
  const parsedPost = PostSchema.parse(post[0]);

  res.status(200).send(parsedPost);
};

export default handler;
