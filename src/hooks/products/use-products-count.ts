import { useAuth } from "@/components/auth/auth-provider";
import { useSupabase } from "@/lib/supabase";
import { useQuery } from "react-query";

export const useProductsCount = () => {
  const supabase = useSupabase();
  const auth = useAuth();
  const userId = auth.getSession()?.user.id;
  const enabled = !!userId;

  return useQuery({
    enabled,
    queryKey: ["products", userId] as const,
    async queryFn({ queryKey }) {
      const [_, userId] = queryKey;

      const { count, error } = await supabase
        .from("products")
        .select("id", {
          count: "exact",
        })
        .eq("user_id", userId)
        .throwOnError();

      if (error) throw error;

      return count;
    },
  });
};
