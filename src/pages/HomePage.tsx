import { useEffect } from "react";
import GitHubCircularGallery from "@/components/GitHubCircularGallery";
import ScrollFloat from "@/components/ScrollFloat";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { githubProfile, pinnedRepos } from "@/content/github";
import { performances } from "@/content/performances";

const titleFloatProps = {
  animationDuration: 1.05,
  ease: "power3.out",
  scrollStart: "top 90%",
  scrollEnd: "top 60%",
  scrub: false,
  stagger: 0.04,
} as const;

export default function HomePage() {
  useEffect(() => {
    const root = document.documentElement;
    const previousSnapType = root.style.scrollSnapType;
    root.style.scrollSnapType = "y proximity";

    return () => {
      root.style.scrollSnapType = previousSnapType;
    };
  }, []);

  return (
      <div className="snap-y snap-proximity">
        <section id="home" className="slide scroll-mt-24">
          <div className="slide-inner relative z-10 py-24 md:py-28">
            <p className="kicker">by arya</p>

            <h1 className="title">
              <ScrollFloat {...titleFloatProps}>Welcome to my website</ScrollFloat>
            </h1>

            <p className="subtitle mt-7 md:mt-8">
              Look around my website! I'll load my blog posts soon they're all somewhere else as of right now....
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="/#projects" className="big-btn">
                View Projects
              </a>
              <a href="/blog" className="ghost-btn">
                Blog
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
            <a
                href="/#projects"
                className="cursor-target inline-flex flex-col items-center gap-2 text-slate-200/72 transition hover:text-slate-100"
            >
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.28em]">SCROLL</span>
              <span className="animate-bounce text-2xl leading-none">&#8964;</span>
            </a>
          </div>
        </section>

        <section id="projects" className="slide scroll-mt-24">
          <div className="slide-divider" />
          <div className="slide-inner py-20 md:py-24">
            <p className="kicker">PROJECTS</p>

            <div className="mt-10 grid gap-10 lg:grid-cols-[420px_1fr] lg:items-center">
              <div>
                <h2 className="title max-w-[16ch]">
                  <ScrollFloat {...titleFloatProps}>Github.</ScrollFloat>
                </h2>

                <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-200/75 md:text-xl">
                  Powerful title amirite. Explore my github projects!.
                </p>

                <ul className="mt-7 space-y-2">
                  <li className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.28em] text-cyan-100/72">
                    Scroll to rotate
                  </li>
                  <li className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.28em] text-cyan-100/72">
                    Click a card to open repo
                  </li>
                  <li className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.28em] text-cyan-100/72">
                    Pinned highlights only
                  </li>
                </ul>

                <p className="mt-5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.24em] text-slate-300/65">
                  {pinnedRepos.length} repositories loaded
                </p>

                <a
                    href={githubProfile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-target mt-7 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-base font-medium text-slate-100 transition hover:bg-white/14"
                >
                  Open @{githubProfile.handle}
                  <span aria-hidden="true">-&gt;</span>
                </a>
              </div>

              <div className="relative lg:-mr-8 xl:-mr-12">
                <div className="relative h-[560px] w-full overflow-hidden rounded-[36px] bg-white/[0.03] shadow-[0_40px_140px_rgba(0,0,0,0.45)] md:h-[620px]">
                  <GitHubCircularGallery />

                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950/55 to-transparent" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950/55 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/45 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/55 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="music" className="relative snap-start scroll-mt-24">
          <div className="slide-divider" />
          <div className="sticky top-0 z-10 flex min-h-[100vh] items-center">
            <div className="slide-inner py-20 md:py-24">
              <p className="kicker">MUSIC</p>

              <h2 className="title">
                <ScrollFloat {...titleFloatProps}>Featured Performances</ScrollFloat>
              </h2>

              <p className="subtitle">Three string quartet arrangements performed at the Ballard House with me and my friends!</p>

              <div className="mt-10 grid gap-8 lg:grid-cols-2">
                <article className="space-y-4 lg:col-span-2">
                  <h3 className="text-2xl font-semibold leading-tight text-slate-100 md:text-3xl">
                    {performances[0].title}
                  </h3>
                  <YouTubeEmbed
                      youtubeId={performances[0].youtubeId}
                      title={performances[0].title}
                      aspectClassName="aspect-[16/8.5]"
                  />
                </article>

                <article className="space-y-3">
                  <h3 className="text-xl font-semibold leading-tight text-slate-100 md:text-2xl">
                    {performances[1].title}
                  </h3>
                  <YouTubeEmbed youtubeId={performances[1].youtubeId} title={performances[1].title} />
                </article>

                <article className="space-y-3">
                  <h3 className="text-xl font-semibold leading-tight text-slate-100 md:text-2xl">
                    {performances[2].title}
                  </h3>
                  <YouTubeEmbed youtubeId={performances[2].youtubeId} title={performances[2].title} />
                </article>
              </div>

              <p className="subtitle">more coming soon!</p>
            </div>
          </div>
          <div aria-hidden="true" className="h-[100vh] snap-start" />
          <div aria-hidden="true" className="h-[100vh] snap-start" />
        </section>

        <section id="about" className="slide scroll-mt-24">
          <div className="slide-divider" />
          <div className="slide-inner py-20 md:py-24">
            <div className="space-y-6 md:space-y-8">
              <p className="kicker">ABOUT</p>

              <h2 className="title">
                <ScrollFloat {...titleFloatProps} splitBy="words">
                  I am an American High School student
                </ScrollFloat>
              </h2>

              <p className="subtitle">Currently in 11th grade! (yikes college apps next year)</p>
            </div>
          </div>
        </section>

        <section id="contact" className="slide scroll-mt-24">
          <div className="slide-divider" />
          <div className="slide-inner py-20 md:py-24">
            <p className="kicker">CONTACT</p>

            <h2 className="title">
              <ScrollFloat {...titleFloatProps}>Contact and collaboration</ScrollFloat>
            </h2>

            <p className="subtitle">I'm easily reachable on discord. I only check my email occasionally.</p>

            <div className="mt-8 space-y-4 text-xl text-slate-200/80">
              <p>
                GitHub:{" "}
                <a href={githubProfile.url} target="_blank" rel="noreferrer" className="soft-link">
                  @{githubProfile.handle}
                </a>
              </p>
              <p>
                Discord:{" "}
                <a
                    href="https://discord.com/users/923779227856285757"
                    target="_blank"
                    rel="noreferrer"
                    className="soft-link"
                >
                  @arya
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:aryasalem@icloud.com" className="soft-link">
                  aryasalem@icloud.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
  );
}