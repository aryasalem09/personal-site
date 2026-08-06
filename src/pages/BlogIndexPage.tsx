import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { blogPosts } from "@/content/blog";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export default function BlogIndexPage() {
  return (
    <section className="site-container py-20 md:py-28">
      <div className="max-w-3xl border-t border-border pt-5">
        <p className="kicker">Notebook / writing</p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-6xl">My Blog!</h1>
        <p className="mt-5 text-pretty leading-7 text-muted-foreground md:text-lg">Anything random I feel like reviewing, talking about.</p>
      </div>

      {blogPosts.length ? (
        <ul className="mt-12 border-t border-border">
          {blogPosts.map((post) => (
            <li key={post.slug} className="border-b border-border">
              <Link to={`/blog/${post.slug}`} className="group grid gap-4 py-6 outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[9rem_1fr_auto] sm:items-start sm:gap-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  <time dateTime={post.published}>{formatDate(post.published)}</time>
                  <span className="mt-1 block">{post.readingTimeMinutes} min read</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold leading-6 tracking-[-0.02em] sm:text-2xl">{post.title}</h2>
                  <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">{post.description}</p>
                  {post.tags?.length ? <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1">{post.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}</p> : null}
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 border-y border-border py-10 text-muted-foreground">
          <p className="text-lg font-medium text-foreground">Nothing published yet.</p>
          <p className="mt-2 max-w-lg leading-7">New posts will appear here when they are ready to share.</p>
        </div>
      )}
    </section>
  );
}
