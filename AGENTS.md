# Portfolio Website Agent Workflow

## Scope

- This repository contains the Next.js frontend for the Portfolio Website project.
- The sibling backend repository is `/Users/kotyarya/Dev/Portfolio-Server`.
- Notion project `Portfolio Website` and its task database are the source of truth for priorities and status.

## Task workflow

1. Select the highest-priority unblocked task: Critical, High, Normal, then Low. Prefer security, production blockers, SEO, and dependency-unblocking work.
2. Before editing, tell the user which task was selected, why, the implementation idea, risks, and verification plan.
3. Move the Notion task to `В работе` and add a short progress note.
4. Use one branch per task named `codex/TASK-ID-short-description`.
5. Keep the change focused. Preserve unrelated user edits and never stage them silently.
6. Run the relevant checks. For frontend changes, normally run `npm run lint` and `npm run build`, plus focused tests when available.
7. Self-review the final diff for correctness, accessibility, responsive behavior, SEO, performance, and missing tests.
8. Commit with the Task ID, push the branch, and open a draft pull request.
9. Add the pull request URL and verification summary to Notion, then move the task to `Code Review`.
10. Mark `Definition of Done` only after all acceptance criteria are verified.

## Safety boundaries

- Do not merge pull requests or deploy production without explicit user approval.
- Ask before adding production dependencies, changing secrets, or performing destructive operations.
- Never commit credentials, `.env` contents, generated build output, or unrelated IDE files.
- If blocked, record the reason in Notion, set `Заблокировано`, and continue with another unblocked task when appropriate.

## Code expectations

- Treat recruiter clarity, accessibility, responsive behavior, performance, and technical SEO as product requirements.
- Prefer server-rendered metadata and semantic HTML where possible.
- Keep TypeScript strict and follow the existing Next.js, ESLint, and design conventions.
