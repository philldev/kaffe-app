import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export const NewProductCategoryPage = () => {
  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <p className="font-semibold">New Category</p>
        </div>
      </div>
    </div>
  );
};
