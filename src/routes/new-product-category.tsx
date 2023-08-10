import {
  CategoryForm,
  CategoryFormValues,
} from "@/components/products/category-form";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export const NewProductCategoryPage = () => {
  const handleSubmit = (values: CategoryFormValues) => {
    console.log(values);
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
          <p className="font-semibold">New Category</p>
        </div>
      </div>

      <div className="py-6 px-4">
        <CategoryForm
          onSubmit={handleSubmit}
          actions={<Button>Submit</Button>}
        />
      </div>
    </div>
  );
};
