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
    "Fullstack Developer",
    "Software Engineer",
    "AI Enthusiast",
  ],
  tagline: "Fullstack developer building clean, scalable software with a focus on AI.",
  bio: "Computer Science student at Kings Engineering College specializing in Flutter, React, and Next.js. I'm focused on writing clean, maintainable code and exploring how AI can improve the software we build. Currently seeking opportunities to apply and grow these skills in a real-world engineering team.",
  email: "gowtham142006a@gmail.com",
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
  name: "LeetCode",
  url: "https://leetcode.com/u/gowtham_2006_14/",
  icon: "code",
  label: "View LeetCode profile",
},
    {
      name: "Email",
      url: "mailto:gowtham142006a@gmail.com",
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
