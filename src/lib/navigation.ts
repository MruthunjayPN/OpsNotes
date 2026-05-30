import fs from "fs";
import path from "path";
import type { NavGroup, NavItem, TopicMeta } from "@/types/navigation";
export { formatSectionLabel } from "@/lib/format";

const CONTENT_DIR = path.join(process.cwd(), "content");

const DOMAIN_CONFIG: Record<string, { label: string; order: number }> = {
  "mlops-systems": { label: "MLOps Systems", order: 1 },
  "devops-platform": { label: "DevOps & Platform", order: 2 },
  "architecture-decisions": { label: "Architecture Decisions", order: 3 },
  "debugging-log": { label: "Debugging Log", order: 4 },
};

function readMetaJson(metaPath: string): TopicMeta | null {
  try {
    const raw = fs.readFileSync(metaPath, "utf-8");
    return JSON.parse(raw) as TopicMeta;
  } catch {
    return null;
  }
}

export function getNavigation(): NavGroup[] {
  const groups: NavGroup[] = [];

  let domains: string[] = [];
  try {
    domains = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return [];
  }

  for (const domain of domains) {
    const config = DOMAIN_CONFIG[domain];
    if (!config) continue;

    const domainDir = path.join(CONTENT_DIR, domain);
    let topicDirs: string[] = [];
    try {
      topicDirs = fs.readdirSync(domainDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);
    } catch {
      continue;
    }

    const items: NavItem[] = [];
    for (const topic of topicDirs) {
      const metaPath = path.join(domainDir, topic, "_meta.json");
      const meta = readMetaJson(metaPath);
      if (!meta) continue;

      items.push({
        ...meta,
        href: `/${domain}/${topic}/${meta.sections[0] ?? "overview"}`,
      });
    }

    items.sort((a, b) => a.order - b.order);

    if (items.length > 0) {
      groups.push({ id: domain, label: config.label, items });
    }
  }

  groups.sort(
    (a, b) =>
      (DOMAIN_CONFIG[a.id]?.order ?? 99) - (DOMAIN_CONFIG[b.id]?.order ?? 99)
  );

  return groups;
}

export function getTopicMeta(domain: string, topic: string): TopicMeta | null {
  const metaPath = path.join(CONTENT_DIR, domain, topic, "_meta.json");
  return readMetaJson(metaPath);
}

