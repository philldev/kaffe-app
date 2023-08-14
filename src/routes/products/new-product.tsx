import { useAuth } from "@/components/auth/auth-provider";
import {
  ProductForm,
  ProductFormValues,
} from "@/components/products/product-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OverlaySpinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";
import { ProductConfig } from "@/config/products-config";
import { useCreateProduct } from "@/hooks/products/use-create-product";
import { useProductsCount } from "@/hooks/products/use-products-count";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";

export const NewProductPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const mutation = useCreateProduct({
    onSuccess() {
      toast({
        title: "Product created successfully",
      });
      navigate("/products");
    },
    onError() {
      toast({
        title: "Something went wrong! Please try again",
        variant: "destructive",
      });
    },
  });

  const countQuery = useProductsCount();

  const handleSubmit = (values: ProductFormValues) => {
    if (countQuery.data === null || countQuery.data === undefined) return;

    const limitReached = countQuery.data === ProductConfig.CREATE_PRODUCT_LIMIT;

    if (limitReached) {
      toast({
        title: "Your have reached the limit to create new product!",
      });
      return;
    }

    mutation.mutate({
      ...values,
      user_id: auth.getSession()?.user.id!,
    });
  };

  const isLoading = mutation.isLoading || countQuery.isLoading;

  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      {isLoading ? <OverlaySpinner /> : null}
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Link to="/products">
              <ChevronLeftIcon className="w-4 h-4" />
            </Link>
          </Button>
          <p className="font-semibold">New Product</p>
        </div>
      </div>
      <div className="px-4 text-xs text-muted-foreground">
        Category Limit{" "}
        <span className="text-foreground">
          {countQuery.data} / {ProductConfig.CREATE_PRODUCT_LIMIT}
        </span>
      </div>
      <ScrollArea className="">
        <div className="py-2 px-4">
          <ProductForm
            defaultValues={{
              user_id: auth.getSession()?.user.id,
            }}
            onSubmit={handleSubmit}
            actions={<Button>Submit</Button>}
          />
        </div>
      </ScrollArea>
    </div>
  );
};
