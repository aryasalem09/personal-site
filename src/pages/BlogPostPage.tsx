import { Link, useParams } from "react-router-dom";
import { blogPosts } from "@/content/blog";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return (
      <section className="py-16 md:py-20">
        <div className="slide-inner max-w-4xl">
          <p className="kicker">Missing Entry</p>
          <h1 className="mt-4 max-w-[18ch] text-4xl font-semibold leading-tight text-slate-100 md:text-5xl lg:text-6xl">Blog post not found</h1>
          <p className="note">
            This slug does not exist yet. Add entries in <code>src/content/blog.ts</code>.
          </p>
          <Link to="/blog" className="soft-link mt-8 inline-flex text-base">
            Back to blog list
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20">
      <div className="slide-inner max-w-4xl">
        <p className="kicker">{post.publishedAt}</p>
        <h1 className="mt-4 max-w-[18ch] text-5xl font-semibold leading-[1.02] text-slate-100 md:text-6xl lg:text-7xl">{post.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200/74 md:text-xl lg:text-2xl">{post.excerpt}</p>

        <div className="note mt-10 space-y-5 text-base leading-relaxed md:text-lg">
          {post.body.map((paragraph) => (
            <p key={`${post.slug}-${paragraph.slice(0, 18)}`}>{paragraph}</p>
          ))}
        </div>

        <Link to="/blog" className="soft-link mt-8 inline-flex text-base">
          Back to blog
        </Link>
      </div>
    </section>
  );
}
