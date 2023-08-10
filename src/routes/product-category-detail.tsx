import { useAuth } from "@/components/auth/auth-provider";
import { CategoryForm } from "@/components/products/category-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductCategory } from "@/types/product-category";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export const ProductCategoryDetailPage = () => {
  const auth = useAuth();

  const category: Partial<ProductCategory> = {
    id: "123",
    user_id: auth.getSession()?.user.id,
    description: "some description",
    name: "Drink",
  };

  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Link to="/products/categories">
              <ChevronLeftIcon className="w-4 h-4" />
            </Link>
          </Button>
          <p className="font-semibold">Category Detail</p>
        </div>
      </div>
      <ScrollArea className="">
        <div className="py-2 px-4">
          <CategoryForm
            defaultValues={category}
            actions={<Button>Submit</Button>}
          />
        </div>
      </ScrollArea>
    </div>
  );
};
