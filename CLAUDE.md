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
modeled on the Claude Code docs aesthetic — light theme, minimal, highly readable,
optimized for long-form technical content.

---

## Tech Stack

| Layer         | Choice                          | Reason                                              |
|---------------|---------------------------------|-----------------------------------------------------|
| Framework     | Next.js 14 (App Router)         | File-based routing, RSC, static export capable      |
| Language      | TypeScript (strict)             | Type safety across content schema and components    |
| Styling       | Tailwind CSS                    | Utility-first, consistent spacing and color system  |
| Content       | MDX (next-mdx-remote)           | Markdown + custom React blocks, Git-native          |
| Frontmatter   | gray-matter                     | Parse YAML metadata from MDX files                  |
| Syntax HL     | Shiki                           | Server-side, zero-flash code highlighting           |
| Search        | Pagefind                        | Static search index built at `next build`, fast     |
| State         | Zustand                         | Sidebar collapse, pinned pages, recent history      |
| Diagrams      | Mermaid.js (client-side)        | Rendered from fenced code blocks in MDX             |
| Fonts         | DM Sans + JetBrains Mono        | Body + code, consistent with design spec            |

---

## Design System

### Theme
- Light theme ONLY. No dark mode toggle (intentional).
- Aesthetic: Claude Code docs — neutral, minimal, distraction-free.
- No vibrant colors, no gradients, no shadows on cards.

### Color Tokens (defined in `tailwind.config.ts` and `src/styles/tokens.ts`)

