import type { Post } from "@/types";
import { getAllPosts, getSinglePost } from "@/utils/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import moment from "moment";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useMemo } from "react";
import { HiArrowSmallLeft, HiArrowUp } from "react-icons/hi2";

const Post = ({ code, frontmatter }: Post) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <main className="page">
      <div id="#top" className="flex items-center justify-between mb-4">
        <Link href={"/"}>
          <span className="md:hidden">
            <HiArrowSmallLeft size={20} />
          </span>
          <span className="hidden md:inline-block">
            <HiArrowSmallLeft size={25} />
          </span>
        </Link>
        <p className="m-0 text-muted">
          {moment(frontmatter.date).format("YYYY-MM-DD")}
        </p>
      </div>
      <h1 className="text-center">{frontmatter.title}</h1>
      <Component />
      <Link
        href="#top"
        className="hidden fixed right-12 bottom-12 p-2 rounded-full border border-3 border-neutral-900 md:block"
      >
        <HiArrowUp />
      </Link>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const post = await getSinglePost(params.slug);
  return {
    props: { ...post },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllPosts().map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default Post;
