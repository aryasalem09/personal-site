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
  return (
    <div
      className={`cursor-target relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/35 shadow-[0_18px_40px_rgba(2,6,23,0.28)] ${className}`.trim()}
    >
      <div className={`w-full ${aspectClassName}`.trim()}>
        <iframe
          className="cursor-target pointer-events-auto h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}
