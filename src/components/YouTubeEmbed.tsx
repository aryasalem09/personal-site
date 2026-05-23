import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  youtubeId: string;
  title: string;
  className?: string;
  aspectClassName?: string;
}

export default function YouTubeEmbed({
  youtubeId,
  title,
  className = "",
  aspectClassName = "aspect-video",
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <div
      className={`relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/35 shadow-[0_18px_40px_rgba(2,6,23,0.28)] ${className}`.trim()}
    >
      <div className={`w-full ${aspectClassName}`.trim()}>
        {isLoaded ? (
          <iframe
            className="pointer-events-auto h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&autoplay=1`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            className="group relative flex h-full w-full items-center justify-center overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            aria-label={`Play ${title}`}
          >
            <img
              src={thumbnailUrl}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-75 transition duration-200 group-hover:scale-[1.01] group-hover:opacity-90"
            />
            <span className="absolute inset-0 bg-slate-950/30" />
            <span className="absolute inline-flex items-center gap-3 rounded-full border border-white/15 bg-slate-950/72 px-5 py-3 text-sm font-semibold text-slate-100 shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition group-hover:bg-slate-900/88">
              <Play data-icon="inline-start" />
              Play performance
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
