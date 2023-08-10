import { useAuth } from "@/components/auth/auth-provider";
import { ProductForm } from "@/components/products/product-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/product";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export const ProductDetailPage = () => {
  const auth = useAuth();

  const product: Partial<Product> = {
    id: "123",
    category_id: "category1",
    price_currency: "IDR",
    user_id: auth.getSession()?.user.id,
    description: "some description",
    name: "KOPI SUSU",
    price: 5000,
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
          <p className="font-semibold">Product Detail</p>
        </div>
      </div>
      <ScrollArea className="">
        <div className="py-2 px-4">
          <ProductForm
            defaultValues={product}
            actions={<Button>Submit</Button>}
          />
        </div>
      </ScrollArea>
    </div>
  );
};
