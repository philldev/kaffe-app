import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { useProductCategories } from "@/hooks/products/use-product-categories";
import { ProductCategory } from "@/types/product-category";
import { ChevronLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { IconSearch } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

export const ProductCategoriesPage = () => {
  const query = useProductCategories();

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

      <CategoryList
        hasMore={query.hasNextPage}
        onLoadMore={query.fetchNextPage}
        loadingMore={query.isFetchingNextPage}
        data={query.data?.pages.reduce<ProductCategory[]>((prev, current) => {
          if (current.data) {
            return [...prev, ...current.data];
          }
          return prev;
        }, [])}
      />
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

const CategoryList = ({
  data = [],
  onLoadMore,
  hasMore,
  loadingMore,
}: {
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  data?: ProductCategory[];
}) => {
  const navigate = useNavigate();

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 grid gap-2">
        {data.map((item) => (
          <Card
            onClick={() => {
              navigate(`${item.id}`);
            }}
          >
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="px-4">
        <Button
          disabled={!hasMore}
          onClick={onLoadMore}
          className="w-full"
          variant="secondary"
        >
          Load More
          {loadingMore && <Spinner className="w-3 h-3 ml-2" />}
        </Button>
      </div>
    </ScrollArea>
  );
};
