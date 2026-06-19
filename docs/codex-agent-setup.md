# Codex Agent Setup

## Classification

personal-site is a frontend Vite/React/TypeScript/Tailwind portfolio site.

## Agent Settings

- `max_threads = 8`
- `max_depth = 1`
- `job_max_runtime_seconds = 1800`

Eight threads are useful for separating page/component mapping, implementation, visual review, accessibility/performance checks, build/lint validation, docs, and release hygiene. Depth stays at `1` because this is a normal frontend app and does not need recursive delegation.

## Custom Agents

- Global agents: `repo_scout`, `architect`, `implementer`, `tester`, `reviewer`, `security_auditor`, `docs_writer`, `release_manager`.
- Project agent: `frontend_mapper`.

## Recommended Prompt Pattern

```text
Use parallel subagents.
Goal: [personal-site task]
Scout affected pages, content files, and visual components first.
Keep dist/node_modules/generated artifacts untouched.
Run npm run build or npm run lint when relevant and safe.
```

## CSV Fanout Candidates

- Page-by-page visual review.
- Component accessibility/performance checks.
- Content module audits.
- Responsive layout sweeps.

## Tasks That Should Not Use Many Agents

- Small text edits.
- One CSS class change.
- Single content entry updates.

## Known Risks

- Animation and canvas-heavy components can affect performance and accessibility.
- `dist/` is generated and should not be manually edited.
- Vercel deployment changes require explicit approval.

## Commands Discovered

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

## Validation Performed

This setup pass inspected repo structure, package scripts, git status, and Codex docs. It did not run builds or browser checks.
