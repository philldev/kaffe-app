import { useSupabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { useMutation } from "react-query";

type UpdateProductValues = Partial<Product>;

export const useUpdateProduct = (
  input: {
    onSuccess?: () => void;
    onError?: () => void;
  } = {}
) => {
  const supabase = useSupabase();

  return useMutation({
    mutationKey: "update-product",
    onSuccess() {
      input.onSuccess?.();
    },
    onError() {
      input.onError?.();
    },
    async mutationFn(values: UpdateProductValues) {
      return supabase
        .from("products")
        .update(values)
        .eq("id", values.id)
        .throwOnError();
    },
  });
};
