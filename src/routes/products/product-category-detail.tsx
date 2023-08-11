import {
  CategoryForm,
  CategoryFormValues,
} from "@/components/products/category-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link, useParams } from "react-router-dom";
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
import { useProductCategory } from "@/hooks/products/use-product-category";
import { OverlaySpinner, Spinner } from "@/components/ui/spinner";
import { useUpdateProductCategory } from "@/hooks/products/use-update-product-category";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/auth-provider";

export const ProductCategoryDetailPage = () => {
  const params = useParams();
  const auth = useAuth();

  const query = useProductCategory(params.id);

  const mutation = useUpdateProductCategory({
    onSuccess() {
      toast({
        title: "Category updated successfully",
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
    mutation.mutate({
      ...values,
      id: params.id,
      user_id: auth.getSession()?.user.id,
    });
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
          <p className="font-semibold">Category Detail</p>
        </div>
        <DeleteCategoryAlert />
      </div>
      <ScrollArea className="">
        <div className="py-2 px-4">
          {query.isLoading ? (
            <div className="p-4 flex justify-center">
              <Spinner />
            </div>
          ) : (
            <CategoryForm
              defaultValues={query.data}
              onSubmit={handleSubmit}
              actions={<Button>Submit</Button>}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

const DeleteCategoryAlert = () => {
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
