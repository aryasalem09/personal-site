export interface BlogPostEntry {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  body: string[];
}

export const blogPosts: BlogPostEntry[] = [];
