import { Order } from "@/types/order";

export const orderStatusItems: Order["status"][] = [
  "new",
  "completed",
  "canceled",
];

export function getStatusLabel(status: Order["status"]) {
  switch (status) {
    case "new":
      return "New";
    case "canceled":
      return "Canceled";
    case "completed":
      return "Completed";
    default:
      return "";
  }
}

export function getStatusTwBgColor(status: Order["status"]) {
  switch (status) {
    case "new":
      return "bg-yellow-500";
    case "canceled":
      return "bg-red-500";
    case "completed":
      return "bg-green-600";
    default:
      return "bg-background";
  }
}

export type OrdersDateRange = "today" | "this-week" | "this-month";

export const ordersDateRangeList: OrdersDateRange[] = [
  "today",
  "this-week",
  "this-month",
];

export function getDateRangeLabel(range: OrdersDateRange) {
  switch (range) {
    case "today":
      return "Today";
    case "this-month":
      return "This Month";
    case "this-week":
      return "This Week";

    default:
      return "";
  }
}

export function getStartAndEndDateRange(range: OrdersDateRange) {
  switch (range) {
    case "today":
      return getStartAndEndDateOfToday();
    case "this-week":
      return getStartAndEndDateOfWeek();
    case "this-month":
      return getStartAndEndDateOfMonth();

    default:
      return getStartAndEndDateOfToday();
  }
}

export function getStartAndEndDateOfToday() {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999); // Set the time to 23:59:59.999

  return { startDate, endDate };
}

export function getStartAndEndDateOfWeek() {
  const now = new Date();
  const today = now.getDay();
  const diffToMonday = now.getDate() - today + (today === 0 ? -6 : 1); // Get the date of Monday for the current week

  const startDate = new Date(now);
  startDate.setDate(diffToMonday);
  startDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000

  const endDate = new Date(now);
  endDate.setDate(diffToMonday + 6);
  endDate.setHours(23, 59, 59, 999); // Set the time to 23:59:59.999

  return { startDate, endDate };
}

export function getStartAndEndDateOfMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Calculate the start date of the month
  const startDate = new Date(year, month, 1);
  startDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000

  // Calculate the end date of the month
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const endDate = new Date(year, month, lastDayOfMonth);
  endDate.setHours(23, 59, 59, 999); // Set the time to 23:59:59.999

  return { startDate, endDate };
}
