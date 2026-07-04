import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command as CommandIcon, ExternalLink, FileText, Home, Mail, Music, Send, Sparkles, User } from "lucide-react";

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

const navActions = [
  { label: "Home", value: "home", href: "/", icon: Home },
  { label: "Selected work", value: "work", href: "/#work", icon: Sparkles },
  { label: "Music", value: "music", href: "/#music", icon: Music },
  { label: "About", value: "about", href: "/#about", icon: User },
  { label: "Contact", value: "contact", href: "/#contact", icon: Send },
  { label: "Blog", value: "blog", href: "/blog", icon: FileText },
  { label: "All projects", value: "all-projects", href: "/projects", icon: FileText },
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
    window.open(href, "_blank", "noreferrer");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="hidden h-9 items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground outline-none transition-colors hover:border-signal/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:inline-flex"
      >
        <CommandIcon className="size-3" />
        K
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
