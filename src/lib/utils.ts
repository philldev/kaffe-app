import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PickPartial<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  Partial<Pick<T, K>>;

export function createArray<T>(length: number, value?: T) {
  return new Array(length).fill(value ?? 0);
}

export function formatDate(dateStr?: string | Date): string {
  try {
    // Convert the input date string to a Date bject
    const dateObj = dateStr ? new Date(dateStr) : new Date();

    // Define the date format options
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    // Format the date using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat(
      "en-US",
      dateFormatOptions
    ).format(dateObj);

    return formattedDate;
  } catch (error) {
    return "Invalid date format. Please use the format: 'YYYY-MM-DD HH:MM:SS'.";
  }
}
