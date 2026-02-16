import { Link } from "react-router-dom";
import { blogPosts } from "@/content/blog";

export default function BlogListPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="slide-inner max-w-4xl">
        <p className="kicker">Blog</p>
        <h1 className="mt-4 max-w-[18ch] text-5xl font-semibold leading-[1.02] text-slate-100 md:text-6xl lg:text-7xl">Writing Archive</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-200/74 md:text-xl lg:text-2xl">
          <code>src/content/blog.ts</code>.
        </p>

        {blogPosts.length === 0 ? (
          <p className="note">
            No blog posts yet :(.
          </p>
        ) : (
          <div className="mt-12 space-y-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="border-b border-white/10 pb-8">
                <p className="kicker">{post.publishedAt}</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-100 md:text-4xl lg:text-5xl">{post.title}</h2>
                <p className="mt-3 max-w-3xl text-lg text-slate-200/74">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="soft-link mt-4 inline-flex text-base">
                  Read article
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
