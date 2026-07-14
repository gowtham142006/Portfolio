import type { Project } from "@/types";

/* ================================================================
   PROJECTS DATA
   Featured projects displayed in the portfolio.
   Each project has a slug for future detail page routing.
   Images use placeholder paths — replace with actual screenshots.
   ================================================================ */

export const projects: readonly Project[] = [
  {
    slug: "ai-productivity-app",
    title: "AI Productivity App",
    description:
      "AI-powered productivity platform built with Flutter and Supabase featuring intelligent chat assistant, task management, smart planner, notes, reminders, and authentication.",
    longDescription:
      "A comprehensive productivity suite that leverages artificial intelligence to help users manage their daily tasks more efficiently. The app features an intelligent chat assistant powered by modern AI models, a smart task management system with priority-based sorting, an AI-driven planner that suggests optimal schedules, a rich notes editor with markdown support, customizable reminders with push notifications, and secure authentication with multiple sign-in methods.",
    image: "/images/projects/ai-productivity.png",
    techStack: ["Flutter", "Dart", "Supabase", "AI/ML", "PostgreSQL"],
    features: [
      "Intelligent AI chat assistant",
      "Smart task management with priorities",
      "AI-powered daily planner",
      "Rich notes with markdown support",
      "Push notification reminders",
      "Secure authentication system",
    ],
    github: "https://github.com/gowtham142006",
    demo: "#",
    featured: true,
    date: "2025-12",
  },
  {
    slug: "chat-application",
    title: "Chat Application",
    description:
      "Real-time messaging application with modern UI, supporting one-on-one and group conversations with media sharing and read receipts.",
    longDescription:
      "A feature-rich real-time chat application built to demonstrate proficiency in real-time data synchronization, WebSocket connections, and modern mobile UI patterns. Supports text messaging, image and file sharing, group conversations, typing indicators, read receipts, and push notifications.",
    image: "/images/projects/chat-app.png",
    techStack: ["Flutter", "Firebase", "Dart", "Cloud Functions"],
    features: [
      "Real-time messaging",
      "Group conversations",
      "Media sharing",
      "Read receipts",
      "Push notifications",
      "Online status indicators",
    ],
    github: "https://github.com/gowtham142006",
    demo: "#",
    featured: true,
    date: "2025-10",
  },
  {
    slug: "virtual-queue-management",
    title: "Virtual Queue Management System",
    description:
      "Smart queue management platform that eliminates physical waiting lines with real-time position tracking, estimated wait times, and instant notifications.",
    longDescription:
      "An innovative solution to the age-old problem of waiting in lines. This system digitizes the queue experience, allowing users to join queues remotely, track their position in real-time, receive accurate wait time estimates, and get notified when their turn approaches. Built for hospitals, banks, restaurants, and government offices.",
    image: "/images/projects/queue-management.png",
    techStack: ["Flutter", "Node.js", "Supabase", "PostgreSQL"],
    features: [
      "Virtual queue joining",
      "Real-time position tracking",
      "Estimated wait times",
      "Push notifications",
      "Multi-branch support",
      "Analytics dashboard",
    ],
    github: "https://github.com/gowtham142006",
    featured: true,
    date: "2025-08",
  },
  {
    slug: "expense-tracker",
    title: "Personal Expense Tracker",
    description:
      "Comprehensive personal finance management app with visual analytics, budget tracking, category-wise spending insights, and export capabilities.",
    longDescription:
      "A personal finance companion that helps users track their income and expenses, set budgets, visualize spending patterns, and make informed financial decisions. Features include automatic categorization, recurring transaction support, visual charts and graphs, budget alerts, and CSV export for tax purposes.",
    image: "/images/projects/expense-tracker.png",
    techStack: ["Flutter", "Dart", "SQLite", "Charts"],
    features: [
      "Income and expense tracking",
      "Visual analytics with charts",
      "Budget management",
      "Category-wise insights",
      "Recurring transactions",
      "Data export (CSV)",
    ],
    github: "https://github.com/gowtham142006",
    featured: false,
    date: "2025-06",
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
    github: "https://github.com/gowtham142006",
    demo: "https://gowtham.dev",
    featured: false,
    date: "2025-07",
  },
] as const;
