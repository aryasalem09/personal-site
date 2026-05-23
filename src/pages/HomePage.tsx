import { Link } from "react-router-dom";

import ProjectCard from "@/components/projects/ProjectCard";
import TerminalStatusPanel from "@/components/TerminalStatusPanel";
import { Button } from "@/components/ui/button";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { featuredProjects, githubProfile } from "@/content/github";
import { performances } from "@/content/performances";

export default function HomePage() {
  return (
      <div>
        <section id="home" data-snap-section data-section-id="SYS:HOME" className="lab-section slide overflow-hidden scroll-mt-24">
          <div className="slide-inner relative z-10 grid gap-10 py-24 md:py-28 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
            <div className="relative">
              <div className="terminal-readout mb-6 w-fit">~/portfolio $ boot --mode lab</div>
              <p className="kicker">arya://student-lab</p>

              <h1 className="title max-w-[11ch]">
                Personal terminal for builds, sound, and notes
              </h1>

              <p className="subtitle mt-7 md:mt-8">
                Projects, music, writing, and experiments from a student developer who likes fast interfaces with a
                visible pulse of signal noise.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link to="/projects" data-cursor-target className="big-btn magnetic-cta">
                  View Projects
                </Link>
                <Link to="/blog" data-cursor-target className="ghost-btn magnetic-cta">
                  Blog
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-slate-400">
                <span className="data-chip">React</span>
                <span className="data-chip data-chip--lime">Research</span>
                <span className="data-chip">Quartet</span>
                <span className="data-chip data-chip--dim">Writing</span>
              </div>
            </div>

            <TerminalStatusPanel />
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
            <a
                href="/#projects"
                data-cursor-target
                className="inline-flex flex-col items-center gap-2 text-slate-200/72 outline-none transition hover:text-slate-100 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.28em]">SCROLL</span>
              <span className="text-2xl leading-none">&#8964;</span>
            </a>
          </div>
        </section>

        <section id="projects" data-snap-section data-section-id="LAB:PROJECTS" className="lab-section slide scroll-mt-24">
          <div className="slide-divider" />
          <div className="slide-inner py-20 md:py-24">
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="terminal-readout mb-5 w-fit">repo index / featured</div>
                <p className="kicker">PROJECTS</p>
                <h2 className="title max-w-[14ch]">Featured Projects</h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300/78 md:text-xl">
                  A quick look at selected GitHub work across club sites, climate tools, and simulation experiments.
                </p>
              </div>

              <Button asChild className="magnetic-cta w-fit bg-cyan-200 text-slate-950 hover:bg-cyan-100">
                <Link to="/projects" data-cursor-target>View all projects</Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {featuredProjects.slice(0, 3).map((project) => (
                <ProjectCard key={`${project.owner}-${project.name}`} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="music" data-snap-section data-section-id="LAB:MUSIC" className="lab-section relative scroll-mt-24">
          <div className="slide-divider" />
          <div className="z-10 flex min-h-[100vh] items-center">
            <div className="slide-inner py-20 md:py-24">
              <div className="terminal-readout mb-5 w-fit">media buffer / click to load</div>
              <p className="kicker">MUSIC</p>

              <h2 className="title">
                Featured Performances
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
        </section>

        <section id="about" data-snap-section data-section-id="SYS:ABOUT" className="lab-section slide scroll-mt-24">
          <div className="slide-divider" />
          <div className="slide-inner py-20 md:py-24">
            <div className="space-y-6 md:space-y-8">
              <div className="terminal-readout w-fit">profile / current</div>
              <p className="kicker">ABOUT</p>

              <h2 className="title">
                I am an American High School student
              </h2>

              <p className="subtitle">Currently in 11th grade! (yikes college apps next year)</p>
            </div>
          </div>
        </section>

        <section id="contact" data-snap-section data-section-id="NET:CONTACT" className="lab-section slide scroll-mt-24">
          <div className="slide-divider" />
          <div className="slide-inner py-20 md:py-24">
            <div className="terminal-readout mb-5 w-fit">handshake / available</div>
            <p className="kicker">CONTACT</p>

            <h2 className="title">
              Contact and collaboration
            </h2>

            <p className="subtitle">I'm easily reachable on discord. I only check my email occasionally.</p>

            <div className="mt-8 space-y-4 text-xl text-slate-200/80">
              <p>
                GitHub:{" "}
                <a href={githubProfile.url} target="_blank" rel="noreferrer" data-cursor-target className="soft-link">
                  @{githubProfile.handle}
                </a>
              </p>
              <p>
                Discord:{" "}
                <a
                    href="https://discord.com/users/923779227856285757"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-target
                    className="soft-link"
                >
                  @arya
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:aryasalem@icloud.com" data-cursor-target className="soft-link">
                  aryasalem@icloud.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
  );
}
