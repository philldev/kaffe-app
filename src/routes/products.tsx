import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { IconSearch } from "@tabler/icons-react";

export const ProductsPage = () => {
  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      <div className="pb-4 pt-6 px-4 flex items-center gap-4">
        <p className="font-semibold">Products</p>
      </div>
      <SearchForm />
      <CategoryTabs />
      <ProductList />
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
    <div className="py-2 w-screen">
      <div className="flex gap-4 px-4 overflow-x-auto scroll-pl-4 snap-x">
        {new Array(10).fill("Category").map((label, index) => (
          <button
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "outline",
              }),
              "max-w-max min-w-max snap-start"
            )}
          >{`${label} ${index}`}</button>
        ))}
      </div>
    </div>
  );
};

const ProductList = () => {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 grid gap-2">
        {new Array(10).fill("Category").map((label, index) => (
          <Card>
            <CardHeader>
              <CardTitle>{`${label} ${index}`}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