```
bg:       #FAFAF9   (page background)
sideBg:   #F3F3EF   (sidebar background)
cardBg:   #FFFFFF   (card / surface)
codeBg:   #F5F5F1   (inline code, code blocks, key-value rows)
hover:    #EAEAE5
active:   #E4E4DE
border:   #E2E2DA
text:     #1C1C1A   (primary text)
sub:      #565650   (secondary text)
muted:    #9A9A90   (hints, labels, placeholders)
accent:   #C2410C   (active nav, links, step numbers — burnt orange)
accentBg: #FFF7ED
blue:     #1D4ED8   (Q badges in mental model blocks)
blueBg:   #EFF6FF
green:    #166534   (success, understood, stable badge)
greenBg:  #F0FDF4
amber:    #92400E   (WIP badge, unclear items, perf issues)
amberBg:  #FFFBEB
red:      #991B1B   (bug issues)
redBg:    #FEF2F2
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
eng-knowledge-platform/
├── CLAUDE.md                          ← this file
├── content/
│   ├── mlops-systems/
│   │   ├── spark-scorer/
│   │   │   ├── _meta.json             ← topic metadata (title, icon, order, tags)
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
│   │   ├── layout.tsx                 ← root layout (fonts, sidebar shell)
│   │   ├── page.tsx                   ← redirect to /mlops-systems/spark-scorer/overview
│   │   └── [domain]/
│   │       └── [topic]/
│   │           └── [section]/
│   │               └── page.tsx       ← dynamic MDX renderer page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx             ← breadcrumb + last updated
│   │   │   └── TOC.tsx                ← right-side heading anchors
│   │   ├── content/
│   │   │   ├── MDXRenderer.tsx        ← wraps next-mdx-remote with component map
│   │   │   ├── CodeBlock.tsx          ← Shiki highlighted, copy button
│   │   │   ├── MermaidDiagram.tsx     ← client-side mermaid renderer
│   │   │   ├── blocks/
│   │   │   │   ├── InvariantBlock.tsx
│   │   │   │   ├── CardsBlock.tsx
│   │   │   │   ├── KeyValueBlock.tsx
│   │   │   │   ├── FlowBlock.tsx
│   │   │   │   ├── TableBlock.tsx
│   │   │   │   ├── StepsBlock.tsx
│   │   │   │   ├── MentalModelBlock.tsx
│   │   │   │   ├── IssueCard.tsx
│   │   │   │   ├── KTNoteBlock.tsx
│   │   │   │   └── CodeSnippetBlock.tsx   ← for the /code section per topic
│   │   │   └── SectionTabs.tsx
│   │   ├── navigation/
│   │   │   ├── NavTree.tsx
│   │   │   └── SearchModal.tsx        ← Cmd+K, Pagefind-powered
│   │   └── ui/
│   │       ├── Badge.tsx              ← stable / wip / draft
│   │       └── Tag.tsx
│   ├── lib/
│   │   ├── content.ts                 ← MDX loader, frontmatter parser
│   │   ├── navigation.ts              ← builds nav tree from _meta.json files
│   │   ├── search.ts                  ← Pagefind integration helpers
│   │   └── related.ts                 ← resolves related pages from frontmatter tags
│   ├── store/
│   │   └── ui.ts                      ← Zustand: sidebar state, pinned pages, recents
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.ts                  ← color + typography constants (TS)
│   └── types/
│       ├── content.ts                 ← MDX frontmatter schema types
│       └── navigation.ts              ← NavItem, NavGroup types
├── public/
│   └── diagrams/                      ← Excalidraw SVG exports
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Content Model

### MDX Frontmatter Schema (TypeScript type in `src/types/content.ts`)

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

### _meta.json Schema (per topic folder)

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

These are the custom components available inside every `.mdx` file.
All accept typed props — see `src/components/content/blocks/` for interfaces.

| Component           | Purpose                                               |
|---------------------|-------------------------------------------------------|
| `<Invariant>`        | Core system invariant — orange left-border callout    |
| `<Cards>`            | 2–3 column grid of concept cards                      |
| `<KeyValue>`         | Horizontal key → value table (system facts)           |
| `<Flow>`             | Step-by-step horizontal flow diagram                  |
| `<DataTable>`        | Comparison / config parameter table                   |
| `<Steps>`            | Numbered walkthrough (workflow steps)                 |
| `<MentalModel>`      | Q&A pairs for mental model building                   |
| `<IssueCard>`        | Bug/Perf issue with symptom / cause / fix             |
| `<KTNote>`           | KT session block with coverage %, understood, unclear |
| `<CodeSnippet>`      | Named code panel with language, Shiki highlighting    |
| `<Callout>`          | Generic note / tip / warning callout                  |
| `<MermaidDiagram>`   | Inline mermaid diagram from a code string             |

### CodeSnippet usage in MDX

```mdx
<CodeSnippet
  title="Model Broadcast and mapInPandas scorer"
  language="python"
  file="pipeline/scorer.py"
>
```python
model = mlflow.pyfunc.load_model(config.model_uri)
broadcast_model = spark.sparkContext.broadcast(model)

def score_partition(iterator):
    m = broadcast_model.value
    for pdf in iterator:
        pdf["score"] = m.predict(pdf[feature_cols])
        yield pdf

scored_df = df.mapInPandas(score_partition, schema=output_schema)
```
</CodeSnippet>
```

---

## Routing Convention

```
URL pattern:  /[domain]/[topic]/[section]

Examples:
  /mlops-systems/spark-scorer/overview
  /mlops-systems/spark-scorer/architecture
  /mlops-systems/spark-scorer/code
  /mlops-systems/monitoring/concepts
  /devops-platform/azure-devops/pipeline-yaml
  /architecture-decisions/adr-001/overview
  /debugging-log/spark-issues/overview
```

Root `/` redirects to `/mlops-systems/spark-scorer/overview`.

---

## Navigation Tree

Built at build time in `src/lib/navigation.ts` by:
1. Reading all `content/**/` directories
2. Parsing each `_meta.json`
3. Grouping by domain
4. Ordering by `_meta.json` → `order` field

Nav groups (domains):
- MLOps Systems
- DevOps & Platform
- Architecture Decisions
- Debugging Log

Each NavItem has: `{ id, label, domain, topic, status, sections[] }`

---

## Search

- Tool: **Pagefind** (`npm run build` indexes all content automatically)
- Trigger: `Cmd+K` opens `SearchModal.tsx`
- Results show: page title, section, 2-line excerpt
- Install: `npm install pagefind`
- Build hook in `package.json`:
  ```json
  "postbuild": "pagefind --site .next --output-path public/pagefind"
  ```

---

## State Management (Zustand — `src/store/ui.ts`)

```typescript
interface UIStore {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  pinnedPages: string[];         // topic IDs
  pinPage: (id: string) => void;
  unpinPage: (id: string) => void;

