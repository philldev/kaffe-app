import { useAuth } from "@/components/auth/auth-provider";
import { useSupabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";

export const useProducts = () => {
  const supabase = useSupabase();
  const auth = useAuth();
  const userId = auth.getSession()?.user.id;
  const enabled = !!userId;

  const [categoryId, setCategoryId] = useState<string>();

  const query = useInfiniteQuery({
    enabled,
    queryKey: ["products", userId, categoryId] as const,
    async queryFn({ queryKey, pageParam = 0 }) {
      const [_, userId, categoryId] = queryKey;

      const limit = 10;

      const range = {
        from: pageParam * limit,
        to: (pageParam + 1) * 10,
      };

      const { data, error } = await supabase
        .from("products")
        .select()
        .eq("user_id", userId)
        .eq(categoryId ? "category_id" : "", categoryId)
        .range(range.from, range.to)
        .throwOnError();

      if (error) throw error;

      if (data.length === 0)
        return {
          data: [],
        };

      return {
        data: data as Product[],
        cursor: pageParam,
      };
    },

    getNextPageParam(lastPage) {
      return lastPage.cursor ? lastPage.cursor + 1 : undefined;
    },
  });

  return {
    ...query,
    categoryId,
    setCategoryId,
    allData: query.data?.pages.reduce<Product[]>((prev, current) => {
      if (current.data) {
        return [...prev, ...current.data];
      }
      return prev;
    }, []),
  };
};
