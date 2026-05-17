/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0a0a0a", // Pure neutral dark background
          surface: "#1a1a1a", // Slightly lighter surface
          border: "#2a2a2a", // Border color
          text: "#e5e5e5", // Main text
          "text-muted": "#a3a3a3", // Muted text
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray[800]"),
            "--tw-prose-headings": theme("colors.gray[900]"),
            "--tw-prose-links": "#059669",
            "--tw-prose-code": theme("colors.gray[900]"),
            "--tw-prose-pre-bg": theme("colors.gray[50]"),
            "--tw-prose-pre-code": theme("colors.gray[800]"),
            fontSize: "1.125rem",
            lineHeight: "1.75",
            maxWidth: "75ch",
            h1: {
              fontSize: "2.25rem",
              fontWeight: "700",
              lineHeight: "1.2",
              marginTop: "0",
              marginBottom: "0.875em",
            },
            h2: {
              fontSize: "1.875rem",
              fontWeight: "600",
              lineHeight: "1.3",
              marginTop: "2em",
              marginBottom: "0.75em",
            },
            h3: {
              fontSize: "1.5rem",
              fontWeight: "600",
              lineHeight: "1.4",
              marginTop: "1.6em",
              marginBottom: "0.6em",
            },
            p: {
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },
            a: {
              fontWeight: "500",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              "&:hover": {
                textDecoration: "none",
              },
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            code: {
              fontWeight: "500",
              backgroundColor: theme("colors.gray[100]"),
              padding: "0.125rem 0.375rem",
              borderRadius: "0.25rem",
              fontSize: "0.875em",
            },
            pre: {
              backgroundColor: "transparent",
              padding: "0",
              margin: "0",
              code: {
                backgroundColor: "transparent",
                padding: "0",
                fontSize: "0.875rem",
              },
            },
          },
        },
        dark: {
          css: {
            "--tw-prose-body": "#d4d4d4",
            "--tw-prose-headings": "#f5f5f5",
            "--tw-prose-links": "#34d399",
            "--tw-prose-code": "#f5f5f5",
            "--tw-prose-pre-bg": "#1a1a1a",
            "--tw-prose-pre-code": "#e5e5e5",
            code: {
              backgroundColor: "#1a1a1a",
            },
          },
        },
      }),
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", '"SF Mono"', "Consolas", '"Liberation Mono"', "Menlo", "monospace"],
      },
      screens: {
        xs: "320px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1920px",
      },
      maxWidth: {
        reading: "75ch",
        "content-sm": "640px",
        "content-md": "768px",
        "content-lg": "896px",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
