import {
  Rocket,
  Code2,
  Users,
  Trophy,
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
    subtitle: "Self-directed Development",
    date: "2024 — Present",
    description:
      "Building full-stack applications independently, focusing on Flutter mobile development and React/Next.js web applications. Developed 10+ projects including an AI-powered productivity app, real-time chat application, and virtual queue management system.",
    tags: ["Flutter", "React", "Next.js", "AI", "Supabase"],
    icon: Rocket,
  },
  {
    title: "Hackathon Participant",
    subtitle: "Various Hackathons",
    date: "2024 — Present",
    description:
      "Participated in multiple hackathons, solving real-world problems under time constraints. Developed innovative solutions in areas like healthcare, education, and productivity. Improved rapid prototyping and teamwork skills.",
    tags: ["Problem Solving", "Teamwork", "Rapid Prototyping"],
    icon: Trophy,
  },
  {
    title: "Open Source Contributor",
    subtitle: "GitHub Community",
    date: "2024 — Present",
    description:
      "Contributing to open-source projects on GitHub, reviewing code, submitting pull requests, and maintaining personal repositories. Active in the Flutter and React developer communities.",
    tags: ["Git", "GitHub", "Code Review", "Community"],
    icon: Code2,
  },
  {
    title: "College Tech Activities",
    subtitle: "Kings Engineering College",
    date: "2023 — Present",
    description:
      "Active participant in college technical events, coding competitions, and workshops. Mentoring junior students in mobile app development and web technologies.",
    tags: ["Leadership", "Mentoring", "Events"],
    icon: Users,
  },
  {
    title: "Computer Science Student",
    subtitle: "Academic Excellence",
    date: "2023 — 2027",
    description:
      "Pursuing B.E. in Computer Science at Kings Engineering College, Anna University. Focusing on data structures, algorithms, machine learning, and software engineering principles.",
    tags: ["Algorithms", "Data Structures", "Machine Learning"],
    icon: GraduationCap,
  },
] as const;
