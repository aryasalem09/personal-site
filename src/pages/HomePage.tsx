import { ArrowDown, ArrowUpRight } from "lucide-react";

import HeroFaultyTerminal from "@/components/effects/HeroFaultyTerminal";
import RepoWorkbench from "@/components/projects/RepoWorkbench";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { GithubIcon } from "@/components/icons";
import { githubProfile } from "@/content/github";
import { performances } from "@/content/performances";

export default function HomePage() {
  return (
    <div>
      <section id="home" className="relative scroll-mt-20 overflow-hidden">
        <div className="site-container relative py-16 md:py-24">
          <div className="absolute inset-x-5 top-8 h-[26rem] md:inset-x-8 md:h-[32rem]">
            <HeroFaultyTerminal />
          </div>

          <div className="relative z-10 max-w-3xl py-16 md:py-24">
            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
              I make little tools for school, science, and sound.
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">
              I’m Arya — a high school student building club sites, climate-data experiments, tiny simulations, and
              quartet recordings with friends.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="cursor-target inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
          </div>
        </div>
      </section>

      <RepoWorkbench />

      <section id="music" className="scroll-mt-20 border-t border-border/70">
        <div className="site-container py-16 md:py-24">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm text-muted-foreground">Recorded at the Ballard House.</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Quartet setlist
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Three arrangements with friends. Videos only load when you press play.
            </p>
          </div>

          <ol className="grid gap-6 lg:grid-cols-2">
            {performances.map((performance, index) => (
              <li key={performance.youtubeId} className={index === 0 ? "lg:col-span-2" : undefined}>
                <figure className="space-y-3">
                  <YouTubeEmbed
                    youtubeId={performance.youtubeId}
                    title={`${performance.title} by ${performance.artist}, string quartet`}
                    aspectClassName={index === 0 ? "aspect-[16/8.5]" : "aspect-video"}
                  />
                  <figcaption className="flex items-baseline gap-3 font-mono text-xs text-muted-foreground">
                    <span className="text-foreground">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      {performance.title}
                      <span className="text-muted-foreground/70"> · {performance.artist}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
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
                      className="cursor-target quiet-link inline-flex items-center gap-1.5 text-base"
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
