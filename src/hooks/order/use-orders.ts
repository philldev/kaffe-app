import { useAuth } from "@/components/auth/auth-provider";
import { useSupabase } from "@/lib/supabase";
import { Order } from "@/types/order";
import {
  OrdersDateRange,
  getStartAndEndDateRange,
  getStatusArr,
} from "@/utils/order-utils";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";

export const useOrders = () => {
  const supabase = useSupabase();
  const auth = useAuth();
  const userId = auth.getSession()?.user.id;
  const enabled = !!userId;

  const [status, setStatus] = useState<Record<Order["status"], boolean>>({
    new: false,
    canceled: false,
    completed: false,
  });
  const [dateRange, setDateRange] = useState<OrdersDateRange>("today");

  const query = useInfiniteQuery({
    enabled,
    queryKey: ["orders", userId, status, dateRange] as const,
    async queryFn({ queryKey, pageParam = 0 }) {
      const [_, userId, status, dateRange] = queryKey;

      const limit = 10;

      const { startDate, endDate } = getStartAndEndDateRange(dateRange);

      const range = {
        from: pageParam * limit,
        to: (pageParam + 1) * 0,
      };

      const statusArr = getStatusArr(status);

      const { data, error } = await supabase
        .from("orders")
        .select()
        .eq("user_id", userId)
        .eq("status", statusArr)
        .filter("created_at", "gte", startDate.toISOString())
        .filter("created_at", "lte", endDate.toISOString())
        .range(range.from, range.to)
        .throwOnError();

      if (error) throw error;

      if (data.length === 0)
        return {
          data: [],
        };

      return {
        data: data as Order[],
        cursor: pageParam,
      };
    },

    getNextPageParam(lastPage) {
      return lastPage.cursor ? lastPage.cursor + 1 : undefined;
    },
  });

  return {
    ...query,
    status,
    setStatus,
    dateRange,
    setDateRange,
    allData: query.data?.pages.reduce<Order[]>((prev, current) => {
      if (current.data) {
        return [...prev, ...current.data];
      }
      return prev;
    }, []),
  };
};
