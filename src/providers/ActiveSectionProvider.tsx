"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

/* ================================================================
   ACTIVE SECTION PROVIDER
   Shares the currently visible section across Navbar and other
   components without prop drilling.
   Uses IntersectionObserver internally.
   ================================================================ */

interface ActiveSectionContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType>({
  activeSection: "hero",
  setActiveSection: () => {},
});

export function useActiveSectionContext(): ActiveSectionContextType {
  return useContext(ActiveSectionContext);
}

const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "github",
  "certifications",
  "achievements",
  "contact",
];

interface ActiveSectionProviderProps {
  children: ReactNode;
}

export function ActiveSectionProvider({ children }: ActiveSectionProviderProps) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const value = useMemo(
    () => ({ activeSection, setActiveSection }),
    [activeSection]
  );

  return (
    <ActiveSectionContext.Provider value={value}>
      {children}
    </ActiveSectionContext.Provider>
  );
}
