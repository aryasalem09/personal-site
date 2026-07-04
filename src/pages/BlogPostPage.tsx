import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { blogPosts } from "@/content/blog";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return (
      <section className="site-container py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="kicker">404</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
            No post here.
          </h1>
          <p className="mt-5 leading-7 text-muted-foreground">
            That link doesn't match anything published. It may have moved, or it never existed.
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="size-3.5" />
            Back to the blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="site-container py-16 md:py-24">
      <article className="max-w-2xl">
        <p className="kicker">{post.publishedAt}</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">{post.excerpt}</p>

        <div className="mt-10 space-y-5 leading-8">
          {post.body.map((paragraph) => (
            <p key={`${post.slug}-${paragraph.slice(0, 18)}`}>{paragraph}</p>
          ))}
        </div>

        <Link
          to="/blog"
          className="mt-10 inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="size-3.5" />
          Back to the blog
        </Link>
      </article>
    </section>
  );
}
