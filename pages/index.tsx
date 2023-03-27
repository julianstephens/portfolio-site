import AppFooter from "@/components/Footer";
import AppHead from "@/components/Head";
import type { Post, Props } from "@/types";
import { getAllPosts } from "@/utils/mdx";
import moment from "moment";
import Link from "next/link";
import { HiDocumentArrowDown, HiEnvelope } from "react-icons/hi2";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { Tooltip } from "react-tooltip";

const Home = ({ posts }: Props) => {
  posts = posts
    .sort(
      (a, b) =>
        moment(a.frontmatter.date).unix() - moment(b.frontmatter.date).unix(),
    )
    .reverse();

  return (
    <div className="layout">
      <AppHead />
      <main className="text-lg lg:text-xl xl:text-2xl">
        <h1 className="mb-2 text-center">hi, i&apos;m julian 👋</h1>
        <p className="mt-0 text-center">---</p>
        <p className="w-full text-center">
          <span className="font-bold underline decoration-2 decoration-pink-800">
            creative developer
          </span>{" "}
          based in nyc. passionate about{" "}
          <span className="font-bold underline decoration-2 decoration-green-800">
            human-centered computing
          </span>{" "}
          and{" "}
          <span className="font-bold underline decoration-2 decoration-yellow-800">
            crafting digital experiences
          </span>{" "}
          that{" "}
          <span className="font-bold underline decoration-2 decoration-sky-800">
            add value to people&apos;s lives.
          </span>{" "}
          currently at NBCUniversal
        </p>
        <p className="mt-0 text-center">---</p>
        <div className="flex justify-center my-2 gap-4">
          <Link
            href="mailto:julian@julianstephens.net?subject=Hi from your website!"
            data-tooltip-id="email"
            data-tooltip-content="Email me"
          >
            <span className="md:hidden">
              <HiEnvelope size={20} />
            </span>
            <span className="hidden md:inline-block">
              <HiEnvelope size={25} />
            </span>
          </Link>
          <Tooltip id="email" />
          <Link
            download
            href="JulianStephens_SWE_Resume.pdf"
            target="_blank"
            data-tooltip-id="resume"
            data-tooltip-content="Dowload resumé"
          >
            <span className="md:hidden">
              <HiDocumentArrowDown size={20} />
            </span>
            <span className="hidden md:inline-block">
              <HiDocumentArrowDown size={25} />
            </span>
          </Link>
          <Tooltip id="resume" />
          <Link
            href="https://github.com/julianstephens"
            target="_blank"
            data-tooltip-id="gh"
            data-tooltip-content="View GitHub profile"
          >
            <span className="md:hidden">
              <IoLogoGithub size={20} />
            </span>
            <span className="hidden md:inline-block">
              <IoLogoGithub size={25} />
            </span>
          </Link>
          <Tooltip id="gh" />
          <Link
            href="https://linkedin.com/in/juliangstephens"
            target="_blank"
            data-tooltip-id="li"
            data-tooltip-content="View LinkedIn profile"
          >
            <span className="md:hidden">
              <IoLogoLinkedin size={20} />
            </span>
            <span className="hidden md:inline-block">
              <IoLogoLinkedin size={25} />
            </span>
          </Link>
          <Tooltip id="li" />
        </div>
        <p className="mt-0 text-center">---</p>
        <div id="recentProjects" className="mt-3">
          <h2 className="mt-0 no-underline">recent projects</h2>
          <ul>
            {posts.map((post: Post, idx: number) => {
              return (
                <li key={idx} className="lg:text-lg xl:text-xl">
                  <Link href={`posts/${post.slug}`}>
                    {post.frontmatter.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <AppFooter />
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = getAllPosts();

  return {
    props: { posts },
  };
};

export default Home;
