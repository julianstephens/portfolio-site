import { readFile, writeFileSync } from "fs";
import * as matter from "gray-matter";
import { Octokit } from "octokit";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export type Response = {
  repoName: string;
  repoUrl: string;
  downloadUrl: string;
  content: string;
  description: string;
};

const ENV = import.meta.env ?? process.env;

const gh = new Octokit({
  auth: ENV.GH_PAT,
});

const toFMStr = (frontmatter: Frontmatter) => {
  let fmStr = "---\n";
  Object.entries(frontmatter).forEach(([k, v]) => {
    fmStr += `${k}: ${v}\n`;
  });
  fmStr += "---\n\n";

  return fmStr;
};

const getSiteFile = async (repo: string) => {
  try {
    const contents = await gh.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: ENV.GH_USER,
      repo: repo,
      path: "SITE.md",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (contents.status != 200) {
      return null;
    }

    return contents.data;
  } catch {
    return null;
  }
};

const getSiteData = async () => {
  const repos = await gh.paginate(gh.rest.repos.listForAuthenticatedUser, {
    per_page: 100,
  });

  console.debug("total repos: ", repos.length);

  const siteFiles: Response[] = [];

  for await (const r of repos) {
    const f = await getSiteFile(r.name);
    if (f) {
      console.debug("found SITE.md in repo: ", r.name);
      const res: Response = {
        repoName: r.name.replaceAll("_", "-"),
        repoUrl: r.html_url,
        downloadUrl: f["download_url"],
        content: f["content"],
        description: r.description,
      };
      siteFiles.push(res);
    }
  }

  return siteFiles;
};

const saveSiteFiles = async () => {
  const outDir = path.join(__dirname, "..", "..", "portfolio");
  const files = await getSiteData();
  for (const f of files) {
    const content = Buffer.from(f.content, "base64").toString("utf-8");
    const title = content.split("\n")[0].slice(2);
    const frontmatter: Frontmatter = {
      title,
      published: new Date().toISOString().slice(0, 10),
      path: `/${f.repoName}`,
      repoUrl: f.repoUrl,
      summary: f["description"],
    };

    const saveLoc = path.join(outDir, f.repoName + ".md");

    // update or create new post with frontmatter & post content
    // if existing, prefer saved published date
    readFile(saveLoc, (err, contents) => {
      if (!err) {
        // @ts-ignore
        const { data } = matter.default(contents.toString());
        frontmatter.published = new Date((data as Frontmatter).published).toISOString().slice(0, 10);
      }

      const contentWithFm = toFMStr(frontmatter) + content;
      writeFileSync(saveLoc, contentWithFm, { flag: "w" });
    });
  }
  console.log("files updated: ", files.length);
};

(async () => {
  await saveSiteFiles();
})();
