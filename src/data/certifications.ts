import {
  Coffee,
  Brain,
  Database,
} from "lucide-react";
import type { Certification } from "@/types";

/* ================================================================
   CERTIFICATIONS DATA
   Professional certifications and courses completed.
   ================================================================ */

export const certifications: readonly Certification[] = [
  {
    title: "Java (Basic) Skill Certification",
    issuer: "HackerRank",
    date: "2026",
    credentialUrl: "https://www.hackerrank.com/certificates/iframe/fdc5d0047110",
    description:
      "Validated core Java programming skills, including object-oriented programming, control flow, collections, and problem-solving fundamentals.",
    icon: Coffee,
  },
  {
    title: "Python (Basic) Skill Certification",
    issuer: "HackerRank",
    date: "2026",
    credentialUrl: "https://www.hackerrank.com/certificates/iframe/97baa201a299",
    description:
      "Demonstrated proficiency in Python fundamentals, including data structures, functions, loops, and basic programming concepts.",
    icon: Brain,
  },
  {
    title: "Intro to SQL",
    issuer: "Kaggle Learn",
    date: "2026",
    description:
      "Completed hands-on SQL training covering SELECT queries, filtering, sorting, aggregations, joins, and practical database querying techniques.",
    icon: Database,
  },
] as const;