import {
  Rocket,
  Code2,
  Users,
  GraduationCap,
} from "lucide-react";
import type { TimelineEntry } from "@/types";

/* ================================================================
   EXPERIENCE DATA
   Timeline entries for professional and personal experience.
   ================================================================ */

export const experiences: readonly TimelineEntry[] = [
  {
  title: "Personal Projects",
  subtitle: "Self-directed Software Development",
  date: "2025 — Present",
  description:
    "Designed and developed multiple personal projects to strengthen my skills in Flutter, React, Next.js, and backend development. Built applications including a Smart Productivity App, Chat Application, and Portfolio Website while learning modern software engineering practices.",
  tags: [
    "Flutter",
    "Next.js",
    "React",
    "Supabase",
    "TypeScript"
  ],
  icon: Rocket,
},
  {
  title: "Continuous Learning",
  subtitle: "Self-Learning",
  date: "2024 — Present",
  description:
    "Continuously improving my software development skills by building personal projects, solving coding problems, and learning modern frameworks including Flutter, React, Next.js, and Supabase.",
  tags: [
      "Flutter",
      "React",
      "Problem Solving",
      "Self Learning"
    ],
  icon: Code2,
},
  {
    title: "College Tech Activities",
    subtitle: "Kings Engineering College",
    date: "2023 — Present",
    description:
"Actively participating in technical workshops, coding events, and project-based learning while collaborating with classmates on software development projects.",
    tags: ["Leadership", "Workshops", "Events"],
    icon: Users,
  },
  {
    title: "Computer Science Student",
    subtitle: "Academic Excellence",
    date: "2023 — 2027",
    description:
  "Pursuing a Bachelor of Engineering in Computer Science at Kings Engineering College. Building a strong foundation in data structures, algorithms, software engineering, database systems, and artificial intelligence while applying these concepts through real-world projects.",
    tags: ["Data Structures", "Algorithms", "Machine Learning", "Artificial Intelligence"],
    icon: GraduationCap,
  },
] as const;
