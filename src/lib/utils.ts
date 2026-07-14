import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* ================================================================
   UTILITY FUNCTIONS
   Pure utility functions used across the application.
   ================================================================ */

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Combines clsx for conditional classes and twMerge for deduplication.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Debounce a function call.
 * Returns a debounced version that delays execution until after
 * `delay` milliseconds have elapsed since the last invocation.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle a function call.
 * Ensures the function is called at most once per `limit` milliseconds.
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Format a number with a suffix (e.g., 1000 → "1,000+")
 */
export function formatStat(value: number, suffix?: string): string {
  return `${value.toLocaleString()}${suffix ?? ""}`;
}
