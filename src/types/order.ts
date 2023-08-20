import { Product } from "./product";

export interface Order {
  id: string;
  customer_name: string;
  order_number: string;
  created_at: string;
  user_id: string;
  status: "new" | "completed" | "canceled";
  summary: {
    items: OrderItem[];
    total: number;
  };
}

export interface OrderItem {
  product: Product;
  quantity: number;
}
