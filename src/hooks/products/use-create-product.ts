import { useSupabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { useMutation } from "react-query";

type CreateProductValues = Omit<Product, "id">;

export const useCreateProduct = (
  input: {
    onSuccess?: () => void;
    onError?: () => void;
  } = {}
) => {
  const supabase = useSupabase();

  return useMutation({
    mutationKey: "create-product",
    onSuccess() {
      input.onSuccess?.();
    },
    onError() {
      input.onError?.();
    },
    async mutationFn(values: CreateProductValues) {
      return supabase.from("products").insert(values).throwOnError();
    },
  });
};
