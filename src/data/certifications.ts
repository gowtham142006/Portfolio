import {
  Smartphone,
  Coffee,
  Brain,
  Cloud,
  Code2,
} from "lucide-react";
import type { Certification } from "@/types";

/* ================================================================
   CERTIFICATIONS DATA
   Professional certifications and courses completed.
   ================================================================ */

export const certifications: readonly Certification[] = [
  {
    title: "Java Programming",
    issuer: "Oracle",
    date: "2026",
    description:
      "Core Java programming certification covering object-oriented programming, data structures, multithreading, and enterprise application development.",
    icon: Coffee,
  },
] as const;
