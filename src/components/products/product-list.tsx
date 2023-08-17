import { Product } from "@/types/product";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { createArray } from "@/lib/utils";

export const ProductList = ({
  data = [],
  onLoadMore,
  hasMore,
  loadingMore,
  isLoading,
  isSuccess,
  onItemClick = () => {},
  onAddClick = () => {},
  showAddButton,
}: {
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  data?: Product[];
  showAddButton?: boolean;
  onAddClick?: (product: Product) => void;
  onItemClick?: (product: Product) => void;
}) => {
  const empty = data.length === 0;

  const itemsView = data.map((item, index) => (
    <Card
      key={index}
      onClick={() => {
        onItemClick(item);
      }}
    >
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>
          {item.price_currency} {item.price}
        </CardDescription>
      </CardHeader>
      {showAddButton ? (
        <CardContent>
          <Button
            variant="outline"
            onClick={() => {
              onAddClick(item);
            }}
          >
            Add
          </Button>
        </CardContent>
      ) : null}
    </Card>
  ));

  const loadingView = createArray(10).map((_, index) => (
    <Skeleton key={index} className="h-[110px]" />
  ));

  const emptyView = (
    <div className="flex gap-2">
      <p className="text-muted-foreground">Products is empty!</p>
      <Link className="font-bold underline" to="/products/new">
        Create Product
      </Link>
    </div>
  );

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
