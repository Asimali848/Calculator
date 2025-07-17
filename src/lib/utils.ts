import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateString(
  str: string | undefined,
  maxLength: number
): string {
  if (!str) return ""; // or return str ?? ""; if you want to keep `undefined`
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}
