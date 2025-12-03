import { Home, LayoutDashboard, Bot, FileText, Settings, Activity, Terminal, GitBranch } from "lucide-react";

export const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Bot, label: "Agent Studio", href: "/agents" },
  { icon: Terminal, label: "Live Operation", href: "/chat" },
  { icon: GitBranch, label: "Pipelines & ETL", href: "/pipelines" },
  { icon: FileText, label: "Knowledge Base", href: "/knowledge" },
  { icon: Activity, label: "Audit Logs", href: "/audit" },
  { icon: Settings, label: "Settings", href: "/settings" },
];
