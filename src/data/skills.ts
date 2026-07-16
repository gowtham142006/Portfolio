import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
} from "lucide-react";
import type { SkillCategory } from "@/types";

/* ================================================================
   SKILLS DATA
   Organized by category with Lucide icons.
   Each skill has a name and optional icon identifier for future use.
   ================================================================ */

export const skillCategories: readonly SkillCategory[] = [
  {
    name: "Languages",
    icon: Code2,
    skills: [
      { name: "Dart" },
      { name: "Java" },
      { name: "Python" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "C" },
    ],
  },
  {
    name: "Frontend",
    icon: Layout,
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Flutter" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    name: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js" },
      { name: "Supabase" },
      { name: "Firebase" },
      { name: "REST APIs" },
    ],
  },
  {
    name: "Database",
    icon: Database,
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
    ],
  },
  {
    name: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Android Studio" },
      { name: "Figma" },
    ],
  },
] as const;
