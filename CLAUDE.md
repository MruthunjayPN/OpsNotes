# CLAUDE.md — Engineering Knowledge Platform

This file is read automatically by Claude Code at the start of every session.
Do not delete or rename it. Update it when architectural decisions change.

---

## Project Purpose

A personal internal engineering documentation platform for an AIOps Platform Engineer
working on ML/MLOps systems at Bread Financial (via Apexon). The platform stores
technical notes, architecture learnings, MLOps/DevOps concepts, project documentation,
workflows, code explanations, KT notes, debugging logs, and long-term engineering knowledge.

This is NOT a generic notes app. It is a professional engineering documentation system
modeled on the Claude Code docs aesthetic — minimal, highly readable, optimized for
long-form technical content.

---

## Tech Stack

| Layer       | Choice                  | Reason                                             |
|-------------|-------------------------|----------------------------------------------------|
| Framework   | Next.js 14 (App Router) | File-based routing, RSC, static export capable     |
| Language    | TypeScript (strict)     | Type safety across content schema and components   |
| Styling     | Tailwind CSS            | Utility-first, consistent spacing and color system |
| Content     | MDX (next-mdx-remote)   | Markdown + custom React blocks, Git-native         |
| Frontmatter | gray-matter             | Parse YAML metadata from MDX files                 |
| Syntax HL   | Shiki                   | Server-side, zero-flash code highlighting          |
| Search      | Pagefind                | Static search index built at `next build`, fast    |
| State       | Zustand                 | Sidebar collapse, theme, pinned pages, recents     |
| Diagrams    | Mermaid.js (client)     | Rendered from fenced code blocks in MDX            |
| Fonts       | DM Sans + JetBrains Mono| Body + code, consistent with design spec           |

