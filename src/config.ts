const NAME = "Julian Stephens";
export const site: Config.Site = {
  url: import.meta.env.PUBLIC_BASE_URL,
  title: NAME,
  description: "Developer @ NBCUniversal",
  keywords: ["development", "fullstack", "programming"],
  authors: {
    default: {
      name: NAME,
      url: import.meta.env.BASE_URL,
      default: true,
    },
    // default2: {
    //   name: NAME,
    //   url: import.meta.env.BASE_URL,
    //   default: true,
    // },
  },
  lang: "en",
  stylesheets: [],
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

export const about: Config.About = {
  bio: "I'm a Cyber Systems Engineer at NBCUniversal with a passion for human-centered computing. I enjoy working across the full stack, from low-level systems to web applications, and I'm especially interested in developer tooling, security, and automation.",
  photo: "/avatar.jpg",
  links: {
    github: "https://github.com/julianstephens",
    linkedin: "https://linkedin.com/in/juliangstephens",
    resume: "/resume.pdf",
  },
};
