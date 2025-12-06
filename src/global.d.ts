declare global {
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

export {};
