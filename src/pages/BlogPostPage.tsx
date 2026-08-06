import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import MarkdownContent from "@/components/blog/MarkdownContent";
import { findBlogPost } from "@/content/blog";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = findBlogPost(slug);

  if (!post) {
    return (
      <section className="site-container py-20 md:py-28">
        <div className="max-w-2xl border-t border-border pt-5">
          <p className="kicker">404 / blog</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">This note isn&apos;t here.</h1>
          <p className="mt-5 leading-7 text-muted-foreground">It may have moved, or the link may be incomplete.</p>
          <Link to="/blog" className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-3.5" /> Back to writing
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="site-container py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-3.5" /> All writing
        </Link>

        <header className="mt-10 border-t border-border pt-5">
          <p className="kicker">{post.draft ? "Draft / preview" : "Notebook"}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.04em] md:text-6xl">{post.title}</h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">{post.description}</p>
          <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <time dateTime={post.published}>Published {formatDate(post.published)}</time>
            {post.updated ? <time dateTime={post.updated}>Updated {formatDate(post.updated)}</time> : null}
            <span>{post.readingTimeMinutes} min read</span>
            {post.draft ? <span className="text-ember">Draft</span> : null}
          </div>
          {post.tags?.length ? <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1">{post.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}</p> : null}
        </header>

        {post.cover ? (
          <figure className="mt-10">
            <img src={`/blog/${encodeURIComponent(post.slug)}/${post.cover.replace(/^\.\//, "")}`} alt={post.coverAlt || ""} decoding="async" className="aspect-[3/2] h-auto w-full border border-border bg-muted object-cover" />
            {post.coverCaption ? <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">{post.coverCaption}</figcaption> : null}
          </figure>
        ) : null}
        <div className="mt-10 border-t border-border pt-2"><MarkdownContent content={post.body} slug={post.slug} /></div>
      </div>
    </article>
  );
}
