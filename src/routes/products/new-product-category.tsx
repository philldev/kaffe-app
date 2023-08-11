import { useAuth } from "@/components/auth/auth-provider";
import {
  CategoryForm,
  CategoryFormValues,
} from "@/components/products/category-form";
import { Button } from "@/components/ui/button";
import { OverlaySpinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";
import { useCreateProductCategory } from "@/hooks/products/use-create-product-category";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export const NewProductCategoryPage = () => {
  const auth = useAuth();

  const mutation = useCreateProductCategory({
    onSuccess() {
      toast({
        title: "Category created successfully",
      });
    },
    onError() {
      toast({
        title: "Something went wrong! Please try again",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (values: CategoryFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      {mutation.isLoading && <OverlaySpinner />}
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
