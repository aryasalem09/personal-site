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
      className={`relative overflow-hidden rounded-lg border border-border bg-card shadow-soft ${className}`.trim()}
    >
      <div className={`w-full ${aspectClassName}`.trim()}>
        {isLoaded ? (
          <iframe
            className="h-full w-full"
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
            className="cursor-target group relative flex h-full w-full items-center justify-center overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`Play ${title}`}
          >
            <img
              src={thumbnailUrl}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-90 transition-opacity duration-200 group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-foreground/10 transition-colors group-hover:bg-foreground/5" />
            <span className="absolute inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-5 py-2.5 text-sm font-medium text-foreground shadow-soft backdrop-blur transition-colors group-hover:border-signal/50">
              <Play className="size-3.5" />
              Play
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
