import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/content/github";

export default function SelectedWork() {
  const hackClub = projects.find((project) => project.name === "SLHS-HackClub-Website");
  const coral = projects.find((project) => project.name === "coral-bleaching-tracker");
  const ecosim = projects.find((project) => project.name === "ecosim");

  return (
    <section id="work" className="scroll-mt-20">
      <div className="site-container py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Selected work</p>
            <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Three builds, one clearer story.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            Not a repo dump — these are the three that best explain what I like making. The rest live in the archive.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-12">
          {hackClub ? <ProjectCard project={hackClub} flagship className="min-h-[22rem] md:col-span-7 md:row-span-2" /> : null}
          {coral ? <ProjectCard project={coral} showTrace className="md:col-span-5" /> : null}
          {ecosim ? <ProjectCard project={ecosim} className="md:col-span-5" /> : null}
        </div>

        <div className="mt-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Full archive — five repos and counting
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
