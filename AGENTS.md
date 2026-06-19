# Personal Site Codex Instructions

## Project Purpose

This repository is a Vite/React/TypeScript personal portfolio site with Tailwind styling, shadcn-style UI primitives, content modules, and animated visual components.

## Stack

- Frontend: Vite, React, TypeScript.
- Styling: Tailwind and component primitives under `src/components/ui/`.
- Content: `src/content/`.
- Pages/layouts: `src/pages/` and `src/layouts/`.
- Deployment config: `vercel.json`.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Preview: `npm run preview`

## Working Rules

- Preserve personal content and project copy unless the task explicitly changes it.
- Keep visual edits responsive and verify in browser when practical.
- Treat animation/canvas-heavy components as performance-sensitive; preserve reduced-motion behavior.
- Do not edit `dist/`, `node_modules/`, or generated artifacts manually.
- Do not deploy or change Vercel/project infrastructure without explicit approval.

## Codex Subagent Policy

- Codex should use parallel subagents for nontrivial work when there are independent workstreams.
- Fanout must be justified by independent workstreams; prefer 4-8 agents for normal tasks.
- Use 8-12 only for large independent modules, audits, migrations, frontend sweeps, or test/review passes.
- Do not spawn agents that edit the same file at the same time.
- Keep `max_depth = 1` unless the repo-specific config explains why `2` is justified.
- Always use a read-only scout before major edits.
- Always use independent tester/reviewer agents before claiming completion.
- Use CSV fanout for repeated independent tasks like page reviews, component checks, content audits, accessibility sweeps, or performance-sensitive visual review.

## Recommended Roles

- `repo_scout` and `frontend_mapper` before major frontend changes.
- `architect` for page-structure, content-model, or animation architecture changes.
- `implementer` for bounded page/component edits.
- `tester`, `reviewer`, and `release_manager` before final handoff.

## Definition of Done

- Relevant build/lint/browser checks were run, or skipped with a clear reason.
- Responsive layout, accessibility, and reduced-motion implications were considered for visual changes.
- Deployment and generated artifact changes were not made without explicit approval.
