import type { MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/content/github";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  flagship?: boolean;
  showTrace?: boolean;
  className?: string;
}

function trackPointer(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
}

export default function ProjectCard({ project, flagship = false, showTrace = false, className }: ProjectCardProps) {
  return (
    <article
      onMouseMove={trackPointer}
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-lg border border-border bg-card/80 shadow-soft transition-all duration-300 [--x:50%] [--y:50%]",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-300",
        "before:bg-[radial-gradient(380px_circle_at_var(--x)_var(--y),hsl(var(--signal)/0.09),transparent_45%)]",
        "hover:-translate-y-0.5 hover:border-signal/40 hover:before:opacity-100 motion-reduce:hover:translate-y-0",
        flagship ? "p-6 md:p-8" : "p-6",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {[project.status, project.year].filter(Boolean).join(" · ")}
          </p>
          <h3
            className={cn(
              "mt-2.5 font-semibold tracking-tight",
              flagship ? "text-2xl md:text-3xl" : "text-xl md:text-2xl",
            )}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm outline-none after:absolute after:inset-0 hover:text-signal focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {project.title ?? project.name}
            </a>
          </h3>
        </div>

        <span
          aria-hidden="true"
          className="rounded-full border border-border bg-background/70 p-2 text-muted-foreground transition-colors group-hover:border-signal/50 group-hover:text-signal"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <p className={cn("max-w-xl text-pretty leading-7 text-muted-foreground", flagship ? "text-base" : "text-sm leading-6")}>
        {project.description}
      </p>

      {showTrace ? <DataTrace /> : null}

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-1.5">
          {project.language ? <span className="chip border-signal/30 text-signal">{project.language}</span> : null}
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-4 truncate font-mono text-[10px] tracking-[0.08em] text-muted-foreground/70">
          github.com/{project.owner.toLowerCase()}/{project.name}
        </p>
      </div>
    </article>
  );
}

function DataTrace() {
  return (
    <div className="mt-6 rounded-md border border-border bg-background/60 p-4">
      <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>reef stress trace</span>
        <span className="text-ember">sample</span>
      </div>
      <svg viewBox="0 0 320 72" role="img" aria-label="Sample reef stress data trace" className="h-16 w-full">
        <path
          d="M0 60 C 28 58, 40 50, 64 48 S 108 54, 132 44 S 172 22, 200 30 S 248 48, 276 26 S 304 20, 320 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-ember"
        />
        <path d="M0 64 H320" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" className="text-border" />
      </svg>
    </div>
  );
}
