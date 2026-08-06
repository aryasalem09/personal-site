# Writing on this site

Posts are local Markdown files in `src/content/blog/`. The files are bundled at build time; there is no CMS or publish dashboard.

## Create and write

1. Run `npm run new:post -- "My post title"`. This creates the Markdown file and matching image folder for you.
2. Complete `title`, `description`, and `published` (`YYYY-MM-DD`) in the YAML frontmatter.
3. Write standard Markdown below the closing `---`. Tables, task lists, and strikethrough are supported.

You can also copy `src/content/blog/_template.md` manually. The filename must use lowercase kebab-case.

## Images

Put post-specific images in `public/blog/<slug>/` (for example, `public/blog/my-post-title/`). Reference them with a relative Markdown path; the site turns `![Alt text](diagram.webp)` into `/blog/my-post-title/diagram.webp`.

To show a visible caption, use standard Markdown image-title syntax:

```md
![Alt text](diagram.webp "A short, visible caption.")
```

The title becomes the caption; omit it when no caption is needed. Keep meaningful alt text for informative images.

Set `cover` and `coverAlt` in frontmatter for an optional lead image; use the same relative filename. Add `coverCaption` when the lead image needs a visible caption.

## Drafts and checks

Set `draft: true` to see a post locally without including it in a production build. Files starting with `_` are ignored, which is why the template is safe to keep in the folder.

Run these checks before pushing:

```powershell
npm run blog:check
npm run lint
npm run build
```

Preview locally while writing with:

```powershell
npm run dev
```

The preview reloads when you save Markdown or add an image. If you create a post by copying the template instead of using `new:post`, restart the preview once so its direct URL is generated.

Then review `/blog` and the post URL, check image paths and mobile layout, stage only the new Markdown and image files you intend to publish, and push through the repository's normal Git workflow.
