import type { FFFBase, FFFDateTime, FFFMedia, FFFAuthor } from "fff-flavored-frontmatter";
import type { MarkdownInstance } from "astro";

declare global {
  type Frontmatter = FFFBase &
    Pick<FFFDateTime, "created" | "updated" | "published"> &
    Pick<FFFMedia, "image"> & {
      /**
       * post path.
       * @remarks auto-generated
       */
      path?: string;
      /**
       * specifies one or more post authors.
       * @remarks authors defined in siteConfig can be obtained using string as key.
       */
      authors?: (string | FFFAuthor)[];
      /**
       * the featured image for article, or image for "photo" / "multi-photo" posts.
       * @remarks currently only supports string
       */
      image?: string;
      repoUrl?: string;
    };

  type Post = MarkdownInstance<Frontmatter>;

  type Page = {
    data: Post[];
    start: number;
    end: number;
    size: number;
    total: number;
    currentPage: number;
    lastPage: number;
    url: {
      current: string;
      next?: string;
      prev?: string;
    };
  };

  namespace Config {
    type Site = {
      url: string;
      title: string;
      description?: string;
      keywords?: string[];
      authors?: {
        [id: string]: {
          /** author name. */
          name: string;
          /** author url. */
          url?: string;
          /** author avatar, not currently in use. possible future use for JSON Feed. */
          avatar?: string;
          /** whether this author is added to the article by default. */
          default?: boolean;
        };
      };
      lang?: string;
      stylesheets?: string[];
      scripts?: {
        src: string;
        type: string;
        async: boolean;
        defer: boolean;
      }[];
    };

    type Page = {
      paginationDir?: "ltr" | "rtl";
      pageSize?: number;
      preview?: {
        content?: boolean;
        link?: boolean;
      };
    };

    type Nav =
      | {
          text: string;
          link: string;
        }[]
      | [];

    type RSS = {
      limit?: number;
      customData?: string;
      stylesheet?: string;
      xmlns?: { [key: string]: string };
    };

    type Date = {
      locales: string;
      options: Intl.DateTimeFormatOptions;
    };
  }
}
