import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { GitHubContributionCalendar } from "@/components/projects/GitHubContributionCalendar";
import ProjectCard from "@/components/projects/ProjectCard";
import { GithubIcon } from "@/components/icons";
import { githubProfile, projects } from "@/content/github";

export default function ProjectsPage() {
  const indexProjects = projects.filter((project) => !project.featured);
  const languages = Array.from(new Set(indexProjects.map((project) => project.language).filter(Boolean)));

  return (
    <section className="site-container py-20 md:py-28">
      <div className="max-w-3xl border-t border-border pt-5">
        <p className="kicker">Index / more experiments</p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-6xl">
          More things I&apos;ve built.
        </h1>
        <p className="mt-5 text-pretty leading-7 text-muted-foreground md:text-lg">
          A few projects beyond the three featured on the homepage, from student tools to simulations and native apps.
        </p>
        <p className="mt-7 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {`${indexProjects.length} repositories / ${languages.join(" / ")}`}
        </p>
      </div>

      <div className="mt-12 border-t border-border">
        {indexProjects.map((project) => (
          <ProjectCard key={`${project.owner}-${project.name}`} project={project} />
        ))}
      </div>

      <section aria-labelledby="github-activity-heading" className="mt-12 border-t border-border pt-6">
        <div className="max-w-3xl">
          <p className="kicker">Open source practice</p>
          <h2 id="github-activity-heading" className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            GitHub activity
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            A live, explorable view of the public contribution activity on my GitHub profile.
          </p>
        </div>

        <div className="mt-8">
          <GitHubContributionCalendar username={githubProfile.handle} profileUrl={githubProfile.url} />
        </div>
      </section>

      <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-border pt-5">
        <a
          href={githubProfile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-foreground px-4 py-2.5 text-sm font-medium text-background outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <GithubIcon className="size-4" />
          More on GitHub
        </a>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="size-3.5" />
          Back home
        </Link>
      </div>
    </section>
  );
}
