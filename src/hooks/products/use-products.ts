import { useAuth } from "@/components/auth/auth-provider";
import { useSupabase } from "@/lib/supabase";
import { useInfiniteQuery } from "react-query";

export const useProducts = () => {
  const supabase = useSupabase();
  const auth = useAuth();
  const userId = auth.getSession()?.user.id;
  const enabled = !!userId;

  return useInfiniteQuery({
    enabled,
    queryKey: ["products", userId] as const,
    async queryFn({ queryKey, pageParam = { cursor: 0 } }) {
      const [_, userId] = queryKey;

      const limit = 10;

      const range = {
        from: pageParam.cursor * limit,
        to: (pageParam.cursor + 1) * 10,
      };

      const {} = supabase
        .from("products")
        .select()
        .eq("user_id", userId)
        .range(range.from, range.to);

      return {
        data: [],
        cursor: pageParam.cursor,
      };
    },
    getNextPageParam(lastPage) {
      return {
        cursor: lastPage.cursor,
      };
    },
  });
};
