import { writeFileSync } from "fs";
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
  const repos = await gh.request("GET /users/{username}/repos", {
    username: ENV.GH_USER,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const siteFiles: Response[] = [];

  for (const r of repos.data) {
    const f = await getSiteFile(r.name);
    if (f) {
      const res: Response = {
        repoName: r.name.replaceAll("_", "-"),
        repoUrl: r.url,
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

    let fmStr = "---\n";
    Object.entries(frontmatter).forEach(([k, v]) => {
      fmStr += `${k}: ${v}\n`;
    });
    fmStr += "---\n\n";
    const contentWithFm = fmStr + content;

    const saveLoc = path.join(outDir, f.repoName + ".md");

    try {
      writeFileSync(saveLoc, contentWithFm, { flag: "w" });
    } catch {
      continue;
    }
  }
};

(async () => {
  await saveSiteFiles();
})();
