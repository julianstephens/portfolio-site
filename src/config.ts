const NAME = "Julian Stephens";
export const site: Config.Site = {
  url: import.meta.env.PUBLIC_BASE_URL,
  title: NAME,
  description: "Fullstack developer @ NBCUniversal",
  keywords: ["development", "fullstack", "programming"],
  authors: {
    default: {
      name: NAME,
      url: import.meta.env.BASE_URL,
      default: true,
      // },
      // default2: {
      //   name: 'Jane Doe',
      //   url: import.meta.env.SITE,
      //   default: true
    },
  },
  lang: "en",
  stylesheets: [
    "https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css", // new.css
    // "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css", // water.css
    // "https://unpkg.com/sakura.css/css/sakura.css", // sakura.css
    // "https://unpkg.com/@picocss/pico@latest/css/pico.classless.min.css", // pico.css
    // "https://unpkg.com/bamboo.css", // bamboo.css
    // "https://cdn.jsdelivr.net/npm/holiday.css@0.9.8", // holiday.css
    // "https://cdn.simplecss.org/simple.min.css", // simple.css
    // "https://unpkg.com/mvp.css", // mvp.css
  ],
};

export const page: Config.Page = {
  pageSize: 15,
};

export const date: Config.Date = {
  locales: "en-US",
  options: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
};

export const typeOfPost = (frontmatter: Frontmatter): string =>
  frontmatter.title ? "article" : frontmatter.image ? "photo" : "note";
