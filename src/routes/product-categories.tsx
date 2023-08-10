import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { IconSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const ProductCategoriesPage = () => {
  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Link to="/products">
              <ChevronLeftIcon className="w-4 h-4" />
            </Link>
          </Button>
          <p className="font-semibold">Categories</p>
        </div>
        <Button asChild size="icon" variant="ghost">
          <Link to="new">
            <PlusIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <SearchForm />
      <CategoryList />
    </div>
  );
};

const SearchForm = () => {
  return (
    <div className="px-4 flex gap-2">
      <Input placeholder="Search" />
      <div>
        <Button size="icon" variant="outline">
          <IconSearch strokeWidth={1} />
        </Button>
      </div>
    </div>
  );
};

const CategoryList = () => {
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
