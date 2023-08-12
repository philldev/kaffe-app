import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductCategories } from "@/hooks/products/use-product-categories";
import { cn, createArray } from "@/lib/utils";
import {
  HamburgerMenuIcon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ProductsPage = () => {
  const [category, setCategory] = useState<string>();

  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      <div className="p-4 flex items-center justify-between gap-4">
        <p className="font-semibold">Products</p>
        <ProductsMenu />
      </div>
      <SearchForm />
      <ProductCategoryTabs onChange={setCategory} value={category} />
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
          <Link className="flex items-center" to="new">
            <PlusIcon className="mr-2" />
            <span>Add Product</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="flex items-center" to="categories">
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

const ProductCategoryTabs = ({
  value,
  onChange = () => {},
}: {
  value?: string;
  onChange?: (val?: string) => void;
}) => {
  const query = useProductCategories({
    limit: 50,
  });

  const itemsView = query.allData?.map((item, index) => (
    <button
      key={index}
      onClick={() => {
        if (item.id === value) onChange();
        else onChange(item.id);
      }}
      className={cn(
        "border-transparent border",
        buttonVariants({
          size: "sm",
          variant: item.id === value ? "default" : "outline",
        }),
        "max-w-max min-w-max snap-start"
      )}
    >
      {item.name}
    </button>
  ));

  const loadingView = createArray(5).map((_, index) => (
    <div key={index}>
      <Skeleton className="h-[40px] w-[100px]" />
    </div>
  ));

  const emptyView = (
    <Link
      to="/products/categories/new"
      className={cn(
        buttonVariants({
          size: "sm",
          variant: "outline",
        }),
        "max-w-max min-w-max snap-start"
      )}
    >
      Create category
    </Link>
  );

  return (
    <div className="py-2 w-screen">
      <div className="flex gap-4 px-4 overflow-x-auto scroll-pl-4 snap-x">
        {query.isLoading ? loadingView : null}
        {query.isSuccess ? itemsView : null}
        {query.allData?.length === 0 ? emptyView : null}
      </div>
    </div>
  );
};

const ProductList = () => {
  const navigate = useNavigate();
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 grid gap-2">
        {new Array(10).fill("Category").map((label, index) => (
          <Card
            onClick={() => {
              navigate("1");
            }}
          >
            <CardHeader>
              <CardTitle>{`${label} ${index}`}</CardTitle>
              <CardDescription>Category</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
