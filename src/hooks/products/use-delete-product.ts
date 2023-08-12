import { useSupabase } from "@/lib/supabase";
import { useMutation } from "react-query";

export const useDeleteProduct = (
  input: {
    onSuccess?: () => void;
    onError?: () => void;
  } = {}
) => {
  const supabase = useSupabase();

  return useMutation({
    mutationKey: "delete-product",
    onSuccess() {
      input.onSuccess?.();
    },
    onError() {
      input.onError?.();
    },
    async mutationFn(id: string) {
      return supabase.from("products").delete().eq("id", id).throwOnError();
    },
  });
};
