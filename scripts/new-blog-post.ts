import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

import { generateBlogPages } from "./generate-blog-pages.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const POSTS_DIRECTORY = path.join(ROOT, "src", "content", "blog");
const ASSETS_DIRECTORY = path.join(ROOT, "public", "blog");

export function slugify(title: string) {
  const slug = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!slug) throw new Error("Title must contain at least one letter or number.");
  return slug;
}

function yamlString(value: string) {
  return JSON.stringify(value);
}

function localDate() {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
}

export async function createBlogPost(title: string, date = localDate()) {
  if (!title.trim()) throw new Error("Provide a post title.");
  const slug = slugify(title);
  const sourcePath = path.join(POSTS_DIRECTORY, `${slug}.md`);
  const assetPath = path.join(ASSETS_DIRECTORY, slug);
  if (existsSync(sourcePath) || existsSync(assetPath)) {
    throw new Error(`Refusing to overwrite existing blog post or asset directory for ${slug}.`);
  }

  await fs.mkdir(POSTS_DIRECTORY, { recursive: true });
  await fs.mkdir(ASSETS_DIRECTORY, { recursive: true });
  await fs.mkdir(assetPath, { recursive: false });
  const source = `---
title: ${yamlString(title.trim())}
description: "Replace this concise summary before publishing."
published: "${date}"
draft: true
tags: []
# cover: cover.webp
# coverAlt: "Describe what is visible in the cover image."
# coverCaption: "Optional visible cover caption."
---

Start writing here.

<!-- Images go in public/blog/${slug}/. Add one with ![Description](diagram.webp "Optional visible caption"). Keep draft: true until this post is ready to publish. -->
`;
  await fs.writeFile(sourcePath, source, "utf8");
  await generateBlogPages({ includeDrafts: true });
  return { slug, sourcePath, assetPath };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  const title = process.argv.slice(2).join(" ").trim();
  const post = await createBlogPost(title);
  console.log(`Created ${post.sourcePath}`);
  console.log(`Images go in ${post.assetPath}`);
  console.log(`Preview at http://localhost:5173/blog/${post.slug} after running npm run dev.`);
}
