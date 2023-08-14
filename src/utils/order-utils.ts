import { Order } from "@/types/order";

export const orderStatusItems: Order["status"][] = [
  "waiting_for_payment",
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
    case "waiting_for_payment":
      return "Waiting for payment";
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
    case "waiting_for_payment":
      return "bg-blue-500";
    default:
      return "bg-background";
  }
}
