import { useSupabase } from "@/lib/supabase";
import { ProductCategory } from "@/types/product-category";
import { useMutation } from "react-query";

type CreateProductCategoryValues = Omit<ProductCategory, "id">;

export const useCreateProductCategory = (
  input: {
    onSuccess?: () => void;
    onError?: () => void;
  } = {}
) => {
  const supabase = useSupabase();

  return useMutation({
    mutationKey: "create-product-category",
    onSuccess() {
      input.onSuccess?.();
    },
    onError() {
      input.onError?.();
    },
    async mutationFn(values: CreateProductCategoryValues) {
      return supabase.from("product_categories").insert(values).throwOnError();
    },
  });
};
