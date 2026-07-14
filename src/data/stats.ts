import {
  FolderOpen,
  Cpu,
  GitBranch,
  Clock,
} from "lucide-react";
import type { Stat } from "@/types";

/* ================================================================
   STATISTICS DATA
   Key metrics displayed in the About section.
   ================================================================ */

export const stats: readonly Stat[] = [
  {
    label: "Projects Built",
    value: 10,
    suffix: "+",
    icon: FolderOpen,
  },
  {
    label: "Technologies",
    value: 15,
    suffix: "+",
    icon: Cpu,
  },
  {
    label: "GitHub Repos",
    value: 20,
    suffix: "+",
    icon: GitBranch,
  },
  {
    label: "Coding Hours",
    value: 1000,
    suffix: "+",
    icon: Clock,
  },
] as const;
