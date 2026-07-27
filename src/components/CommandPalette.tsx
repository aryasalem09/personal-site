import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, FileText, Home, Mail, Music, Search, Send, Sparkles, User } from "lucide-react";

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
import { GithubIcon } from "@/components/icons";
import { githubProfile, projects } from "@/content/github";
import { resumeHref } from "@/content/profile";

const navActions = [
  { label: "Home", value: "home", href: "/", icon: Home },
  { label: "Selected work", value: "work", href: "/#work", icon: Sparkles },
  { label: "Music", value: "music", href: "/#music", icon: Music },
  { label: "About", value: "about", href: "/#about", icon: User },
  { label: "Contact", value: "contact", href: "/#contact", icon: Send },
  { label: "More projects", value: "more-projects", href: "/projects", icon: FileText },
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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const runInternalAction = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  const runExternalAction = (href: string) => {
    setOpen(false);
    if (href.startsWith("mailto:")) {
      window.location.assign(href);
      return;
    }
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search site (Command or Control K)"
        className="hidden size-7 items-center justify-center text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring md:inline-flex"
      >
        <Search className="size-3.5" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Jump to a section, page, or repo..." />
        <CommandList>
          <CommandEmpty>No matching command.</CommandEmpty>

          <CommandGroup heading="Navigate">
            {navActions.map((action) => {
              const Icon = action.icon;
              return (
                <CommandItem key={action.value} value={action.value} onSelect={() => runInternalAction(action.href)}>
                  <Icon className="mr-2 size-4" />
                  <span>{action.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Elsewhere">
            <CommandItem value="resume-pdf" onSelect={() => runExternalAction(resumeHref)}>
              <FileText className="mr-2 size-4" />
              <span>
                Open resume<span className="sr-only"> (opens in a new tab)</span>
              </span>
              <CommandShortcut>PDF</CommandShortcut>
            </CommandItem>
            <CommandItem value="github-profile" onSelect={() => runExternalAction(githubProfile.url)}>
              <GithubIcon className="mr-2 size-4" />
              <span>GitHub profile</span>
              <CommandShortcut>external</CommandShortcut>
            </CommandItem>
            <CommandItem value="email" onSelect={() => runExternalAction("mailto:aryasalem@icloud.com")}>
              <Mail className="mr-2 size-4" />
              <span>Email Arya</span>
              <CommandShortcut>mail</CommandShortcut>
            </CommandItem>
            {projects.map((project) => (
              <CommandItem
                key={project.name}
                value={`repo-${project.name}`}
                onSelect={() => runExternalAction(project.url)}
              >
                <ExternalLink className="mr-2 size-4" />
                <span>{project.name}</span>
                <CommandShortcut>{project.language ?? "repo"}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
