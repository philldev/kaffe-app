import { useAuth } from "@/components/auth/auth-provider";
import { useSupabase } from "@/lib/supabase";
import { ProductCategory } from "@/types/product-category";
import { useQuery } from "react-query";

export const useProductCategory = (id?: string) => {
  const supabase = useSupabase();
  const auth = useAuth();
  const userId = auth.getSession()?.user.id;
  const enabled = !!userId && !!id;

  return useQuery({
    enabled,
    queryKey: ["product-category", userId, id] as const,
    async queryFn({ queryKey }) {
      const [_, __, id] = queryKey;

      const { data, error } = await supabase
        .from("product_categories")
        .select()
        .eq("id", id)
        .single()
        .throwOnError();

      if (error) throw error;

      return data as ProductCategory;
    },
  });
};
