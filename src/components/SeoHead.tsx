import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { findBlogPost } from "@/content/blog";

const SITE_ORIGIN = "https://aryasalem.dev";
const INDEX_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

type RouteMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  indexable: boolean;
  kind: "home" | "projects" | "blog" | "post" | "not-found";
  image?: string;
  imageAlt?: string;
  published?: string;
  updated?: string;
  tags?: string[];
};

function postAssetUrl(slug: string, asset: string) {
  const cleanAsset = asset.replace(/^\.\//, "").split("/").map(encodeURIComponent).join("/");
  return `${SITE_ORIGIN}/blog/${encodeURIComponent(slug)}/${cleanAsset}`;
}

function getRouteMetadata(pathname: string): RouteMetadata {
  if (pathname === "/") {
    return {
      title: "Arya Salem — software, science, and string quartets",
      description:
        "Arya Salem is a high-school senior exploring biology, chemistry, neuroscience, and software through websites, data projects, simulations, and music.",
      canonicalUrl: `${SITE_ORIGIN}/`,
      indexable: true,
      kind: "home",
    };
  }

  if (pathname === "/projects") {
    return {
      title: "Projects — Arya Salem",
      description: "Selected software, research, data visualization, and simulation projects by Arya Salem.",
      canonicalUrl: `${SITE_ORIGIN}/projects`,
      indexable: true,
      kind: "projects",
    };
  }

  if (pathname === "/blog") {
    return {
      title: "Blog — Arya Salem",
      description: "Field notes from Arya Salem on science, software, music, and whatever is worth thinking through.",
      canonicalUrl: `${SITE_ORIGIN}/blog`,
      indexable: true,
      kind: "blog",
    };
  }

  if (pathname.startsWith("/blog/")) {
    const slug = decodeURIComponent(pathname.slice("/blog/".length).replace(/\/$/, ""));
    const post = findBlogPost(slug);

    if (post) {
      return {
        title: `${post.title} — Arya Salem`,
        description: post.description,
        canonicalUrl: `${SITE_ORIGIN}/blog/${encodeURIComponent(post.slug)}`,
        indexable: !post.draft,
        kind: "post",
        image: post.cover ? postAssetUrl(post.slug, post.cover) : undefined,
        imageAlt: post.coverAlt,
        published: post.published,
        updated: post.updated,
        tags: post.tags,
      };
    }
  }

  return {
    title: "Page not found — Arya Salem",
    description: "This page does not exist.",
    canonicalUrl: `${SITE_ORIGIN}${pathname}`,
    indexable: false,
    kind: "not-found",
  };
}

function setMeta(selector: string, attribute: "name" | "property", key: string, content?: string) {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);

  if (!content) {
    existing?.remove();
    return;
  }

  const element = existing ?? document.createElement("meta");
  if (!existing) {
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function getStructuredData(metadata: RouteMetadata) {
  const person = {
    "@type": "Person",
    "@id": `${SITE_ORIGIN}/#person`,
    name: "Arya Salem",
    url: `${SITE_ORIGIN}/`,
    sameAs: ["https://github.com/aryasalem09"],
  };
  const website = {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    url: `${SITE_ORIGIN}/`,
    name: "Arya Salem",
    inLanguage: "en-US",
    author: { "@id": `${SITE_ORIGIN}/#person` },
  };

  const page = metadata.kind === "post"
    ? {
        "@type": "BlogPosting",
        "@id": `${metadata.canonicalUrl}#article`,
        headline: metadata.title.replace(/ — Arya Salem$/, ""),
        description: metadata.description,
        url: metadata.canonicalUrl,
        datePublished: metadata.published,
        dateModified: metadata.updated ?? metadata.published,
        image: metadata.image,
        keywords: metadata.tags,
        inLanguage: "en-US",
        author: { "@id": `${SITE_ORIGIN}/#person` },
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      }
    : metadata.kind === "blog" || metadata.kind === "projects"
      ? {
          "@type": metadata.kind === "blog" ? "Blog" : "CollectionPage",
          "@id": `${metadata.canonicalUrl}#page`,
          url: metadata.canonicalUrl,
          name: metadata.title,
          description: metadata.description,
          inLanguage: "en-US",
          author: { "@id": `${SITE_ORIGIN}/#person` },
          isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, ...(page ? [page] : [])],
  };
}

export default function SeoHead() {
  const location = useLocation();

  useEffect(() => {
    const metadata = getRouteMetadata(location.pathname);

    document.title = metadata.title;
    setMeta('meta[name="description"]', "name", "description", metadata.description);
    setMeta('meta[name="robots"]', "name", "robots", metadata.indexable ? INDEX_ROBOTS : "noindex,nofollow");
    setMeta('meta[property="og:type"]', "property", "og:type", metadata.kind === "post" ? "article" : "website");
    setMeta('meta[property="og:title"]', "property", "og:title", metadata.title);
    setMeta('meta[property="og:description"]', "property", "og:description", metadata.description);
    setMeta('meta[property="og:url"]', "property", "og:url", metadata.canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", metadata.image);
    setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", metadata.imageAlt);
    setMeta('meta[property="article:published_time"]', "property", "article:published_time", metadata.published);
    setMeta('meta[property="article:modified_time"]', "property", "article:modified_time", metadata.updated);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", metadata.image ? "summary_large_image" : "summary");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", metadata.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", metadata.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", metadata.image);
    setMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", metadata.imageAlt);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = metadata.canonicalUrl;

    let structuredData = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld]');
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      structuredData.dataset.seoJsonld = "";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(getStructuredData(metadata));
  }, [location.pathname]);

  return null;
}
