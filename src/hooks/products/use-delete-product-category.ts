import { useSupabase } from "@/lib/supabase";
import { useMutation } from "react-query";

export const useDeleteProductCategory = (
  input: {
    onSuccess?: () => void;
    onError?: () => void;
  } = {}
) => {
  const supabase = useSupabase();

  return useMutation({
    mutationKey: "delete-product-category",
    onSuccess() {
      input.onSuccess?.();
    },
    onError() {
      input.onError?.();
    },
    async mutationFn(id: string) {
      return supabase
        .from("product_categories")
        .delete()
        .eq("id", id)
        .throwOnError();
    },
  });
};
