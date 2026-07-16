import {
  GitBranch,
  Code2,
  Trophy,
  Zap,
  Award,
  Target,
} from "lucide-react";
import type { Achievement } from "@/types";

/* ================================================================
   ACHIEVEMENTS DATA
   Notable achievements and milestones.
   ================================================================ */

export const achievements: readonly Achievement[] = [
  {
  title: "GitHub Learning Journey",
  description:
    "Consistently building personal projects and improving my development skills through hands-on coding and version control with GitHub.",
  icon: GitBranch,
  metric: "28 Days",
},
  {
  title: "Personal Projects",
  description:
    "Designed and built multiple software projects using Flutter, Next.js, React, and Supabase to strengthen my full-stack development skills.",
  icon: Code2,
  metric: "3+ Projects",
},
  {
  title: "Continuous Learning",
  description:
    "Actively learning modern technologies through personal projects, documentation, online courses, and hands-on experimentation.",
  icon: Trophy,
},
  {
    title: "LeetCode Problem Solving",
    description:
      "Solved algorithmic problems on LeetCode, improving problem-solving skills and understanding of data structures.",
    icon: Zap,
    metric: "10+ Problems",
  },
  {
  title: "Engineering Student",
  description:
    "Pursuing a Bachelor of Engineering in Computer Science while building practical software projects and continuously improving development skills.",
  icon: Award,
},
  {
  title: "AI & Full-Stack Development",
  description:
    "Focused on building AI-powered mobile and web applications using Flutter, Next.js, Supabase, and modern development tools.",
  icon: Target,
},
] as const;
