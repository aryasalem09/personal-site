import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/content/github";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex h-full flex-col border-white/10 bg-white/[0.045] text-slate-100 shadow-[0_20px_80px_rgba(2,6,23,0.24)] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-200/30 hover:bg-white/[0.07]">
      <CardHeader className="grid-cols-[1fr_auto] gap-x-4 gap-y-2">
        <CardTitle className="text-xl leading-tight md:text-2xl">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm outline-none transition hover:text-cyan-100 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {project.name}
          </a>
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed text-slate-300/74">
          {project.description}
        </CardDescription>
        <CardAction>
          {project.language ? (
            <Badge variant="outline" className="border-cyan-200/20 bg-cyan-300/[0.08] text-cyan-100">
              {project.language}
            </Badge>
          ) : null}
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {project.status ? (
            <Badge variant="secondary" className="bg-white/10 text-slate-100 hover:bg-white/10">
              {project.status}
            </Badge>
          ) : null}
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-white/10 text-slate-300/82">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto font-['JetBrains_Mono'] text-xs uppercase tracking-[0.18em] text-slate-400">
          {project.owner}
          {project.year ? ` / ${project.year}` : ""}
        </div>
      </CardContent>

      <Separator className="bg-white/10" />

      <CardFooter className="flex-wrap gap-2 pt-5">
        <Button asChild size="sm" className="bg-cyan-200 text-slate-950 hover:bg-cyan-100">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.name} repository`}
          >
            <FaGithub data-icon="inline-start" />
            Repo
          </a>
        </Button>
        {project.liveUrl ? (
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-white/[0.12] bg-white/[0.04] text-slate-100 hover:bg-white/10 hover:text-slate-100"
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.name} live demo`}
            >
              Live
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
