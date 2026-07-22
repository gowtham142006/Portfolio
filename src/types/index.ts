import type { LucideIcon } from "lucide-react";

/* ================================================================
   TYPE DEFINITIONS
   Central type definitions for the entire portfolio.
   All data files import from here to ensure consistency.
   ================================================================ */

// --- Personal ---

export interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly icon: LucideIcon | string;
  readonly label: string;
}

export interface PersonalInfo {
  readonly name: string;
  readonly roles: readonly string[];
  readonly tagline: string;
  readonly bio: string;
  readonly email: string;
  readonly location: string;
  readonly resumeUrl: string;
  readonly avatar: string;
  readonly socials: readonly SocialLink[];
}

// --- Navigation ---

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

// --- Projects ---

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly longDescription: string;
  readonly image: string;
  readonly techStack: readonly string[];
  readonly features: readonly string[];
  readonly github?: string;
  readonly demo?: string;
  readonly featured: boolean;
  readonly date: string;
}

// --- Skills ---

export interface Skill {
  readonly name: string;
  readonly icon?: string;
}

export interface SkillCategory {
  readonly name: string;
  readonly icon: LucideIcon;
  readonly skills: readonly Skill[];
}

// --- Experience ---

export interface TimelineEntry {
  readonly title: string;
  readonly subtitle: string;
  readonly date: string;
  readonly description: string;
  readonly tags?: readonly string[];
  readonly icon?: LucideIcon;
}

// --- Education ---

export interface EducationEntry {
  readonly institution: string;
  readonly degree: string;
  readonly field: string;
  readonly university: string;
  readonly date: string;
  readonly description: string;
  readonly grade?: string;
  readonly icon?: LucideIcon;
}

// --- Certifications ---

export interface Certification {
  readonly title: string;
  readonly issuer: string;
  readonly date: string;
  readonly description: string;
  readonly icon?: LucideIcon;
  readonly credentialUrl?: string;
  readonly badge?: string;
}

// --- Achievements ---

export interface Achievement {
  readonly title: string;
  readonly description: string;
  readonly icon?: LucideIcon;
  readonly metric?: string;
}

// --- Statistics ---

export interface Stat {
  readonly label: string;
  readonly value: number;
  readonly suffix?: string;
  readonly icon: LucideIcon;
}

// --- Site Config ---

export interface SiteConfig {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly ogImage: string;
  readonly author: string;
  readonly email: string;
  readonly github: string;
  readonly linkedin: string;
}
