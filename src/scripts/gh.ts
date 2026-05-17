import { readFile, writeFile as writeFileSync } from "fs/promises";
import matter from "gray-matter";
import { Octokit } from "octokit";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Process items in batches to avoid rate limiting
async function batchProcess<T, R>(
  items: T[],
  batchSize: number,
  processor: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
  }
  return results;
}

type GhFrontmatter = {
  title: string;
  published: string;
  path: string;
  repoUrl: string;
  summary: string;
};

export type Response = {
  repoName: string;
  repoUrl: string;
  downloadUrl: string;
  content: string;
  description: string | null;
};

const ENV = import.meta.env ?? process.env;

if (!ENV.COOLIFY_GH_PAT || !ENV.GH_USER) {
  throw new Error("Missing required environment variables: COOLIFY_GH_PAT and GH_USER");
}

const gh = new Octokit({
  auth: ENV.COOLIFY_GH_PAT,
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

const toFMStr = (frontmatter: GhFrontmatter): string => {
  return matter.stringify("", frontmatter);
};

const getSiteFile = async (repo: string) => {
  try {
    const contents = await gh.rest.repos.getContent({
      owner: ENV.GH_USER!,
      repo: repo,
      path: "SITE.md",
    });

    if (contents.status !== 200) {
      return null;
    }

    const data = contents.data;
    // Ensure it's a file, not a directory or symlink
    if (Array.isArray(data) || data.type !== "file" || !data.content) {
      return null;
    }

    return {
      downloadUrl: data.download_url,
      content: data.content,
    };
  } catch (error) {
    // Only log if it's not a 404 (expected for repos without SITE.md)
    if (error && typeof error === "object" && "status" in error && error.status !== 404) {
      console.error(`Error fetching SITE.md from ${repo}:`, error);
    }
    return null;
  }
};

const getSiteData = async (): Promise<Response[]> => {
  // Check rate limit before making requests
  const { data: rateLimit } = await gh.rest.rateLimit.get();
  console.log(`Rate limit: ${rateLimit.rate.remaining}/${rateLimit.rate.limit} remaining`);

  const repos = await gh.paginate(gh.rest.repos.listForAuthenticatedUser, {
    per_page: 100,
  });

  console.log(`Fetching SITE.md from ${repos.length} repositories...`);

  // Batch processing: fetch SITE.md files in batches of 10 to optimize API usage
  const results = await batchProcess(repos, 10, async (repo) => {
    const file = await getSiteFile(repo.name);
    if (!file) return null;

    console.log(`✓ Found SITE.md in ${repo.name}`);
    return {
      repoName: repo.name.replaceAll("_", "-"),
      repoUrl: repo.html_url,
      downloadUrl: file.downloadUrl || "",
      content: file.content,
      description: repo.description || null,
    };
  });

  return results.filter((r): r is Response => r !== null);
};

const saveSiteFiles = async (): Promise<void> => {
  const outDir = path.join(__dirname, "..", "content", "portfolio");
  const files = await getSiteData();

  if (files.length === 0) {
    console.log("No SITE.md files found in any repositories.");
    return;
  }

  console.log(`\nProcessing ${files.length} portfolio files...`);

  // Process all files in parallel with non-fatal error handling
  const writePromises = files.map(async (f) => {
    try {
      const content = Buffer.from(f.content, "base64").toString("utf-8");

      // Extract title from first heading
      const firstLine = content.split("\n")[0];
      const title = firstLine.startsWith("#")
        ? firstLine.replace(/^#+\s*/, "").trim()
        : f.repoName;

      const frontmatter: GhFrontmatter = {
        title,
        published: new Date().toISOString().slice(0, 10),
        path: `/${f.repoName}`,
        repoUrl: f.repoUrl,
        summary: f.description || "",
      };

      const saveLoc = path.join(outDir, `${f.repoName}.md`);

      // Check if file exists and preserve published date
      try {
        const existingContent = await readFile(saveLoc, "utf-8");
        const { data } = matter(existingContent);
        if (data.published) {
          frontmatter.published = new Date(data.published).toISOString().slice(0, 10);
        }
      } catch (err) {
        // File doesn't exist, use new date
      }

      const contentWithFm = toFMStr(frontmatter) + content;
      await writeFileSync(saveLoc, contentWithFm, "utf-8");
      console.log(`✓ Saved ${f.repoName}.md`);
      return true;
    } catch (error) {
      console.error(`✗ Failed to process ${f.repoName}:`, error);
      return false;
    }
  });

  const results = await Promise.all(writePromises);
  const successCount = results.filter(r => r === true).length;
  const failCount = results.length - successCount;

  if (failCount > 0) {
    console.log(`\n⚠️  Updated ${successCount}/${files.length} files (${failCount} failed)`);
  } else {
    console.log(`\n✅ Successfully updated ${files.length} portfolio files.`);
  }
};

(async () => {
  try {
    await saveSiteFiles();
  } catch (error) {
    console.error("\n❌ Error updating portfolio files:", error);
    process.exit(1);
  }
})();
