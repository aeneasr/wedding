import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDateTime(value: string) {
  return format(new Date(value), "EEEE, d MMMM yyyy 'at' HH:mm");
}
