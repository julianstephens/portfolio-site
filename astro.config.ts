import { defineConfig } from "astro/config";

import { Portfolio } from "./src/scripts/vite";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
  site: "https://julianstephens.net",
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypePrettyCode, { theme: { light: "github-light", dark: "github-dark" } }],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content: {
            type: "element",
            tagName: "span",
            properties: { className: ["anchor-link"] },
            children: [{ type: "text", value: "#" }],
          },
        },
      ],
    ],
  },
  vite: {
    optimizeDeps: { exclude: ["url"] },
    plugins: [Portfolio()],
  },
});