  recentPages: string[];         // last 5 visited topic IDs
  addRecent: (id: string) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;
}
```

Persist `pinnedPages` and `recentPages` to `localStorage`.
Do NOT persist `sidebarCollapsed` or `searchQuery`.

---

## Coding Conventions

- **TypeScript strict mode** — no `any`, no implicit returns, no unused vars.
- **Named exports** for all components. No default exports except `page.tsx` files (Next.js requirement).
- **No inline styles** — use Tailwind utility classes only. Exception: computed/dynamic values (e.g. progress bar widths) may use CSS custom properties.
- **Component file naming**: PascalCase. (`Sidebar.tsx`, `InvariantBlock.tsx`)
- **Utility file naming**: camelCase. (`content.ts`, `navigation.ts`)
- **No barrel index.ts files** — import directly from the file.
- **No `console.log`** in committed code. Use `console.error` only for caught errors.
- All MDX block components must have **exported TypeScript interfaces** for their props.
- Server Components by default. Add `"use client"` only when hooks or browser APIs are required.

---

## Build and Dev Commands

```bash
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build + Pagefind index
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

---

## What NOT to Do

- Do NOT use `pages/` directory. App Router only (`src/app/`).
- Do NOT use CSS Modules or styled-components. Tailwind only.
- Do NOT add dark mode. Light theme is intentional and final.
- Do NOT add authentication. This is a local-first personal tool.
- Do NOT use a database. All content lives in `/content/**/*.mdx` files.
- Do NOT import Mermaid.js at the top level — it must be dynamically imported client-side only.
- Do NOT use `<img>` tags — use `next/image` for any images.
- Do NOT create new block types without adding them to `MDXRenderer.tsx`'s component map.

---

## Current Build Status

| Area                  | Status    | Notes                                        |
|-----------------------|-----------|----------------------------------------------|
| Project scaffold      | TODO      | First task in Claude Code                    |
| Sidebar + layout      | TODO      |                                              |
| MDX renderer          | TODO      |                                              |
| Block components      | TODO      | Reference: eng-knowledge-platform.jsx        |
| Spark Scorer content  | READY     | All 8 sections structured, needs MDX port    |
| Monitoring content    | TODO      |                                              |
| Feature Store content | TODO      |                                              |
| Retraining content    | TODO      |                                              |
| Search (Pagefind)     | TODO      |                                              |
| Deployment (Vercel)   | TODO      |                                              |

---

## Reference Prototype

A working React prototype exists at `eng-knowledge-platform.jsx` (from Claude chat).
It contains:
- Full design system implementation (colors, typography, spacing)
- All block type renderers (InvariantBlock, CardsBlock, FlowBlock, etc.)
- Complete Spark Scorer content across all sections
- Sidebar with search, nested groups, collapsible state
- Section tab navigation

Use this as the **visual and structural reference** when building real components.
The color tokens, block logic, and content data should be ported directly from it.

---

## Session Workflow Recommendation

Each Claude Code session should have ONE focused goal:

```
Session 1:  Scaffold Next.js project, install deps, confirm dev server runs
Session 2:  Build layout shell (root layout, sidebar, topbar, routing skeleton)
Session 3:  Build MDX renderer + all block components
Session 4:  Port Spark Scorer content into MDX files
Session 5:  Add Pagefind search + Cmd+K modal
Session 6:  Deploy to Vercel
```

Start each session by saying: "Read CLAUDE.md and confirm you understand the project
before we begin. Then [specific task for this session]."
