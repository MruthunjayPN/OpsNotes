const SECTION_LABEL_OVERRIDES: Record<string, string> = {
  "kt-notes": "KT Notes",
  "mental-model": "Mental Model",
  "pipeline-yaml": "Pipeline YAML",
  "variable-groups": "Variable Groups",
  "experiment-tracking": "Experiment Tracking",
  "model-registry": "Model Registry",
};

export function formatSectionLabel(slug: string): string {
  return (
    SECTION_LABEL_OVERRIDES[slug] ??
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}
