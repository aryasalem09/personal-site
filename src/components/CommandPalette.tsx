import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, FileText, Home, Music, Search, Send, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { projects } from "@/content/github";

const navActions = [
  { label: "Home", value: "home", href: "/#home", icon: Home },
  { label: "Projects", value: "projects", href: "/projects", icon: Sparkles },
  { label: "Music", value: "music", href: "/#music", icon: Music },
  { label: "About", value: "about", href: "/#about", icon: Search },
  { label: "Contact", value: "contact", href: "/#contact", icon: Send },
  { label: "Blog", value: "blog", href: "/blog", icon: FileText },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const projectActions = useMemo(
    () =>
      projects.map((project) => ({
        label: project.name,
        value: `project-${project.name}`,
        url: project.url,
        detail: project.language ?? project.status ?? "GitHub",
      })),
    [],
  );

  const runInternalAction = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  const runExternalAction = (href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noreferrer");
  };

  return (
    <>
      <button
        type="button"
        data-cursor-target
        onClick={() => setOpen(true)}
        className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.18em] text-cyan-100 outline-none transition hover:border-cyan-200/30 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        aria-label="Open command palette"
      >
        Cmd K
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Jump to a section, page, or project..." />
        <CommandList>
          <CommandEmpty>No matching command.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {navActions.map((action) => {
              const Icon = action.icon;

              return (
                <CommandItem key={action.value} value={action.value} onSelect={() => runInternalAction(action.href)}>
                  <Icon data-icon="inline-start" />
                  <span>{action.label}</span>
                </CommandItem>
              );
            })}
            <CommandItem value="github-profile" onSelect={() => runExternalAction("https://github.com/aryasalem09")}>
              <FaGithub data-icon="inline-start" />
              <span>GitHub</span>
              <CommandShortcut>external</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Project repos">
            {projectActions.map((project) => (
              <CommandItem key={project.value} value={project.value} onSelect={() => runExternalAction(project.url)}>
                <ExternalLink data-icon="inline-start" />
                <span>{project.label}</span>
                <CommandShortcut>{project.detail}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
