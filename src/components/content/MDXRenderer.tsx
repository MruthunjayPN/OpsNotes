import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { PluggableList } from "unified";

import { CodeBlock } from "./CodeBlock";
import { MermaidDiagram } from "./MermaidDiagram";
import { InvariantBlock } from "./blocks/InvariantBlock";
import { CardsBlock } from "./blocks/CardsBlock";
import { KeyValueBlock } from "./blocks/KeyValueBlock";
import { FlowBlock } from "./blocks/FlowBlock";
import { TableBlock } from "./blocks/TableBlock";
import { StepsBlock } from "./blocks/StepsBlock";
import { MentalModelBlock } from "./blocks/MentalModelBlock";
import { IssueCard } from "./blocks/IssueCard";
import { KTNoteBlock } from "./blocks/KTNoteBlock";
import { CodeSnippetBlock } from "./blocks/CodeSnippetBlock";
import { Callout } from "./blocks/Callout";

const components = {
  // HTML element overrides
  pre: CodeBlock,
  // Block components (used as JSX in MDX files)
  Invariant: InvariantBlock,
  Cards: CardsBlock,
  KeyValue: KeyValueBlock,
  Flow: FlowBlock,
  DataTable: TableBlock,
  Steps: StepsBlock,
  MentalModel: MentalModelBlock,
  IssueCard: IssueCard,
  KTNote: KTNoteBlock,
  CodeSnippet: CodeSnippetBlock,
  Callout: Callout,
  MermaidDiagram: MermaidDiagram,
};

const prettyCodeOptions: PrettyCodeOptions = {
  theme: "github-light",
  keepBackground: false,
};

const rehypePlugins: PluggableList = [
  rehypeSlug,
  [rehypePrettyCode, prettyCodeOptions],
];

const mdxOptions = {
  remarkPlugins: [remarkGfm] as PluggableList,
  rehypePlugins,
};

export function MDXRenderer({ source }: { source: string }) {
  return (
    <div className="mdx-content">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions }}
      />
    </div>
  );
}
