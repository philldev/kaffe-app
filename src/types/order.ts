import { Product } from "./product";

export interface Order {
  id: string;
  customer_name: string;
  order_number: string;
  created_at: string;
  status: "new" | "completed" | "canceled";
  summary: {
    items: OrderItem[];
    totalFormatted: string;
    total: number;
  };
}

export interface OrderItem {
  product: Product;
  quantity: number;
}
