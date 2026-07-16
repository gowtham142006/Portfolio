import type { Project } from "@/types";

/* ================================================================
   PROJECTS DATA
   Featured projects displayed in the portfolio.
   Each project has a slug for future detail page routing.
   Images use placeholder paths — replace with actual screenshots.
   ================================================================ */

export const projects: readonly Project[] = [
  {
    slug: "smart-productivity-app",
    title: "Smart Productivity App",
    description:
      "AI-powered productivity platform built with Flutter and Supabase featuring intelligent chat assistant, task management, smart planner, notes, reminders, and authentication.",
    longDescription:
      "A comprehensive productivity suite that leverages artificial intelligence to help users manage their daily tasks more efficiently. The app features an intelligent chat assistant powered by modern AI models, a smart task management system with priority-based sorting, an AI-driven planner that suggests optimal schedules, a rich notes editor with markdown support, customizable reminders with push notifications, and secure authentication with multiple sign-in methods.",
    image: "/images/projects/smart-productivity.png",
    techStack: [
"Flutter",
"Dart",
"Riverpod",
"Supabase",
"PostgreSQL",
"Gemini API"
],
    features: [
      "Intelligent AI chat assistant",
      "Smart task management with priorities",
      "AI-powered daily planner",
      "Rich notes with markdown support",
      "Push notification reminders",
      "Secure authentication system",
    ],
    github: "https://github.com/gowtham142006/Smart-Productivity-App",
    demo: "",
    featured: true,
    date: "2026-07",
  },
  {
    slug: "chat-application",
    title: "Chat Application",
    description:
      "Real-time messaging application with modern UI, supporting one-on-one with message sharing and read receipts.",
    longDescription:
      "A feature-rich real-time chat application built to demonstrate proficiency in real-time data synchronization, WebSocket connections, and modern mobile UI patterns. Supports text messaging, AES encryption, avatar support, read receipts, Message deletion functionality, and push notifications.",
    image: "/images/projects/chat-icon-512.png",
    techStack: ["Next.js", "TypeScript","Firebase", "Supabase", "PostgreSQL"],
    features: [
      "Real-time messaging",
      "Avatar support",
      "AES encryption",
      "Read receipts",
      "Push notifications",
      "Online status indicators",
    ],
    github: "https://github.com/gowtham142006/chat_app",
    demo: "https://chat-app-six-phi-32.vercel.app",
    featured: true,
    date: "2025-10",
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    description:
      "Modern, animated developer portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion — the website you're currently viewing.",
    longDescription:
      "A premium developer portfolio designed and built from scratch using modern web technologies. Features include smooth Framer Motion animations, dark/light theme support, responsive design, glassmorphism effects, a command palette, and comprehensive SEO optimization. Built with performance and accessibility as top priorities.",
    image: "/images/projects/portfolio.png",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      "Smooth animations",
      "Dark/light theme",
      "Command palette (Ctrl+K)",
      "Responsive design",
      "SEO optimized",
      "Accessibility first",
    ],
    github: "https://github.com/gowtham142006/Portfolio",
    demo: "",
    featured: false,
    date: "2026-07",
  },
] as const;
