import { useSupabase } from "@/lib/supabase";
import { Order, OrderItem } from "@/types/order";
import { useMutation } from "react-query";

type CreateOrderValues = {
  items: OrderItem[];
  total: number;
  customer_name: string;
  userId: string;
};

export const useCreateOrder = (
  input: {
    onSuccess?: () => void;
    onError?: () => void;
  } = {}
) => {
  const supabase = useSupabase();

  return useMutation({
    mutationKey: "create-order",
    onSuccess() {
      input.onSuccess?.();
    },
    onError() {
      input.onError?.();
    },
    async mutationFn(values: CreateOrderValues) {
      const targetDate = new Date();
      const startDate = new Date(targetDate);
      startDate.setHours(0, 0, 0, 0); // Set to 00:00:00

      const endDate = new Date(targetDate);
      endDate.setHours(23, 59, 59, 999); // Set

      const { count } = await supabase
        .from("orders")
        .select("", { count: "exact" })
        .eq("user_id", values.userId)
        .filter("created_at", "gte", startDate.toISOString())
        .filter("created_at", "lte", endDate.toISOString());

      const orderCount = (count || 0) + 1;

      const orderNumber = `${targetDate.getDate()}${targetDate.getMonth()}${targetDate.getFullYear()}-${orderCount}`;

      const newOrder: Omit<Order, "id" | "created_at"> = {
        customer_name: values.customer_name,
        order_number: orderNumber,
        status: "new",
        summary: {
          items: values.items,
          total: values.total,
        },
      };

      return supabase.from("orders").insert(newOrder).throwOnError();
    },
  });
};
