import { useAuth } from "@/components/auth/auth-provider";
import {
  CategoryForm,
  CategoryFormValues,
} from "@/components/products/category-form";
import { Button } from "@/components/ui/button";
import { OverlaySpinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";
import { ProductConfig } from "@/config/products-config";
import { useCreateProductCategory } from "@/hooks/products/use-create-product-category";
import { useProductCategoriesCount } from "@/hooks/products/use-product-categories-count";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";

export const NewProductCategoryPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const mutation = useCreateProductCategory({
    onSuccess() {
      toast({
        title: "Category created successfully",
      });
      navigate("/products/categories");
    },
    onError() {
      toast({
        title: "Something went wrong! Please try again",
        variant: "destructive",
      });
    },
  });

  const countQuery = useProductCategoriesCount();

  const handleSubmit = (values: CategoryFormValues) => {
    if (typeof countQuery.data !== "number") return;

    const limitReached =
      countQuery.data === ProductConfig.CREATE_PRODUCT_CATEGORY_LIMIT;

    if (limitReached) {
      toast({
        title: "Your have reached the limit to create product category!",
      });
      return;
    }

    mutation.mutate(values);
  };

  const isLoading = mutation.isLoading || countQuery.isLoading;

  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      {isLoading && <OverlaySpinner />}
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Link to="/products/categories">
              <ChevronLeftIcon className="w-4 h-4" />
            </Link>
          </Button>
          <p className="font-semibold">New Category</p>
        </div>
      </div>

      <div className="px-4 text-xs text-muted-foreground">
        Category Limit{" "}
        <span className="text-foreground">
          {countQuery.data} / {ProductConfig.CREATE_PRODUCT_CATEGORY_LIMIT}
        </span>
      </div>

      <div className="p-4">
        <CategoryForm
          defaultValues={{
            user_id: auth.getSession()?.user.id,
          }}
          onSubmit={handleSubmit}
          actions={<Button>Submit</Button>}
        />
      </div>
    </div>
  );
};
