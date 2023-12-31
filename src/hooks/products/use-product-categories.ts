import { useAuth } from "@/components/auth/auth-provider";
import { useSupabase } from "@/lib/supabase";
import { ProductCategory } from "@/types/product-category";
import { useInfiniteQuery } from "react-query";

export const useProductCategories = (input?: { limit?: number }) => {
  const supabase = useSupabase();
  const auth = useAuth();
  const userId = auth.getSession()?.user.id;
  const enabled = !!userId;

  const query = useInfiniteQuery({
    enabled,
    queryKey: ["product-categories", userId, input?.limit ?? 10] as const,
    async queryFn({ queryKey, pageParam = { cursor: 0 } }) {
      const [_, userId, limit] = queryKey;

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

  return {
    ...query,
    allData: query.data?.pages.reduce<ProductCategory[]>((prev, current) => {
      if (current.data) {
        return [...prev, ...current.data];
      }
      return prev;
    }, []),
  };
};
