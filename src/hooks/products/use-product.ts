import { useAuth } from "@/components/auth/auth-provider";
import { useSupabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { useQuery } from "react-query";

export const useProduct = (id?: string) => {
  const supabase = useSupabase();
  const auth = useAuth();
  const userId = auth.getSession()?.user.id;
  const enabled = !!userId && !!id;

  return useQuery({
    enabled,
    queryKey: ["product", userId, id] as const,
    async queryFn({ queryKey }) {
      const [_, __, id] = queryKey;

      const { data, error } = await supabase
        .from("products")
        .select()
        .eq("id", id)
        .single()
        .throwOnError();

      if (error) throw error;

      return data as Product;
    },
  });
};
