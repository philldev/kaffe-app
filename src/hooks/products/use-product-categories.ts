import { useAuth } from "@/components/auth/auth-provider";
import { useSupabase } from "@/lib/supabase";
import { ProductCategory } from "@/types/product-category";
import { useInfiniteQuery } from "react-query";

export const useProductCategories = () => {
  const supabase = useSupabase();
  const auth = useAuth();
  const userId = auth.getSession()?.user.id;
  const enabled = !!userId;

  return useInfiniteQuery({
    enabled,
    queryKey: ["product-categories", userId] as const,
    async queryFn({ queryKey, pageParam = { cursor: 0 } }) {
      const [_, userId] = queryKey;

      const limit = 10;

      const range = {
        from: pageParam.cursor * limit,
        to: (pageParam.cursor + 1) * (limit - 1),
      };

      const { data, error } = await supabase
        .from("product_categories")
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
        data: data as ProductCategory[],
        cursor: pageParam,
      };
    },

    getNextPageParam(lastPage) {
      return lastPage.cursor ? lastPage.cursor + 1 : undefined;
    },
  });
};
