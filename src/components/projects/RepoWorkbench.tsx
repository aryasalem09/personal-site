import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { projects, type Project } from "@/content/github";
import { cn } from "@/lib/utils";

const kindLabels: Record<Project["kind"], string> = {
  club: "club",
  climate: "climate",
  simulation: "sim",
  math: "math",
  webmaster: "web",
};

function Artifact({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border border-border/80 bg-background/70 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {project.artifact.label}
        </p>
        <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          {project.year}
        </span>
      </div>

      <dl className="space-y-2">
        {project.artifact.rows.map(([key, value]) => (
          <div key={key} className="grid grid-cols-[7.5rem_1fr] gap-3 text-sm">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {key}
            </dt>
            <dd className="text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function RepoRow({
  project,
  active,
  onSelect,
}: {
  project: Project;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "cursor-target w-full rounded-xl border px-4 py-3 text-left transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "border-signal/50 bg-signal/10 text-foreground"
          : "border-transparent text-muted-foreground hover:border-border hover:bg-card/60 hover:text-foreground",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em]">
            {kindLabels[project.kind]} / {project.language ?? "repo"}
          </p>
          <h3 className="mt-1 text-base font-medium tracking-tight">
            {project.title}
          </h3>
        </div>

        <span className="font-mono text-[10px] text-muted-foreground">
          {project.status}
        </span>
      </div>
    </button>
  );
}

export default function RepoWorkbench() {
  const [activeName, setActiveName] = useState(projects[0]?.name ?? "");

  const activeProject = useMemo(
    () => projects.find((project) => project.name === activeName) ?? projects[0],
    [activeName],
  );

  if (!activeProject) {
    return null;
  }

  return (
    <section id="work" className="scroll-mt-20">
      <div className="site-container py-16 md:py-24">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm text-muted-foreground">GitHub, but edited down.</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Repos I’d actually open first.
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            A small workbench for school sites, science tools, simulations, and the odd math experiment.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(17rem,0.85fr)_minmax(0,1.35fr)]">
          <div className="rounded-2xl border border-border bg-card/70 p-2">
            <div className="border-b border-border/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              ~/repos
            </div>

            <div className="mt-2 space-y-1">
              {projects.map((project) => (
                <RepoRow
                  key={`${project.owner}-${project.name}`}
                  project={project}
                  active={project.name === activeProject.name}
                  onSelect={() => setActiveName(project.name)}
                />
              ))}
            </div>
          </div>

          <article className="relative overflow-hidden rounded-2xl border border-border bg-card/80 p-5 md:p-6">
            <div className="absolute right-5 top-5 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/40 md:block">
              selected repo
            </div>

            <div className="max-w-2xl">
              <p className="text-sm text-muted-foreground">{activeProject.note}</p>

              <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                {activeProject.title}
              </h3>

              <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
                {activeProject.description}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[1fr_0.85fr] md:items-start">
              <Artifact project={activeProject} />

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-target inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
                >
                  <GithubIcon className="size-4" />
                  Open repo
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
