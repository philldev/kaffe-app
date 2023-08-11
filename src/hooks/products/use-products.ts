import { useAuth } from "@/components/auth/auth-provider";
import { useSupabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { useInfiniteQuery } from "react-query";

export const useProducts = () => {
  const supabase = useSupabase();
  const auth = useAuth();
  const userId = auth.getSession()?.user.id;
  const enabled = !!userId;

  return useInfiniteQuery({
    enabled,
    queryKey: ["products", userId] as const,
    async queryFn({ queryKey, pageParam = 0 }) {
      const [_, userId] = queryKey;

      const limit = 10;

      const range = {
        from: pageParam * limit,
        to: (pageParam + 1) * 10,
      };

      const { data, error } = await supabase
        .from("products")
        .select()
        .eq("user_id", userId)
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
};
