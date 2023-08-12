import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useProductCategories } from "@/hooks/products/use-product-categories";
import { createArray } from "@/lib/utils";
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
        isLoading={query.isLoading}
        isSuccess={query.isSuccess}
        hasMore={query.hasNextPage}
        onLoadMore={query.fetchNextPage}
        loadingMore={query.isFetchingNextPage}
        data={query.allData}
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
  isLoading,
  isSuccess,
}: {
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  data?: ProductCategory[];
}) => {
  const navigate = useNavigate();
  const empty = data.length === 0;

  const itemsView = data.map((item) => (
    <Card
      onClick={() => {
        navigate(`${item.id}`);
      }}
    >
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
    </Card>
  ));

  const loadingView = createArray(5).map((_, index) => (
    <Skeleton key={index} className="h-[77.5px] w-full" />
  ));

  const emptyView = <p className="text-muted-foreground">Category is empty</p>;

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 grid gap-2">
        {isLoading ? loadingView : null}
        {isSuccess ? itemsView : null}
        {empty ? emptyView : null}
      </div>
      <div className="px-4">
        <Button
          disabled={!hasMore || empty}
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
