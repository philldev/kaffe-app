import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  HamburgerMenuIcon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { IconSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const ProductsPage = () => {
  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      <div className="p-4 flex items-center justify-between gap-4">
        <p className="font-semibold">Products</p>
        <ProductsMenu />
      </div>
      <SearchForm />
      <CategoryTabs />
      <ProductList />
    </div>
  );
};

const ProductsMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <HamburgerMenuIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent collisionPadding={16}>
        <DropdownMenuItem>
          <Link className="flex items-center" to="/products/new">
            <PlusIcon className="mr-2" />
            <span>Add Product</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="flex items-center" to="/products/categories">
            <Pencil1Icon className="mr-2" />
            <span>Edit Categories</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
