import { ProductCategoryTabs } from "@/components/products/product-category-tabs";
import { ProductList } from "@/components/products/product-list";
import { SearchForm } from "@/components/products/search-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProducts } from "@/hooks/products/use-products";
import {
  HamburgerMenuIcon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export const ProductsPage = () => {
  const query = useProducts();

  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      <div className="p-4 flex items-center justify-between gap-4">
        <p className="font-semibold">Products</p>
        <ProductsMenu />
      </div>
      <SearchForm />
      <ProductCategoryTabs
        onChange={query.setCategoryId}
        value={query.categoryId}
      />
      <ProductList
        data={query.allData}
        isLoading={query.isLoading}
        isSuccess={query.isSuccess}
        hasMore={query.hasNextPage}
        loadingMore={query.isFetchingNextPage}
        onLoadMore={query.fetchNextPage}
      />
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
