import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ProjectCard from "@/components/projects/ProjectCard";
import { GithubIcon } from "@/components/icons";
import { githubProfile, projects } from "@/content/github";

export default function ProjectsPage() {
  const languages = Array.from(new Set(projects.map((project) => project.language).filter(Boolean)));

  return (
    <section className="site-container py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="kicker">Archive</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
          Everything I've built, school projects included.
        </h1>
        <p className="mt-5 text-pretty leading-7 text-muted-foreground md:text-lg">
          The full index — club sites, climate tools, and the stranger experiments. Each card links straight to the
          repo.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {`${projects.length} repos · ${languages.join(" / ")}`}
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={`${project.owner}-${project.name}`} project={project} />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href={githubProfile.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <GithubIcon className="size-4" />
          More on GitHub
        </a>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="size-3.5" />
          Back home
        </Link>
      </div>
    </section>
  );
}
