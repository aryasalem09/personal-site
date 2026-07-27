import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_ORIGIN = "https://aryasalem.dev";

const homeMetadata = {
  title: "Arya Salem — software, science, and string quartets",
  description:
    "Arya Salem is a high-school senior exploring biology, chemistry, neuroscience, and software through websites, data projects, simulations, and music.",
};

const projectsMetadata = {
  title: "Projects — Arya Salem",
  description:
    "Selected software, research, data visualization, and simulation projects by Arya Salem.",
};

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

export default function SeoHead() {
  const location = useLocation();

  useEffect(() => {
    const isHome = location.pathname === "/";
    const isProjects = location.pathname === "/projects";
    const metadata = isProjects ? projectsMetadata : isHome ? homeMetadata : {
      title: "Page not found — Arya Salem",
      description: "This page does not exist.",
    };
    const canonicalUrl = `${SITE_ORIGIN}${isHome ? "/" : location.pathname}`;
    const robots = isHome || isProjects
      ? "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
      : "noindex,nofollow";

    document.title = metadata.title;
    setMeta('meta[name="description"]', "name", "description", metadata.description);
    setMeta('meta[name="robots"]', "name", "robots", robots);
    setMeta('meta[property="og:title"]', "property", "og:title", metadata.title);
    setMeta('meta[property="og:description"]', "property", "og:description", metadata.description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", metadata.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", metadata.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [location.pathname]);

  return null;
}
