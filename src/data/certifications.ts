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
    title: "Flutter Development",
    issuer: "Google",
    date: "2024",
    description:
      "Comprehensive Flutter development certification covering widget architecture, state management, animations, and platform-specific development for iOS and Android.",
    icon: Smartphone,
  },
  {
    title: "Java Programming",
    issuer: "Oracle",
    date: "2024",
    description:
      "Core Java programming certification covering object-oriented programming, data structures, multithreading, and enterprise application development.",
    icon: Coffee,
  },
  {
    title: "Python for AI & ML",
    issuer: "Google",
    date: "2024",
    description:
      "Python programming certification with focus on artificial intelligence, machine learning algorithms, data analysis, and model deployment.",
    icon: Brain,
  },
  {
    title: "AI Fundamentals",
    issuer: "Microsoft",
    date: "2024",
    description:
      "Foundational AI certification covering machine learning concepts, neural networks, natural language processing, and computer vision.",
    icon: Brain,
  },
  {
    title: "Cloud Computing",
    issuer: "Google Cloud",
    date: "2024",
    description:
      "Cloud infrastructure certification covering compute engines, cloud storage, serverless functions, and deployment strategies.",
    icon: Cloud,
  },
  {
    title: "Web Development",
    issuer: "freeCodeCamp",
    date: "2024",
    description:
      "Full-stack web development certification covering HTML, CSS, JavaScript, React, Node.js, and responsive design principles.",
    icon: Code2,
  },
] as const;
