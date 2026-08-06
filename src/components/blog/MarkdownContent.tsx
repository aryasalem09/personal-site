import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  content: string;
  slug: string;
};

function resolveImageSource(source: string, slug: string) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(source)) return source;
  const segments = source.replace(/^\.\//, "").split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) return undefined;
  return `/blog/${encodeURIComponent(slug)}/${segments.map(encodeURIComponent).join("/")}`;
}

function isExternalHref(href: string) {
  return /^(?:https?:)?\/\//i.test(href);
}

/** Render post Markdown without enabling raw HTML from content files. */
export default function MarkdownContent({ content, slug }: MarkdownContentProps) {
  return (
    <div className="blog-prose max-w-none text-[1.0625rem] leading-8 text-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href = "", children }) => (
            <a
              href={href}
              {...(isExternalHref(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="quiet-link text-signal"
            >
              {children}
              {isExternalHref(href) ? <span className="sr-only"> (opens in a new tab)</span> : null}
            </a>
          ),
          img: ({ src, alt, title }) => {
            const caption = title?.trim();

            return (
              <figure className="my-8">
                <img
                  src={src ? resolveImageSource(src, slug) : undefined}
                  alt={alt || ""}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full border border-border bg-muted object-cover"
                />
                {caption ? <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">{caption}</figcaption> : null}
              </figure>
            );
          },
          h2: ({ children }) => <h2 className="mt-12 text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl">{children}</h2>,
          h3: ({ children }) => <h3 className="mt-9 text-xl font-semibold tracking-[-0.02em]">{children}</h3>,
          p: ({ children, node }) => (
            node?.children.length === 1 && node.children[0].type === "element" && node.children[0].tagName === "img"
              ? <>{children}</>
              : <p className="mt-6 text-pretty">{children}</p>
          ),
          ul: ({ children }) => <ul className="mt-6 list-disc space-y-2 pl-6 marker:text-muted-foreground">{children}</ul>,
          ol: ({ children }) => <ol className="mt-6 list-decimal space-y-2 pl-6 marker:text-muted-foreground">{children}</ol>,
          blockquote: ({ children }) => <blockquote className="my-8 border-l-2 border-signal pl-5 text-xl leading-8 text-muted-foreground">{children}</blockquote>,
          pre: ({ children }) => <pre className="my-7 overflow-x-auto border border-border bg-muted p-4 font-mono text-sm leading-6">{children}</pre>,
          code: ({ children, className }) => <code className={`${className ?? ""} font-mono text-[0.9em]`}>{children}</code>,
          hr: () => <hr className="my-10 border-border" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
