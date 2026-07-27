import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/content/github";

const selectedProjectNames = ["slhs-tsa-website", "coral-bleaching-tracker", "ecosim"];

export default function SelectedWork() {
  const selectedProjects = selectedProjectNames
    .map((name) => projects.find((project) => project.name === name))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  return (
    <section id="work" aria-labelledby="selected-work-heading" tabIndex={-1} className="home-section">
      <div className="site-container py-16 md:py-20">
        <div className="flex items-center gap-5 border-t border-foreground/70 pt-4">
          <span className="font-mono text-sm text-signal">01</span>
          <h2 id="selected-work-heading" className="text-base font-medium">Selected work</h2>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <div className="mt-3 border-b border-border">
          {selectedProjects.map((project) => (
            <ProjectCard key={`${project.owner}-${project.name}`} project={project} featured />
          ))}
        </div>

        <Link
          to="/projects"
          className="quiet-link mt-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-signal"
        >
          Browse {projects.filter((project) => !project.featured).length} more projects
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
