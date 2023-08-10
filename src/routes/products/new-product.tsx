import { useAuth } from "@/components/auth/auth-provider";
import {
  ProductForm,
  ProductFormValues,
} from "@/components/products/product-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export const NewProductPage = () => {
  const auth = useAuth();

  const handleSubmit = (values: ProductFormValues) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
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
