import { ArrowUpRight } from "lucide-react";

import { Pin, Stamp, Tape } from "@/components/scrapbook/Scraps";
import { projects, type Project } from "@/content/github";
import { pick, tiltStyle } from "@/lib/scatter";

const pinTones = ["rose", "olive", "amber"] as const;
const tapeTones = ["ochre", "rose", "olive"] as const;

function ProjectCard({ project }: { project: Project }) {
  const seed = project.name;
  return (
    <article className="relative tilt" style={tiltStyle(seed, 2.6)}>
      <Tape tone={pick(seed + "t", tapeTones)} rotate={pick(seed, [-7, 6, -4])} className="-left-2 -top-3" />
      <div className="card-paper h-full p-5">
        <Pin tone={pick(seed + "p", pinTones)} className="right-3 top-2" />

        <div className="flex items-start justify-between gap-3">
          <h3 className="headline text-2xl leading-tight">{project.title}</h3>
          <span className="shrink-0 font-mono text-xs text-ink-soft">{project.year}</span>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <Stamp tone="olive" rotate={-4}>
            {project.language ?? "repo"}
          </Stamp>
          <span className="font-mono text-[0.7rem] uppercase tracking-wide text-ink-soft">
            {project.tag}
          </span>
        </div>

        <p className="mt-3 font-note text-lg leading-snug text-ink">{project.description}</p>

        <p className="mt-3 font-hand text-lg leading-tight text-terracotta">{project.note}</p>

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="cursor-target mt-4 inline-flex items-center gap-1 font-note text-lg denim-link"
        >
          open on github
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </article>
  );
}

export default function WorkPage() {
  return (
    <div>
      <header className="max-w-lg">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">things I made</p>
        <h2 className="headline mt-3 text-4xl md:text-5xl">the repos I&rsquo;d show you first</h2>
        <p className="mt-3 font-note text-xl leading-snug text-ink-soft">
          Mostly school sites and science projects, a couple of small simulations, and one
          Fortran thing because why not.
        </p>
      </header>

      <div className="mt-8 columns-1 gap-5 sm:columns-2 [&>*]:mb-5 [&>*]:break-inside-avoid">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
