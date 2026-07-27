import { cn } from "@/lib/utils";
import type { BrandMark as BrandMarkName } from "@/content/profile";

const brandMarks: Record<
  BrandMarkName,
  { src: string; alt: string; imageClassName: string }
> = {
  "texas-am": {
    src: "/brands/texas-am.svg",
    alt: "Texas A&M University",
    imageClassName: "h-8 w-8",
  },
  "ut-austin": {
    src: "/brands/ut-austin.svg",
    alt: "The University of Texas at Austin",
    imageClassName: "h-7 w-auto max-w-[5.5rem]",
  },
  asa: {
    src: "/brands/asa.png",
    alt: "American Statistical Association",
    imageClassName: "h-8 w-8",
  },
  "mecc-labs": {
    src: "/brands/mecc-labs-icon.jpg",
    alt: "MECC Labs",
    imageClassName: "h-8 w-8",
  },
  tsa: {
    src: "/brands/tsa.png",
    alt: "Technology Student Association",
    imageClassName: "h-7 w-auto max-w-[3.75rem]",
  },
};

type BrandMarkProps = {
  brand: BrandMarkName;
  decorative?: boolean;
  className?: string;
  imageClassName?: string;
};

export default function BrandMark({ brand, decorative = false, className, imageClassName }: BrandMarkProps) {
  const mark = brandMarks[brand];

  return (
    <span
      className={cn(
        "inline-flex min-w-10 items-center justify-center overflow-hidden rounded-sm border border-border bg-[#fffdf8] p-1.5",
        className,
      )}
    >
      <img
        src={mark.src}
        alt={decorative ? "" : mark.alt}
        className={cn("shrink-0 object-contain", mark.imageClassName, imageClassName)}
      />
    </span>
  );
}
