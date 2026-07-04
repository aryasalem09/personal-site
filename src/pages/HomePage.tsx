import { ArrowDown, ArrowUpRight } from "lucide-react";

import SelectedWork from "@/components/projects/SelectedWork";
import StatusPill from "@/components/StatusPill";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { GithubIcon } from "@/components/icons";
import { githubProfile } from "@/content/github";
import { performances } from "@/content/performances";

const heroIndex = [
  ["01", "club sites"],
  ["02", "climate data"],
  ["03", "simulations"],
  ["04", "string quartet"],
];

export default function HomePage() {
  return (
    <div>
      <section id="home" className="scroll-mt-20">
        <div className="site-container pb-16 pt-16 md:pb-24 md:pt-28">
          <StatusPill />

          <h1 className="mt-7 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
            I build small tools for school, science, and sound.
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">
            High schooler making club websites, climate trackers, and ecosystem simulations — and playing string
            quartet arrangements with friends on the side.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See the work
              <ArrowDown className="size-4" />
            </a>
            <a
              href={githubProfile.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-5 py-2.5 text-sm font-medium outline-none transition-colors hover:border-signal/50 hover:text-signal focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-3 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:grid-cols-4">
            {heroIndex.map(([number, label]) => (
              <div key={number} className="flex gap-2">
                <dt className="text-foreground">{number}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SelectedWork />

      <section id="music" className="scroll-mt-20 border-t border-border/70">
        <div className="site-container py-16 md:py-24">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker">Music</p>
              <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                String quartet, occasionally recorded.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Three arrangements performed at the Ballard House with my quartet. Videos load when you press play —
              nothing autoplays here.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <figure className="space-y-3 lg:col-span-2">
              <YouTubeEmbed
                youtubeId={performances[0].youtubeId}
                title={performances[0].title}
                aspectClassName="aspect-[16/8.5]"
              />
              <figcaption className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {performances[0].title}
              </figcaption>
            </figure>

            {performances.slice(1).map((performance) => (
              <figure key={performance.youtubeId} className="space-y-3">
                <YouTubeEmbed youtubeId={performance.youtubeId} title={performance.title} />
                <figcaption className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {performance.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 border-t border-border/70">
        <div className="site-container py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-12">
            <p className="kicker md:col-span-4">About</p>
            <div className="md:col-span-8">
              <p className="max-w-2xl text-balance text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                I'm Arya, a high school junior. I like taking things that are messy or invisible — club logistics, reef
                bleaching data, ecosystem dynamics — and making them visible and usable.
              </p>
              <p className="mt-6 max-w-xl leading-7 text-muted-foreground">
                The other half of my time goes to a string quartet with friends. Honestly, it's the same skill: listen
                carefully, keep time, don't overplay.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 border-t border-border/70">
        <div className="site-container py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-12">
            <p className="kicker md:col-span-4">Contact</p>
            <div className="md:col-span-8">
              <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">Say hi.</h2>
              <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                Discord is fastest. Email works too — I check it occasionally, honestly.
              </p>

              <ul className="mt-8 max-w-xl">
                {[
                  {
                    label: "discord",
                    text: "@arya",
                    href: "https://discord.com/users/923779227856285757",
                    external: true,
                  },
                  { label: "github", text: `@${githubProfile.handle}`, href: githubProfile.url, external: true },
                  { label: "email", text: "aryasalem@icloud.com", href: "mailto:aryasalem@icloud.com", external: false },
                ].map((row) => (
                  <li
                    key={row.label}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/70 py-3.5 last:border-b-0"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {row.label}
                    </span>
                    <a
                      href={row.href}
                      {...(row.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="quiet-link inline-flex items-center gap-1.5 text-base"
                    >
                      {row.text}
                      {row.external ? <ArrowUpRight className="size-3.5 text-muted-foreground" /> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
