import { Pin, Stamp } from "@/components/scrapbook/Scraps";
import { tiltStyle } from "@/lib/scatter";

const facts: { k: string; v: string }[] = [
  { k: "grade", v: "11th" },
  { k: "builds", v: "small web things" },
  { k: "plays", v: "string quartet" },
  { k: "into lately", v: "reef data" },
];

export default function AboutPage() {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_13rem]">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">who I am</p>
        <h2 className="headline mt-3 text-4xl md:text-5xl">a little about me</h2>

        <div className="paper-ruled mt-6 max-w-xl space-y-4 rounded-md border-2 border-edge/70 p-5 font-note text-xl leading-relaxed text-ink shadow-hard-sm">
          <p>
            I&rsquo;m a high school junior, and most of what I make starts as a problem at school
            or a thing I got curious about and couldn&rsquo;t drop.
          </p>
          <p>
            I like taking something tangled and making it legible. Right now that&rsquo;s a map of
            which reefs are bleaching, and whatever small site a club at school needs next.
          </p>
          <p>
            The rest is smaller: an ecosystem that misbehaves in Rust, pi estimated in Fortran for
            the joke, a webmaster page with an actual rubric.
          </p>
          <p>
            Away from the screen I play in a string quartet with friends. That part is mostly
            listening hard and trying not to rush.
          </p>
        </div>

        <p className="mt-4 max-w-xl font-hand text-xl leading-tight text-terracotta">
          not a startup founder. just a kid who likes making things and then showing them to people.
        </p>
      </div>

      {/* pinned index card of quick facts */}
      <aside className="relative mx-auto w-52 self-start" style={tiltStyle("about-card", 3)}>
        <Pin tone="rose" className="left-1/2 top-1.5 -translate-x-1/2" />
        <div className="card-paper p-4">
          <p className="mb-3 text-center font-marker text-base text-olive">the short version</p>
          <dl className="space-y-2">
            {facts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-2">
                <dt className="font-mono text-[0.7rem] uppercase tracking-wide text-ink-soft">
                  {f.k}
                </dt>
                <dd className="font-hand text-lg text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex justify-center">
            <Stamp tone="olive" rotate={-7}>
              est. 2025
            </Stamp>
          </div>
        </div>
      </aside>
    </div>
  );
}
