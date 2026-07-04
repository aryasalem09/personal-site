import { useMemo, useState } from "react";

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
  if (project.kind === "club") {
    return (
      <div className="max-w-sm border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">club notice</p>
        <h4 className="mt-3 text-xl font-semibold">SLHS Hack Club</h4>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Meetings, updates, and a web presence that feels student-run.
        </p>
      </div>
    );
  }

  if (project.kind === "climate") {
    return (
      <div className="max-w-sm border-y border-border py-4">
        <p className="text-sm text-muted-foreground">reef reading</p>
        <dl className="mt-3 grid grid-cols-[7rem_1fr] gap-y-2 text-sm">
          <dt className="text-muted-foreground">tracking</dt>
          <dd>bleaching risk</dd>
          <dt className="text-muted-foreground">shows</dt>
          <dd>a map, plus context</dd>
          <dt className="text-muted-foreground">rule</dt>
          <dd>don’t overclaim the data</dd>
        </dl>
      </div>
    );
  }

  if (project.kind === "simulation") {
    return (
      <pre className="max-w-sm overflow-x-auto rounded-xl border border-border bg-card/60 p-4 text-sm leading-7 text-muted-foreground">
{`prey + food      -> growth
predator + prey  -> energy
time              -> weird behavior`}
      </pre>
    );
  }

  if (project.kind === "math") {
    return (
      <div className="max-w-sm border border-border p-4">
        <p className="text-sm text-muted-foreground">sample counter</p>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
          <div>
            <p className="text-2xl font-semibold">π</p>
            <p className="text-muted-foreground">estimate</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">n</p>
            <p className="text-muted-foreground">points</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">r</p>
            <p className="text-muted-foreground">inside</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm border-l border-border pl-4">
      <p className="text-sm text-muted-foreground">webmaster checklist</p>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        <li>☑ follows the TSA webmaster rules</li>
        <li>☑ works on the school computers</li>
        <li>☑ finished before the deadline</li>
      </ul>
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
        "cursor-target w-full border-b border-border/60 px-1 py-4 text-left transition last:border-b-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-base font-medium">{project.title}</span>
        <span className="text-xs text-muted-foreground">{project.year}</span>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        {kindLabels[project.kind]} · {project.language ?? "repo"}
      </p>
    </button>
  );
}

export default function ProjectIndex() {
  const [activeName, setActiveName] = useState(projects[0]?.name ?? "");

  const activeProject = useMemo(
    () => projects.find((project) => project.name === activeName) ?? projects[0],
    [activeName],
  );

  if (!activeProject) {
    return null;
  }

  return (
    <section id="work" className="scroll-mt-20 border-t border-border/60">
      <div className="site-container py-16 md:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm text-muted-foreground">A few things I’ve put on GitHub.</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Projects I’d show first.
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Mostly school websites, science sketches, tiny simulations, and one math thing.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[18rem_1fr]">
          <div className="border-y border-border py-2">
            {projects.map((project) => (
              <RepoRow
                key={`${project.owner}-${project.name}`}
                project={project}
                active={project.name === activeProject.name}
                onSelect={() => setActiveName(project.name)}
              />
            ))}
          </div>

          <article className="border-y border-border py-8">
            <p className="text-sm text-muted-foreground">{activeProject.note}</p>

            <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              {activeProject.title}
            </h3>

            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              {activeProject.description}
            </p>

            <div className="mt-8">
              <Artifact project={activeProject} />
            </div>

            <a
              href={activeProject.url}
              target="_blank"
              rel="noreferrer"
              className="cursor-target mt-8 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
            >
              Open repo
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
