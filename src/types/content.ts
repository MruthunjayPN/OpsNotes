export interface MDXFrontmatter {
  title: string;
  domain: string;
  topic: string;
  section: string;
  sectionIndex: number;
  status: "stable" | "wip" | "draft";
  priority: "high" | "medium" | "low";
  tags: string[];
  lastUpdated: string;
  related: string[];
  ktSession?: string;
}