Config file is `next.config.mjs` (not `.ts` — Next.js 14 doesn't support TS config).

---

## Design System

### Theme

Light and dark themes are both supported. Toggle is **user-controlled** (☀/◑ button in
TopBar), not system preference. Theme class (`dark`) is applied to `<html>`. Preference is
persisted to `localStorage` via Zustand.

Aesthetic: neutral, minimal, distraction-free. No vibrant colors, no gradients, no shadows.

### Color Tokens

Tokens are CSS variables defined in `src/styles/globals.css` as RGB channels (not hex) so
Tailwind's opacity modifier syntax (`bg-codeBg/40`, `border-accent/30`) works correctly.

Tailwind colors in `tailwind.config.ts` are wired as:
```ts
accent: "rgb(var(--accent) / <alpha-value>)"
```

Use Tailwind token names in components — **never hardcode hex values**:
```tsx
// Correct
<div className="bg-bg text-text border-border" />

// Wrong — do not do this
<div style={{ background: "#FAFAF9" }} />
```

Exception: computed inline styles (e.g. conic-gradient widths) must use `rgb(var(--token))`:
```tsx
style={{ background: `conic-gradient(rgb(var(--accent)) ${pct}deg, transparent 0)` }}
```

#### Light tokens (`:root`)

| Token      | Value     | Usage                                    |
|------------|-----------|------------------------------------------|
| `--bg`     | #FAFAF9   | Page background                          |
| `--side-bg`| #F3F3EF   | Sidebar background                       |
| `--card-bg`| #FFFFFF   | Card / surface                           |
| `--code-bg`| #F5F5F1   | Code blocks, key-value rows              |
| `--hover`  | #EAEAE5   | Hover state                              |
| `--active` | #E4E4DE   | Active / pressed state                   |
| `--border` | #E2E2DA   | Borders, dividers                        |
| `--text`   | #1C1C1A   | Primary text                             |
| `--sub`    | #565650   | Secondary text                           |
| `--muted`  | #9A9A90   | Hints, labels, placeholders              |
| `--accent` | #C2410C   | Active nav, links, step numbers (orange) |
| `--accent-bg` | #FFF7ED| Accent tint background                   |
| `--blue` / `--blue-bg`   | #1D4ED8 / #EFF6FF | Q badges in MentalModel |
| `--green` / `--green-bg` | #166534 / #F0FDF4 | Stable badge, understood |
| `--amber` / `--amber-bg` | #92400E / #FFFBEB | WIP badge, unclear items |
| `--red` / `--red-bg`     | #991B1B / #FEF2F2 | Bug issues               |

#### Dark tokens (`.dark`)

| Token      | Value     | Note                        |
|------------|-----------|-----------------------------|
| `--bg`     | #18171C   | Near-black, warm grey       |
| `--side-bg`| #1F1E24   | Slightly lighter than bg    |
| `--card-bg`| #26242C   | Card surface                |
| `--code-bg`| #2C2A33   | Code blocks                 |
| `--hover`  | #2E2C36   |                             |
| `--active` | #35323F   |                             |
| `--border` | #38353F   | Subtle warm grey            |
| `--text`   | #F0EEE9   | Off-white, warm             |
| `--sub`    | #A8A49E   | Secondary text              |
| `--muted`  | #635F5A   | Hints, labels               |
| `--accent` | #F97316   | Brighter orange in dark     |
| `--accent-bg` | #2A1A0E| Deep burnt orange tint      |
| `--blue` / `--blue-bg`   | #60A5FA / #1A2535 |          |
| `--green` / `--green-bg` | #4ADE80 / #0F2318 |          |
| `--amber` / `--amber-bg` | #FCD34D / #2A1F00 |          |
| `--red` / `--red-bg`     | #F87171 / #2A1010 |          |

### Syntax Highlighting (Shiki)

Both `CodeSnippetBlock` (shiki direct) and MDX fenced blocks (rehype-pretty-code) use
dual-theme: `{ light: "github-light", dark: "github-dark" }`. Dark-mode token colors are
applied via:
```css
.dark code[data-theme*=' '] span { color: var(--shiki-dark) !important; }
.dark .shiki span               { color: var(--shiki-dark) !important; }
```

### Typography

- Body: DM Sans, 400/500/600 weights only. Never 700+.
- Code: JetBrains Mono, 400/500.
- Base body size: 14px, line-height 1.7.
- Headings: h1=21px/600, h2=16px/600, h3=14px/600. Sentence case always.
- Labels / metadata: 10–11px, JetBrains Mono, uppercase, letterSpacing 0.08em.

### Spacing

- Page content padding: 24px 28px.
- Max content width: 840px.
- Section gap (between blocks): 24px.
- Card internal padding: 14px 16px.

---

## Folder Structure

```
OpsNotes/
├── CLAUDE.md
├── next.config.mjs                        ← note: .mjs not .ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── content/
│   ├── mlops-systems/
│   │   ├── spark-scorer/
│   │   │   ├── _meta.json                 ← topic metadata (title, icon, order, tags)
│   │   │   ├── 01-overview.mdx
│   │   │   ├── 02-architecture.mdx
│   │   │   ├── 03-workflow.mdx
│   │   │   ├── 04-configs.mdx
│   │   │   ├── 05-code.mdx
│   │   │   ├── 06-mental-model.mdx
│   │   │   ├── 07-debugging.mdx
│   │   │   └── 08-kt-notes.mdx
│   │   ├── monitoring/
│   │   ├── feature-store/
│   │   ├── retraining/
│   │   └── copilot-skills/
│   ├── devops-platform/
│   │   ├── azure-devops/
│   │   ├── mlflow-patterns/
│   │   └── unity-catalog/
│   ├── architecture-decisions/
│   └── debugging-log/
├── src/
│   ├── app/
│   │   ├── layout.tsx                     ← root layout: sidebar shell, no-FOUC theme script
│   │   ├── page.tsx                       ← redirect → /mlops-systems/spark-scorer/overview
│   │   └── [domain]/[topic]/[section]/
│   │       └── page.tsx                   ← dynamic MDX renderer page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx                ← collapsible, search input, nav tree
│   │   │   ├── TopBar.tsx                 ← breadcrumb + last updated + theme toggle
│   │   │   ├── ThemeToggle.tsx            ← client component: ☀/◑ button
│   │   │   └── TOC.tsx                    ← right-side heading anchors
│   │   ├── content/
│   │   │   ├── MDXRenderer.tsx            ← next-mdx-remote/rsc + component map
│   │   │   ├── CodeBlock.tsx              ← pre override: copy button, bg-codeBg
│   │   │   ├── MermaidDiagram.tsx         ← client-only, dynamic import
│   │   │   ├── SectionTabs.tsx            ← horizontal section tab strip
│   │   │   └── blocks/
│   │   │       ├── InvariantBlock.tsx
│   │   │       ├── CardsBlock.tsx
│   │   │       ├── KeyValueBlock.tsx
│   │   │       ├── FlowBlock.tsx
│   │   │       ├── TableBlock.tsx
│   │   │       ├── StepsBlock.tsx
│   │   │       ├── MentalModelBlock.tsx
│   │   │       ├── IssueCard.tsx
│   │   │       ├── KTNoteBlock.tsx
│   │   │       ├── CodeSnippetBlock.tsx   ← async RSC, shiki dual-theme
│   │   │       └── Callout.tsx
│   │   ├── navigation/
│   │   │   ├── NavTree.tsx
│   │   │   └── SearchModal.tsx            ← Cmd+K, Pagefind-powered
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       └── Tag.tsx
│   ├── lib/
│   │   ├── content.ts                     ← MDX loader + frontmatter parser
│   │   ├── navigation.ts                  ← builds nav tree from _meta.json (server-only)
│   │   ├── format.ts                      ← client-safe formatSectionLabel()
│   │   ├── search.ts
│   │   └── related.ts
│   ├── store/
│   │   └── ui.ts                          ← Zustand: sidebar, theme, pinned, recents
│   ├── styles/
│   │   ├── globals.css                    ← :root / .dark token blocks, MDX prose
│   │   └── tokens.ts                      ← light / dark token objects (TS)
│   └── types/
│       ├── content.ts                     ← MDX frontmatter schema
│       └── navigation.ts                  ← NavItem, NavGroup types
└── public/
    └── diagrams/                          ← Excalidraw SVG exports
```

---

## Content Model

### MDX Frontmatter Schema (`src/types/content.ts`)

Every `.mdx` file must have this header:

```yaml
---
title: "Spark Scorer — Architecture"
domain: mlops-systems
topic: spark-scorer
section: architecture
sectionIndex: 2
status: stable           # stable | wip | draft
priority: high           # high | medium | low
tags: [spark, mlflow, pyspark, inference, catboost]
lastUpdated: "2025-05-27"
related: [feature-store, monitoring, mlflow-patterns]
ktSession: "Session 1 — Apr 2025"   # optional
---
```

### `_meta.json` Schema (per topic folder)

```json
{
  "id": "spark-scorer",
  "title": "Spark Scorer",
  "icon": "◈",
  "domain": "mlops-systems",
  "status": "stable",
  "order": 1,
  "subtitle": "Distributed MLflow inference using Spark broadcast and mapInPandas",
  "tags": ["spark", "mlflow", "pyspark", "inference"],
  "sections": [
    "overview", "architecture", "workflow",
    "configs", "code", "mental-model", "debugging", "kt-notes"
  ]
}
```

---

## Block Types (MDX Components)

All components are in `src/components/content/blocks/` with exported TypeScript interfaces.
Register new ones in `MDXRenderer.tsx`'s component map — never add a block type without doing this.

| Component         | MDX tag          | Purpose                                        |
|-------------------|------------------|------------------------------------------------|
| InvariantBlock    | `<Invariant>`    | Core system invariant — orange left-border     |
| CardsBlock        | `<Cards>`        | 2–3 column grid of concept cards               |
| KeyValueBlock     | `<KeyValue>`     | Key → value table (system facts)               |
| FlowBlock         | `<Flow>`         | Step-by-step horizontal flow diagram           |
| TableBlock        | `<DataTable>`    | Comparison / config parameter table            |
| StepsBlock        | `<Steps>`        | Numbered walkthrough                           |
| MentalModelBlock  | `<MentalModel>`  | Q&A pairs for mental model building            |
| IssueCard         | `<IssueCard>`    | Bug/Perf issue: symptom / cause / fix          |
| KTNoteBlock       | `<KTNote>`       | KT session: coverage %, understood, unclear    |
| CodeSnippetBlock  | `<CodeSnippet>`  | Named code panel, Shiki dual-theme highlight   |
| Callout           | `<Callout>`      | note / tip / warning / error callout           |
| MermaidDiagram    | `<MermaidDiagram>` | Inline Mermaid diagram                       |

### CodeSnippet example

```mdx
<CodeSnippet
  title="Model Broadcast and mapInPandas scorer"
  language="python"
  file="pipeline/scorer.py"
  code={`
model = mlflow.pyfunc.load_model(config.model_uri)
broadcast_model = spark.sparkContext.broadcast(model)

def score_partition(iterator):
    m = broadcast_model.value
    for pdf in iterator:
        pdf["score"] = m.predict(pdf[feature_cols])
        yield pdf

scored_df = df.mapInPandas(score_partition, schema=output_schema)
  `}
/>
```

---

## Routing Convention

```
URL pattern:  /[domain]/[topic]/[section]

Examples:
  /mlops-systems/spark-scorer/overview
  /mlops-systems/spark-scorer/architecture
  /devops-platform/azure-devops/pipeline-yaml
  /architecture-decisions/adr-001/overview
  /debugging-log/spark-issues/overview
```

Root `/` redirects to `/mlops-systems/spark-scorer/overview`.

---

## State Management (`src/store/ui.ts`)

```typescript
interface UIStore {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  theme: "light" | "dark";          // persisted to localStorage
  toggleTheme: () => void;          // also mutates document.documentElement.classList

  pinnedPages: string[];            // topic IDs — persisted
  pinPage: (id: string) => void;
  unpinPage: (id: string) => void;

  recentPages: string[];            // last 5 visited — persisted
  addRecent: (id: string) => void;

  searchQuery: string;              // NOT persisted
  setSearchQuery: (q: string) => void;
}
```

Persisted fields: `theme`, `pinnedPages`, `recentPages`.
Not persisted: `sidebarCollapsed`, `searchQuery`.

localStorage key: `opsnotes-ui`. Zustand `persist` format: `{ state: {...}, version: 0 }`.

The no-FOUC inline script in `layout.tsx` reads this key and applies `.dark` to `<html>`
before React hydrates. `<html>` has `suppressHydrationWarning`.

---

## Navigation Tree

Built at request time in `src/lib/navigation.ts` (server-only — uses Node `fs`):
1. Reads all `content/**/` directories
2. Parses each `_meta.json`
3. Groups by domain, orders by `order` field

Nav groups (domains): MLOps Systems · DevOps & Platform · Architecture Decisions · Debugging Log

`src/lib/format.ts` is the client-safe split of label formatting (extracted to avoid
importing `fs` into client components).

---

## Search

- Tool: **Pagefind** — indexed at `npm run build`, zero JS overhead at runtime
- Trigger: `Cmd+K` opens `SearchModal.tsx`
- Results: page title, section, 2-line excerpt
- Build hook in `package.json`:
  ```json
  "postbuild": "pagefind --site .next --output-path public/pagefind"
  ```

---

## Coding Conventions

- **TypeScript strict mode** — no `any`, no implicit returns, no unused vars.
- **Named exports** for all components. Default exports only for `page.tsx` (Next.js requirement).
- **No inline styles** — use Tailwind utilities. Exception: computed values using `rgb(var(--token))`.
- **No hardcoded hex values** — always use Tailwind token classes or CSS variable references.
- **Component file naming**: PascalCase. (`Sidebar.tsx`, `InvariantBlock.tsx`)
- **Utility file naming**: camelCase. (`content.ts`, `navigation.ts`)
- **No barrel `index.ts` files** — import directly from the file.
- **No `console.log`** — use `console.error` only for caught errors.
- All MDX block components must have **exported TypeScript interfaces** for their props.
- Server Components by default. Add `"use client"` only when hooks or browser APIs are needed.

---

## Build Commands

```bash
npm run dev          # Dev server on localhost:3000
npm run build        # Production build + Pagefind index
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

---

## What NOT to Do

- Do NOT use `pages/` directory — App Router only (`src/app/`).
- Do NOT use CSS Modules or styled-components — Tailwind only.
- Do NOT add authentication — local-first personal tool.
- Do NOT use a database — all content lives in `/content/**/*.mdx`.
- Do NOT import Mermaid.js at the top level — dynamic import client-side only.
- Do NOT use `<img>` tags — use `next/image`.
- Do NOT hardcode color hex values in components — use Tailwind tokens or `rgb(var(--token))`.
- Do NOT create new block types without adding them to `MDXRenderer.tsx`'s component map.
- Do NOT commit directly to `main` — always use a session branch.

---

## Git Workflow

### Branch Strategy

| Branch type         | Pattern                  | Purpose                              |
|---------------------|--------------------------|--------------------------------------|
| Main                | `main`                   | Always deployable, never commit here |
| Session             | `session-N-description`  | One branch per Claude Code session   |
| Hotfix              | `hotfix-description`     | Urgent fix between sessions          |

### Session Start

```bash
git checkout main
git pull origin main
git checkout -b session-N-description
```

### Session End (always in this order)

1. Update `CLAUDE.md` — mark session DONE in build status, add any new decisions/conventions.
2. `git add .`
3. `git commit -m "session-N: description of what was built"`
4. `git push origin session-N-description`
5. Open PR on GitHub → review diff → merge to main.

### Commit Message Format

```
session-4: port spark-scorer content to MDX
session-dark-theme: CSS variable dark mode with Zustand toggle
hotfix: sidebar collapse on mobile
content: spark-scorer MDX all 8 sections complete
```

### What Claude Code Must Do at Session End

```
End of session. Do the following in order:
1. Update CLAUDE.md — mark this session DONE in the build status table.
   Add any new conventions, components, or decisions made this session.
2. git add .
3. git commit -m "session-N: [what was built]"
4. git push origin [current branch]
5. Confirm push succeeded and list changed files.
```

### Rules

- Never commit directly to `main`.
- Never force push.
- Never commit `node_modules/`, `.next/`, or `.env*` files.

### `.gitignore` (confirm present)

```
node_modules/
.next/
.env
.env.local
public/pagefind/
*.log
.DS_Store
```

---

## Current Build Status

| Area                    | Status | Branch / Notes                                          |
|-------------------------|--------|---------------------------------------------------------|
| Project scaffold        | DONE   | session-1: Next.js 14, all deps, folder structure       |
| Sidebar + layout shell  | DONE   | session-2: Sidebar, TopBar, TOC, SectionTabs, routing   |
| MDX renderer + blocks   | DONE   | session-3: MDXRenderer, 11 block components, sample MDX |
| Dark theme              | DONE   | session-dark-theme: CSS vars, Zustand toggle, no-FOUC   |
| DEL-001 debugging-log   | DONE   | content/del-001-score-divergence-all-sections: 6 sections added, 6 component prop aliases fixed |
| Spark Scorer content    | NEXT   | session-4: port all 8 sections to MDX                   |
| Monitoring content      | TODO   |                                                         |
| Feature Store content   | TODO   |                                                         |
| Retraining content      | TODO   |                                                         |
| Search (Pagefind)       | TODO   | session-5                                               |
| Deployment (Vercel)     | TODO   | session-6                                               |

---

## Reference Prototype

`eng-knowledge-platform.jsx` — a working React single-file prototype from early design phase.
Contains: full design system, all block renderers, complete Spark Scorer content, sidebar.

Use as **visual and content reference** when porting MDX sections. Do not use as code —
it predates the current architecture.

---

## Session Workflow

Each session has ONE focused goal. Start every session with:

> "Read CLAUDE.md and confirm you understand the project before we begin.
> Then [specific task for this session]."

| Session            | Goal                                          |
|--------------------|-----------------------------------------------|
| session-1          | Scaffold — DONE                               |
| session-2          | Layout shell — DONE                           |
| session-3          | MDX renderer + block components — DONE        |
| session-dark-theme | Dark theme — DONE                             |
| session-4          | Port Spark Scorer content (all 8 MDX files)   |
| session-5          | Pagefind search + Cmd+K modal                 |
| session-6          | Deploy to Vercel                              |
