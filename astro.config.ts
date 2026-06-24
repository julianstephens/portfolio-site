import { unified } from "@astrojs/markdown-remark";
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const rehypeMermaidBlocks = () => {
  return (tree: any) => {
    const walk = (node: any) => {
      if (!node?.children || !Array.isArray(node.children)) return;

      for (const child of node.children) {
        if (
          child?.type === "element" &&
          child.tagName === "pre" &&
          child.children?.[0]?.tagName === "code"
        ) {
          const code = child.children[0];
          const className = code?.properties?.className;
          const isMermaid = Array.isArray(className) && className.includes("language-mermaid");

          if (isMermaid) {
            child.properties = { ...(child.properties ?? {}), className: ["mermaid"] };
            child.children = [
              {
                type: "text",
                value: (code.children ?? [])
                  .map((n: any) => (n.type === "text" ? n.value : ""))
                  .join(""),
              },
            ];
          }
        }

        walk(child);
      }
    };

    walk(tree);
  };
};

// https://astro.build/config
export default defineConfig({
  site: "https://julianstephens.net",
  integrations: [
    tailwind({ applyBaseStyles: false })
  ],
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeMermaidBlocks,
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
    }),
  },
  vite: {
    optimizeDeps: { exclude: ["url"] },
  },
});
