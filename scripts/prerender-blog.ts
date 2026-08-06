import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { getBlogPosts, sitemapXml } from "./generate-blog-pages.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST_DIRECTORY = path.join(ROOT, "dist");

type ServerEntry = { render(url: string): string };

function replaceEmptyRoot(document: string, markup: string, target: string) {
  const emptyRoot = '<div id="root"></div>';
  if (!document.includes(emptyRoot)) {
    throw new Error(`${target}: expected an empty #root element before prerendering`);
  }
  return document.replace(emptyRoot, `<div id="root">${markup}</div>`);
}

async function prerenderRoute(entry: ServerEntry, route: string) {
  const target = path.join(DIST_DIRECTORY, route.slice(1), "index.html");
  if (!existsSync(target)) throw new Error(`Missing generated HTML wrapper: ${target}`);
  const document = await fs.readFile(target, "utf8");
  await fs.writeFile(target, replaceEmptyRoot(document, entry.render(route), target), "utf8");
}

export async function prerenderBlog() {
  const entryPath = path.join(ROOT, "dist-ssr", "entry-server.js");
  if (!existsSync(entryPath)) throw new Error(`Missing SSR entry: ${entryPath}`);
  const entry = (await import(pathToFileURL(entryPath).href)) as ServerEntry;
  const posts = (await getBlogPosts()).filter((post) => !post.draft);
  await prerenderRoute(entry, "/blog");
  for (const post of posts) await prerenderRoute(entry, `/blog/${post.slug}`);
  await fs.writeFile(path.join(DIST_DIRECTORY, "sitemap.xml"), sitemapXml(posts), "utf8");
  return posts;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  const posts = await prerenderBlog();
  console.log(`Prerendered /blog and ${posts.length} published post route(s).`);
}
