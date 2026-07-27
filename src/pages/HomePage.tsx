import { ArrowUpRight } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";

import ResumeHighlights from "@/components/profile/ResumeHighlights";
import SelectedWork from "@/components/projects/SelectedWork";
import { githubProfile } from "@/content/github";
import { performances } from "@/content/performances";
import { resumeHref } from "@/content/profile";

const heroIndex = [
  ["01", "Work", "Websites, climate tools, and simulations", "#work"],
  ["02", "About", "Science, software, and the questions between them", "#about"],
  ["03", "Music", "Three string-quartet recordings", "#music"],
  ["04", "Contact", "Discord, email, or GitHub", "#contact"],
];

const contactLinks = [
  {
    label: "discord",
    text: "@arya",
    href: "https://discord.com/users/923779227856285757",
    external: true,
  },
  { label: "github", text: `@${githubProfile.handle}`, href: githubProfile.url, external: true },
  { label: "email", text: "Send me an email", href: "mailto:aryasalem@icloud.com", external: false },
  {
    label: "resume",
    text: "Open my resume",
    href: resumeHref,
    external: true,
    ariaLabel: "Open Arya Salem's resume PDF in a new tab",
  },
];

export default function HomePage() {
  return (
    <div>
      <section id="home" aria-labelledby="home-heading" tabIndex={-1} className="home-hero overflow-hidden">
        <div className="home-hero__inner site-container py-10 md:py-20">
          <div className="max-w-5xl">
            <h1
              id="home-heading"
              className="text-balance text-6xl font-semibold leading-[0.92] tracking-[-0.065em] sm:text-7xl md:text-[6.5rem]"
            >
              Arya Salem<span className="text-signal">.</span>
            </h1>

            <p className="mt-7 max-w-5xl text-pretty text-xl leading-[1.55] tracking-[-0.02em] text-muted-foreground sm:mt-9 sm:text-2xl md:text-[1.75rem] md:leading-[1.5]">
              I'm a high-school senior interested in biology, chemistry, and neuroscience. I build software when I want to understand something better, like coral bleaching trackers and ecosystem dynamics. I build what I think is fun!
            </p>
          </div>

          <nav aria-label="Homepage sections" className="mt-10 border-y border-border md:mt-16">
            <ul className="grid grid-cols-2 lg:grid-cols-4">
              {heroIndex.map(([number, label, description, href], index) => (
                <li key={number} className="border-b border-border odd:border-r [&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                  <a
                    href={href}
                    className={`group block min-h-24 px-3 py-4 outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:min-h-28 sm:px-5 sm:py-5 lg:min-h-32 lg:px-6 ${index === 0 ? "pl-0" : ""}`}
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">{number}</span>
                    <span className="mt-3 block text-base font-medium">{label}</span>
                    <span className="mt-1.5 block max-w-[15rem] text-xs leading-5 text-muted-foreground transition-colors group-hover:text-foreground sm:text-sm">
                      {description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <SelectedWork />

      <section id="about" aria-labelledby="about-heading" tabIndex={-1} className="home-section border-t border-border/70">
        <div className="site-container py-20 md:py-28">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-signal">02</span>
            <h2 id="about-heading" className="text-base font-medium">
              About
            </h2>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>

          <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-8">
            <p className="text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] md:col-span-5 md:text-5xl">
              I follow questions until they become something I can test, map, or share.
            </p>

            <div className="md:col-span-6 md:col-start-7">
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Most of those questions begin in biology, chemistry, or neuroscience. Right now, that means tracing neurons through 3D expansion-microscopy image stacks at Texas A&amp;M, modeling Pacific coral habitat with UT Austin, and building tools that make data easier to explore.
              </p>
            </div>
          </div>

          <ResumeHighlights />
        </div>
      </section>

      <section id="music" aria-labelledby="music-heading" tabIndex={-1} className="home-section border-t border-border/70">
        <div className="site-container py-20 md:py-28">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-signal">03</span>
            <h2 id="music-heading" className="text-base font-medium">
              Music
            </h2>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>

          <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <p className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] md:text-5xl">
                String Quartets!
              </p>
              <p className="mt-5 max-w-sm text-base leading-7 text-muted-foreground">
                Three arrangements performed at the Ballard House with friends.
              </p>
            </div>

            <ul className="border-t border-border md:col-span-7 md:col-start-6">
              {performances.map((performance, index) => (
                <li key={performance.youtubeId} className="border-b border-border">
                  <a
                    href={`https://www.youtube.com/watch?v=${performance.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Watch ${performance.title} on YouTube`}
                    className="group grid min-w-0 grid-cols-[2rem_1fr_auto] items-center gap-3 py-5 outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-ring sm:gap-5 sm:py-6"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
                    <span className="min-w-0 text-base font-medium leading-6 sm:text-lg">{performance.title}</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                      <FaYoutube className="size-3.5" aria-hidden="true" />
                      Watch
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-heading" tabIndex={-1} className="home-section border-t border-border/70">
        <div className="site-container py-20 md:py-28">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-signal">04</span>
            <h2 id="contact-heading" className="text-base font-medium">
              Contact
            </h2>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>

          <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <p className="text-balance text-5xl font-semibold leading-none tracking-[-0.055em] md:text-7xl">Say hi.</p>
              <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
                If you want to talk about a project, a science question, or a piece of music, I&apos;d genuinely love to hear from you.
              </p>
            </div>

            <ul className="border-t border-border md:col-span-6 md:col-start-7">
              {contactLinks.map((row) => (
                <li key={row.label} className="border-b border-border">
                  <a
                    href={row.href}
                    {...(row.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    aria-label={"ariaLabel" in row ? row.ariaLabel : undefined}
                    className="group flex min-w-0 items-center justify-between gap-4 py-5 outline-none transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-ring sm:py-6"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{row.label}</span>
                    <span className="inline-flex min-w-0 items-center gap-2 break-all text-right text-base font-medium sm:text-lg">
                      {row.text}
                      {row.external ? <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" /> : null}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
