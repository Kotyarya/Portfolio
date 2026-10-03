# Portfolio Website - Frontend

[![CI](https://github.com/Kotyarya/Portfolio/actions/workflows/ci.yml/badge.svg?branch=Dev)](https://github.com/Kotyarya/Portfolio/actions/workflows/ci.yml)
[![Live](https://img.shields.io/badge/live-aksamitny.com-AD9255)](https://aksamitny.com)

Recruiter-focused portfolio for Maksym Aksamitnyi, built as the public interface of a full-stack content platform. It presents skills and evidence-based project case studies, provides an accessible contact flow, and includes server-rendered technical SEO.

![Portfolio project preview](https://portfolio-server-0e3k.onrender.com/media/portfolioPreview.png)

## Live links

- [Production website](https://aksamitny.com)
- [Portfolio case study](https://aksamitny.com/projects?projectId=13)
- [Backend repository](https://github.com/Kotyarya/Portfolio-Server)

## Architecture

```text
Browser
  -> Next.js App Router on Vercel
      -> server-only API client with x-api-key
          -> NestJS API on Render
              -> PostgreSQL through Prisma
              -> media responses and contact email delivery
```

The browser never receives the backend API key. Content is fetched in server components and cached with Next.js revalidation tags. Query-driven project filters and modals use clean canonical URLs and `noindex,follow` on query variants.

## Key decisions

- Semantic headings, accessible navigation and field-specific contact validation are treated as product requirements.
- The strongest projects expose Problem, Role, Architecture, Decisions and Result instead of a generic technology list.
- Responsive images use explicit `sizes`; desktop and mobile layouts do not duplicate semantic content.
- Security headers are defined centrally in `next.config.ts`.
- A local mock API keeps CI deterministic and prevents tests from using production data or secrets.

## Stack

- Next.js 15 App Router, React 19 and TypeScript
- Tailwind CSS 4
- React Hook Form, React Select and Swiper
- Vitest for critical frontend logic
- Vercel for frontend delivery

## Local setup

Requirements: Node.js 20 and npm.

```bash
git clone https://github.com/Kotyarya/Portfolio.git
cd Portfolio
npm ci
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The backend must be running and the frontend `SECRET_KEY` must match its `API_KEY`.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the NestJS API |
| `SECRET_KEY` | Server-only key sent to protected API endpoints |
| `REVALIDATE_TOKEN` | Secret for the internal revalidation endpoint |

Never commit real values. `.env.example` contains placeholders only.

## Quality commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

GitHub Actions runs deterministic install, zero-warning lint, type checking, tests and a production build on pull requests and pushes to `Dev` or `main`.

## Deployment

Vercel deploys the frontend from GitHub and supplies production environment variables. The custom domain is [aksamitny.com](https://aksamitny.com). Backend deployment and environment details live in the [server README](https://github.com/Kotyarya/Portfolio-Server#readme).
