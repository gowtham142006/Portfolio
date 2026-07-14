import { GraduationCap } from "lucide-react";
import type { EducationEntry } from "@/types";

/* ================================================================
   EDUCATION DATA
   Academic background and qualifications.
   ================================================================ */

export const education: readonly EducationEntry[] = [
  {
    institution: "Kings Engineering College",
    degree: "Bachelor of Engineering",
    field: "Computer Science and Engineering",
    university: "Anna University",
    date: "2023 — 2027 (Expected)",
    description:
      "Pursuing a Bachelor of Engineering in Computer Science at Kings Engineering College, affiliated with Anna University. Coursework includes Data Structures, Algorithms, Database Management Systems, Operating Systems, Machine Learning, Artificial Intelligence, and Software Engineering. Active participant in technical clubs and hackathons.",
    icon: GraduationCap,
  },
] as const;
