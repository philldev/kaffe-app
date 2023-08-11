import { useAuth } from "@/components/auth/auth-provider";
import { ProductForm } from "@/components/products/product-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/product";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IconTrash } from "@tabler/icons-react";

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
        <DeleteProductAlert />
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

const DeleteProductAlert = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <IconTrash strokeWidth={1} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product category and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive">Continue</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
