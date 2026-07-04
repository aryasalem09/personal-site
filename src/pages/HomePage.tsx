import { ArrowUpRight } from "lucide-react";

import HeroFaultyTerminal from "@/components/effects/HeroFaultyTerminal";
import ProjectIndex from "@/components/projects/ProjectIndex";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { githubProfile } from "@/content/github";
import { performances } from "@/content/performances";
import { useEnhancedEffects } from "@/hooks/useEnhancedEffects";

export default function HomePage() {
  const enhancedEffects = useEnhancedEffects();

  return (
    <div>
      <section id="home" className="relative scroll-mt-20 overflow-hidden">
        <div
          className={`site-container grid gap-10 py-14 md:py-20 ${
            enhancedEffects ? "md:grid-cols-[minmax(0,1fr)_24rem] md:items-center" : ""
          }`.trim()}
        >
          <div className="max-w-2xl">
            <p className="text-sm text-muted-foreground">
              high school, small tools, quartet rehearsals
            </p>

            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] md:text-5xl lg:text-6xl">
              I’m Arya. I build small websites and experiments for whatever I’m doing at the time.
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
              Right now that means Hack Club pages, coral bleaching maps, ecosystem sims,
              and quartet recordings with friends.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="cursor-target inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
              >
                See projects
              </a>

              <a
                href={githubProfile.url}
                target="_blank"
                rel="noreferrer"
                className="cursor-target inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition hover:text-foreground"
              >
                GitHub
              </a>
            </div>
          </div>

          {enhancedEffects ? (
            <div className="hidden h-[24rem] md:block">
              <HeroFaultyTerminal />
            </div>
          ) : null}
        </div>
      </section>

      <ProjectIndex />

      <section id="music" className="scroll-mt-20 border-t border-border/60">
        <div className="site-container py-16 md:py-24">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Quartet recordings
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A few quartet recordings from Ballard House.
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
                  <figcaption className="text-sm text-muted-foreground">
                    {performance.title}
                    <span className="text-muted-foreground/70"> · {performance.artist}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 border-t border-border/60">
        <div className="site-container py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-12">
            <p className="text-sm text-muted-foreground md:col-span-4">About</p>
            <div className="md:col-span-8">
              <p className="max-w-2xl text-balance text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                I’m a high school junior. I like projects where messy stuff gets easier to see — club logistics, reef
                data, simulation rules, that kind of thing.
              </p>
              <p className="mt-6 max-w-xl leading-7 text-muted-foreground">
                I also play in a string quartet with friends, which is mostly listening carefully and trying not to
                rush.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 border-t border-border/60">
        <div className="site-container py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-12">
            <p className="text-sm text-muted-foreground md:col-span-4">Contact</p>
            <div className="md:col-span-8">
              <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">Reach me.</h2>
              <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                Discord is usually fastest. Email works too.
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
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 py-3.5 last:border-b-0"
                  >
                    <span className="text-sm text-muted-foreground">{row.label}</span>
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
