import { Mail, MapPin } from "lucide-react";
import type { PersonalInfo } from "@/types";

/* ================================================================
   PERSONAL INFORMATION
   Single source of truth for name, bio, socials, etc.
   Used across Hero, About, Contact, and Footer.

   Brand icons (GitHub, LinkedIn) use string identifiers since
   Lucide React removed brand icons. Components render these
   via the SocialIcon component.
   ================================================================ */

export const personal: PersonalInfo = {
  name: "Gowtham A",
  roles: [
    "Flutter Developer",
    "Frontend Developer",
    "AI Enthusiast",
    "Computer Science Student",
    "Future Software Engineer",
  ],
  tagline: "Building the future, one line of code at a time.",
  bio: "I'm a passionate Computer Science student at Kings Engineering College with a deep love for building impactful software. I specialize in Flutter, React, and Next.js, and I'm deeply fascinated by artificial intelligence and its potential to transform how we live and work. I believe in writing clean, elegant code that solves real problems — and I'm always exploring new technologies to push the boundaries of what's possible.",
  email: "gowtham2006a@gmail.com",
  location: "Chennai, India",
  resumeUrl: "/resume.pdf",
  avatar: "/images/profile.jpg",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/gowtham142006",
      icon: "github",
      label: "View GitHub profile",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/gowtham-a-6381aa356",
      icon: "linkedin",
      label: "Connect on LinkedIn",
    },
    {
      name: "Email",
      url: "mailto:gowtham2006a@gmail.com",
      icon: Mail,
      label: "Send an email",
    },
    {
      name: "Location",
      url: "https://maps.google.com/?q=Chennai,India",
      icon: MapPin,
      label: "View location",
    },
  ],
} as const;
