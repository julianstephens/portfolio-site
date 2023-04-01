import { remarkCodeHike } from "@code-hike/mdx";
import fs from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import path from "path";

import theme from "shiki/themes/github-dark-dimmed.json";
import { Post } from "./types";

export const ROOT = process.cwd();
export const POSTS_PATH = path.join(process.cwd(), "content/posts");

export const getFileContent = (filename: string) => {
  return fs.readFileSync(path.join(POSTS_PATH, filename), "utf8");
};

const getCompiledMDX = async (source: string) => {
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      ROOT,
      "node_modules",
      "esbuild",
      "esbuild.exe",
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      ROOT,
      "node_modules",
      "esbuild",
      "bin",
      "esbuild",
    );
  }

  const remarkPlugins: any[] = [
    [remarkCodeHike, { theme, lineNumbers: false }],
  ];
  const rehypePlugins: any[] = [];

  try {
    return await bundleMDX({
      source,
      mdxOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          ...remarkPlugins,
        ];
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          ...rehypePlugins,
        ];

        return options;
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSinglePost = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`);
  const post = await res.json();

  const { code, frontmatter } = await getCompiledMDX(post.content);

  return {
    frontmatter,
    code,
  };
};

export const getAllPosts = async () => {
  const res = await fetch(`http://localhost:3000/api/posts`);
  const posts = await res.json();
  return posts.map((p: Post) => {
    const { data } = matter(p.content);

    return {
      frontmatter: data,
      slug: p.slug,
    };
  });
};
