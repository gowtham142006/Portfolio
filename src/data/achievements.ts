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
    title: "GitHub Streak",
    description:
      "Maintained a consistent coding streak on GitHub, contributing to personal and open-source projects daily.",
    icon: GitBranch,
    metric: "100+ Days",
  },
  {
    title: "Projects Completed",
    description:
      "Successfully designed, developed, and deployed multiple full-stack applications from concept to production.",
    icon: Code2,
    metric: "10+ Projects",
  },
  {
    title: "Hackathon Participation",
    description:
      "Competed in multiple hackathons, building innovative solutions under tight deadlines and presenting to judges.",
    icon: Trophy,
    metric: "5+ Hackathons",
  },
  {
    title: "LeetCode Problem Solving",
    description:
      "Solved algorithmic problems on LeetCode, improving problem-solving skills and understanding of data structures.",
    icon: Zap,
    metric: "100+ Problems",
  },
  {
    title: "Academic Excellence",
    description:
      "Maintained strong academic performance while actively pursuing self-directed learning in modern technologies.",
    icon: Award,
  },
  {
    title: "Community Mentoring",
    description:
      "Mentored junior students in mobile app development and web technologies, helping them build their first projects.",
    icon: Target,
    metric: "10+ Students",
  },
] as const;
