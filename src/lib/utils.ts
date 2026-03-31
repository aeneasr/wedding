import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDateTime(value: string) {
  return format(new Date(value), "EEEE, d MMMM yyyy 'at' HH:mm");
}

export function formatDate(value: string) {
  return format(new Date(value), "EEEE, d MMMM yyyy");
}

export function formatTime(value: string) {
  return format(new Date(value), "HH:mm");
}

export function formatNullable(value?: string | null, fallback = "Not provided") {
  return value?.trim() ? value : fallback;
}

export function compact<T>(values: Array<T | null | undefined | false>) {
  return values.filter(Boolean) as T[];
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
