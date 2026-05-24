import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import mermaid from "astro-mermaid";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
  site: "https://julianstephens.net",
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mermaid({
      theme: 'neutral',
      autoTheme: true,
      mermaidConfig: {
        startOnLoad: false,
        logLevel: 'error',
        securityLevel: 'strict'
      }
    })
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: { light: "github-light", dark: "github-dark" },
          keepBackground: false,
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className = [...(node.properties.className || []), "line--highlighted"];
          },
        },
      ] as any,
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
      ] as any,
    ],
  },
  vite: {
    optimizeDeps: { exclude: ["url"] },
  },
});
