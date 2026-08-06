import { parse } from "yaml";
import { z } from "zod";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type BlogFrontmatter = {
  title: string;
  description: string;
  published: string;
  updated?: string;
  draft?: boolean;
  tags?: string[];
  cover?: string;
  coverAlt?: string;
  coverCaption?: string;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  body: string;
  sourceLabel: string;
  readingTimeMinutes: number;
};

function isIsoDate(value: string) {
  if (!datePattern.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}

const frontmatterSchema = z
  .object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    published: z.string().refine(isIsoDate, "must be a valid YYYY-MM-DD date"),
    updated: z.string().refine(isIsoDate, "must be a valid YYYY-MM-DD date").optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string().trim().min(1)).optional(),
    cover: z
      .string()
      .trim()
      .min(1)
      .refine(
        (value) => {
          const relative = value.replace(/^\.\//, "");
          return !/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(value) && !relative.split("/").some((segment) => !segment || segment === "." || segment === "..");
        },
        "must be a relative file path inside this post's image folder",
      )
      .optional(),
    coverAlt: z.string().trim().min(1).optional(),
    coverCaption: z.string().trim().min(1).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.cover && !value.coverAlt) {
      context.addIssue({
        code: "custom",
        path: ["coverAlt"],
        message: "is required when cover is set",
      });
    }

    if (value.coverCaption && !value.cover) {
      context.addIssue({
        code: "custom",
        path: ["coverCaption"],
        message: "requires cover to be set",
      });
    }

    if (value.updated && value.updated < value.published) {
      context.addIssue({
        code: "custom",
        path: ["updated"],
        message: "cannot be earlier than published",
      });
    }
  });

function estimateReadingTime(body: string) {
  const words = body.replace(/[`*_#>[\]()]/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

/** Parse a source Markdown module without relying on browser or Vite APIs. */
export function parseBlogSource(source: string, slug: string, sourceLabel: string): BlogPost {
  if (!slugPattern.test(slug)) {
    throw new Error(`Invalid blog slug "${slug}" in ${sourceLabel}; use lowercase kebab-case.`);
  }

  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`Invalid blog post ${sourceLabel}; expected YAML frontmatter bounded by --- lines.`);
  }

  let parsed: unknown;
  try {
    parsed = parse(match[1]);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "invalid YAML";
    throw new Error(`Invalid frontmatter in ${sourceLabel}: ${detail}`);
  }

  const result = frontmatterSchema.safeParse(parsed);
  if (!result.success) {
    const details = result.error.issues.map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`).join("; ");
    throw new Error(`Invalid frontmatter in ${sourceLabel}: ${details}`);
  }

  return {
    ...result.data,
    slug,
    sourceLabel,
    body: match[2].trim(),
    readingTimeMinutes: estimateReadingTime(match[2]),
  };
}
