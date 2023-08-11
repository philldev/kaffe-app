import { useSupabase } from "@/lib/supabase";
import { ProductCategory } from "@/types/product-category";
import { useMutation } from "react-query";

type UpdateProductCategoryValues = Partial<ProductCategory>;

export const useUpdateProductCategory = (
  input: {
    onSuccess?: () => void;
    onError?: () => void;
  } = {}
) => {
  const supabase = useSupabase();

  return useMutation({
    mutationKey: "update-product-category",
    onSuccess() {
      input.onSuccess?.();
    },
    onError() {
      input.onError?.();
    },
    async mutationFn(values: UpdateProductCategoryValues) {
      return supabase
        .from("product_categories")
        .update(values)
        .eq("id", values.id)
        .throwOnError();
    },
  });
};
