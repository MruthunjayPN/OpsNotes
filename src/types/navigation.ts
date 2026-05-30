export interface TopicMeta {
  id: string;
  title: string;
  icon: string;
  domain: string;
  status: "stable" | "wip" | "draft";
  order: number;
  subtitle: string;
  tags: string[];
  sections: string[];
}

export interface NavItem extends TopicMeta {
  href: string;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}
