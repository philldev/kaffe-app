import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { IconSearch } from "@tabler/icons-react";

export const ProductsPage = () => {
  return (
    <div>
      <div className="py-2 px-4 flex items-center gap-4">
        <p className="font-semibold">Products</p>
      </div>
      <SearchForm />
      <CategoryTabs />
    </div>
  );
};

const SearchForm = () => {
  return (
    <div className="px-4 py-2 flex gap-2">
      <Input placeholder="Search" />
      <div>
        <Button size="icon" variant="outline">
          <IconSearch strokeWidth={1} />
        </Button>
      </div>
    </div>
  );
};

const CategoryTabs = () => {
  return (
    <ScrollArea className="py-2">
      <div className="flex px-4 gap-4 overflow-x-auto w-screen">
        {new Array(10).fill("Category").map((label, index) => (
          <div>
            <button
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: "outline",
                }),
                "max-w-max min-w-max"
              )}
            >{`${label} ${index}`}</button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
