import { useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";

import type { Project } from "@/content/github";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <dl className="grid grid-cols-2 gap-5 text-xs md:grid-cols-1 lg:grid-cols-2">
      <div>
        <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Type</dt>
        <dd className="mt-1.5 text-sm">{project.tags[0] ?? project.status ?? "Project"}</dd>
      </div>
      <div>
        <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Tools</dt>
        <dd className="mt-1.5 text-sm leading-5">
          {[project.language, ...project.tags.slice(1, 3)].filter(Boolean).join(", ")}
        </dd>
      </div>
    </dl>
  );
}

export default function ProjectCard({ project, featured = false, className }: ProjectCardProps) {
  const title = project.title ?? project.name;
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const preview = project.preview;
  const hasAnimatedPreview = Boolean(preview?.animatedSrc);

  const togglePreview = () => {
    setIsPreviewPlaying((isPlaying) => !isPlaying);
  };

  const playPreviewOnHover = () => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsPreviewPlaying(true);
    }
  };

  if (featured) {
    return (
      <article
        id={`project-${project.name}`}
        className={cn(
          "group grid gap-6 border-t border-border py-6 md:grid-cols-12 md:items-center md:gap-8",
          className,
        )}
      >
        <div
          className="relative overflow-hidden rounded-sm bg-muted md:col-span-5"
          onMouseEnter={hasAnimatedPreview ? playPreviewOnHover : undefined}
          onMouseLeave={hasAnimatedPreview ? () => setIsPreviewPlaying(false) : undefined}
        >
          {preview ? (
            <>
              {hasAnimatedPreview && isPreviewPlaying ? (
                <video
                  src={preview.animatedSrc}
                  poster={preview.src}
                  aria-label={preview.alt}
                  width={preview.width ?? 1280}
                  height={preview.height ?? 720}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  onError={() => setIsPreviewPlaying(false)}
                  className="aspect-video w-full object-contain"
                />
              ) : (
                <img
                  src={preview.src}
                  alt={preview.alt}
                  width={preview.width ?? 1280}
                  height={preview.height ?? 720}
                  loading="lazy"
                  className="aspect-video w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none"
                />
              )}
              {hasAnimatedPreview ? (
                <button
                  type="button"
                  onClick={togglePreview}
                  aria-label={`${isPreviewPlaying ? "Pause" : "Play"} ${title} animation`}
                  className="absolute bottom-3 right-3 inline-flex size-10 items-center justify-center rounded-full border border-white/60 bg-black/65 text-white shadow-sm transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {isPreviewPlaying ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
                </button>
              ) : null}
            </>
          ) : (
            <div className="aspect-video" aria-hidden="true" />
          )}
        </div>

        <div className="md:col-span-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            {[project.status, project.year].filter(Boolean).join(" / ")}
          </p>
          <h3 className="mt-1.5 text-2xl font-semibold tracking-[-0.025em]">
            {title}
          </h3>
          <p className="mt-1.5 max-w-md text-xs leading-5 text-muted-foreground md:text-sm">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-ring"
              >
                View site <ArrowUpRight className="size-3.5" />
              </a>
            ) : null}
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-ring"
            >
              Source <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <ProjectMeta project={project} />
        </div>
      </article>
    );
  }

  return (
    <article
      id={`project-${project.name}`}
      className={cn("grid gap-4 border-b border-border py-7 md:grid-cols-12 md:items-start md:gap-8", className)}
    >
      <div className="md:col-span-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
          {[project.year, project.status].filter(Boolean).join(" / ")}
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-ring"
            >
              View site <ArrowUpRight className="size-3.5" />
            </a>
          ) : null}
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-ring"
          >
            Source <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
      <p className="max-w-xl text-sm leading-6 text-muted-foreground md:col-span-5">{project.description}</p>
      <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-muted-foreground md:col-span-3">
        {[project.language, ...project.tags].filter(Boolean).join(" / ")}
      </p>
    </article>
  );
}
