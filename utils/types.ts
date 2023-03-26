export type Post = {
  code: string;
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string;
    description?: string;
  };
};

export type Props = {
  posts: Post[];
};
