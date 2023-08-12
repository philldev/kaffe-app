import {
  ProductForm,
  ProductFormValues,
} from "@/components/products/product-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { useProduct } from "@/hooks/products/use-product";
import { useUpdateProduct } from "@/hooks/products/use-update-product";
import { OverlaySpinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";
import { useDeleteProduct } from "@/hooks/products/use-delete-product";

export const ProductDetailPage = () => {
  const params = useParams();
  const query = useProduct(params.id);
  const mutation = useUpdateProduct({
    onSuccess() {
      toast({
        title: "Product updated successfully",
      });
    },
    onError() {
      toast({
        title: "Something went wrong! Please try again",
        variant: "destructive",
      });
    },
  });
  const isLoading = query.isLoading || mutation.isLoading;

  const handleSubmit = (values: ProductFormValues) => {
    mutation.mutate({
      ...values,
      id: params.id,
    });
  };

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
          <p className="font-semibold">Product Detail</p>
        </div>

        <DeleteProductAlert />
      </div>
      <ScrollArea className="">
        <div className="py-2 px-4">
          <ProductForm
            key={query.data?.id}
            defaultValues={query.data}
            actions={<Button>Update</Button>}
            onSubmit={handleSubmit}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

const DeleteProductAlert = () => {
  const params = useParams();
  const navigate = useNavigate();
  const mutation = useDeleteProduct({
    onSuccess() {
      toast({
        title: "Product deleted successfully",
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

  const handleClick = () => {
    if (params.id) mutation.mutate(params.id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <IconTrash strokeWidth={1} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {mutation.isLoading ? <OverlaySpinner /> : null}
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleClick} variant="destructive">
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
