import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export const ProductCategoriesPage = () => {
  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <p className="font-semibold">Categories</p>
        </div>
        <Button asChild size="icon" variant="ghost">
          <Link to="new">
            <PlusIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
