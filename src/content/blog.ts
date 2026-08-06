import { generatedBlogPosts } from "@/content/blog.generated";
import type { BlogPost } from "@/content/blog-schema";

// The predev/prebuild step writes this manifest with drafts in local development
// and published posts only for production, so draft bodies never enter a release bundle.
export const blogPosts: BlogPost[] = ([...generatedBlogPosts] as BlogPost[]).sort(
  (a, b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug),
);

export function findBlogPost(slug: string | undefined) {
  return blogPosts.find((post) => post.slug === slug);
}
