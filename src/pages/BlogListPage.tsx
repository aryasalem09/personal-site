import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { blogPosts } from "@/content/blog";

export default function BlogListPage() {
  return (
    <section className="site-container py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="kicker">Blog</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
          Field notes.
        </h1>
        <p className="mt-5 text-pretty leading-7 text-muted-foreground md:text-lg">
          Occasional writing about the things I'm building and learning.
        </p>
      </div>

      {blogPosts.length === 0 ? (
        <div className="mt-10 max-w-2xl rounded-lg border border-dashed border-border bg-card/50 p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">status: drafting</p>
          <p className="mt-3 leading-7 text-muted-foreground">
            Nothing published yet. The first post lands when it's actually worth reading.
          </p>
        </div>
      ) : (
        <div className="mt-12 max-w-2xl">
          {blogPosts.map((post) => (
            <article key={post.slug} className="border-b border-border/70 py-8 first:pt-0 last:border-b-0">
              <p className="kicker">{post.publishedAt}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                <Link
                  to={`/blog/${post.slug}`}
                  className="rounded-sm outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 rounded-sm font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Read
                <ArrowRight className="size-3.5" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
