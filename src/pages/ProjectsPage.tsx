import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import ProjectsGrid from "@/components/projects/ProjectsGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { featuredProjects, githubProfile, projects } from "@/content/github";

const tabs = ["All", "Featured", "TypeScript", "Rust", "Fortran", "JavaScript", "Other"] as const;
type ProjectTab = (typeof tabs)[number];

function matchesSearch(projectText: string, query: string) {
  return projectText.includes(query.trim().toLowerCase());
}

function matchesTab(language: string | undefined, featured: boolean | undefined, tab: ProjectTab) {
  if (tab === "All") return true;
  if (tab === "Featured") return Boolean(featured);
  if (tab === "Other") {
    return !["TypeScript", "Rust", "Fortran", "JavaScript"].includes(language ?? "");
  }

  return language === tab;
}

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ProjectTab>("All");

  const languages = useMemo(
    () => Array.from(new Set(projects.map((project) => project.language).filter(Boolean))).sort(),
    [],
  );

  const activeCount = projects.filter((project) => project.status === "Active").length;
  const schoolCount = projects.filter((project) => project.status === "School").length;
  const experimentCount = projects.filter((project) => project.status === "Experiment").length;

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const searchableText = [
        project.name,
        project.owner,
        project.description,
        project.language,
        project.status,
        project.year,
        ...project.tags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesTab(project.language, project.featured, activeTab) && matchesSearch(searchableText, normalizedQuery);
    });
  }, [activeTab, query]);

  const resetFilters = () => {
    setQuery("");
    setActiveTab("All");
  };

  return (
    <section className="py-16 md:py-20">
      <div className="slide-inner flex flex-col gap-12">
        <div className="max-w-4xl">
          <p className="kicker">GitHub Projects</p>
          <h1 className="mt-4 max-w-[13ch] text-5xl font-semibold leading-[1.02] text-slate-100 md:text-6xl lg:text-7xl">
            Things I've built
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300/82 md:text-xl">
            A focused archive of experiments, school projects, research tools, and sites that show how I work across
            frontend, simulation, and data-heavy builds.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="bg-cyan-200 text-slate-950 hover:bg-cyan-100">
              <a href={githubProfile.url} target="_blank" rel="noreferrer" aria-label="Open Arya's GitHub profile">
                <FaGithub data-icon="inline-start" />
                Open GitHub
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/[0.12] bg-white/[0.04] text-slate-100 hover:bg-white/10 hover:text-slate-100"
            >
              <Link to="/">
                <ArrowLeft data-icon="inline-start" />
                Back Home
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["Total projects", projects.length],
            ["Featured", featuredProjects.length],
            ["Languages", languages.length],
            ["Active / School / Lab", `${activeCount} / ${schoolCount} / ${experimentCount}`],
          ].map(([label, value]) => (
            <Card key={label} className="border-white/10 bg-white/[0.04] text-slate-100">
              <CardHeader className="p-4">
                <CardTitle className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-2xl font-semibold text-cyan-100 md:text-3xl">
                {value}
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProjectTab)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 md:p-5">
            <label className="relative block">
              <span className="sr-only">Search projects</span>
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, languages, tags, or years"
                className="h-11 border-white/10 bg-slate-950/40 pl-10 text-slate-100 placeholder:text-slate-500 focus-visible:ring-cyan-300"
              />
            </label>

            <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0 text-slate-300">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 data-[state=active]:border-cyan-200/40 data-[state=active]:bg-cyan-200 data-[state=active]:text-slate-950"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-white/10 text-slate-300">
                  {filteredProjects.length} shown
                </Badge>
                {query ? (
                  <Badge variant="secondary" className="bg-white/10 text-slate-100 hover:bg-white/10">
                    Search: {query}
                  </Badge>
                ) : null}
              </div>
            </div>

            {filteredProjects.length > 0 ? (
              <ProjectsGrid projects={filteredProjects} />
            ) : (
              <Card className="border-white/10 bg-white/[0.045] text-slate-100">
                <CardHeader>
                  <CardTitle>No projects match those filters</CardTitle>
                </CardHeader>
                <Separator className="bg-white/10" />
                <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-2xl text-sm leading-relaxed text-slate-300/78">
                    Try a different language, remove the search text, or reset the view to see the full project list.
                  </p>
                  <Button type="button" onClick={resetFilters} className="bg-cyan-200 text-slate-950 hover:bg-cyan-100">
                    Reset filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
