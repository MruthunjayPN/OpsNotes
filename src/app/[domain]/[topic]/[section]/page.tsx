import { notFound } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { SectionTabs } from "@/components/content/SectionTabs";
import { TOC } from "@/components/layout/TOC";
import { MDXRenderer } from "@/components/content/MDXRenderer";
import { getTopicMeta } from "@/lib/navigation";
import { getPageContent } from "@/lib/content";

const DOMAIN_LABELS: Record<string, string> = {
  "mlops-systems": "MLOps Systems",
  "devops-platform": "DevOps & Platform",
  "architecture-decisions": "Architecture Decisions",
  "debugging-log": "Debugging Log",
};

interface PageProps {
  params: { domain: string; topic: string; section: string };
}

export default function SectionPage({ params }: PageProps) {
  const { domain, topic, section } = params;
  const meta = getTopicMeta(domain, topic);

  if (!meta || !meta.sections.includes(section)) {
    notFound();
  }

  const domainLabel = DOMAIN_LABELS[domain] ?? domain;
  const page = getPageContent(domain, topic, section);

  return (
    <>
      <TopBar
        domain={domain}
        domainLabel={domainLabel}
        topic={topic}
        topicTitle={meta.title}
        section={section}
        lastUpdated={page?.frontmatter.lastUpdated}
      />
      <SectionTabs
        sections={meta.sections}
        currentSection={section}
        domain={domain}
        topic={topic}
      />
      <div className="flex flex-1 min-h-0">
        <main className="flex-1 min-w-0 px-7 py-6">
          <div className="max-w-content">
            {page ? (
              <MDXRenderer source={page.source} />
            ) : (
              <div className="rounded border border-border bg-cardBg px-4 py-3">
                <p className="text-[11px] font-mono text-muted uppercase tracking-widest mb-2">
                  {meta.subtitle}
                </p>
                <h1 className="text-[21px] font-semibold text-text">
                  {meta.title}
                </h1>
                <p className="text-[13px] text-sub mt-2">
                  Content for{" "}
                  <span className="font-mono text-accent">{section}</span>{" "}
                  is not yet written.
                </p>
              </div>
            )}
          </div>
        </main>
        <TOC headings={page?.headings ?? []} />
      </div>
    </>
  );
}
