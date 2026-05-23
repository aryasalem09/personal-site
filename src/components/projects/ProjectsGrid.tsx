import ProjectCard from "@/components/projects/ProjectCard";
import type { Project } from "@/content/github";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={`${project.owner}-${project.name}`} project={project} />
      ))}
    </div>
  );
}
