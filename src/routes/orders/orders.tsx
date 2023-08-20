import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconFilter } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn, createArray, formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  OrdersDateRange,
  getDateRangeLabel,
  getStatusLabel,
  orderStatusItems,
  ordersDateRangeList,
} from "@/utils/order-utils";
import { Order } from "@/types/order";
import { useOrders } from "@/hooks/order/use-orders";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export const OrdersPage = () => {
  const query = useOrders();
  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      <div className="p-4 flex border-b justify-between items-center gap-4">
        <p className="font-semibold">Orders</p>
        <Filter
          status={query.status}
          setStatus={query.setStatus}
          dateRange={query.dateRange}
          setDateRange={query.setDateRange}
        />
      </div>
      <OrderList
        data={query.allData}
        isLoading={query.isLoading}
        isSuccess={query.isSuccess}
        hasMore={query.hasNextPage}
        onLoadMore={query.fetchNextPage}
        loadingMore={query.isFetchingNextPage}
      />
      <div className="p-4">
        <Link
          to="/orders/new"
          className={cn(
            buttonVariants({
              variant: "default",
            }),
            "w-full"
          )}
        >
          New Order
        </Link>
      </div>
    </div>
  );
};

const Filter = (props: {
  status: Record<Order["status"], boolean>;
  setStatus: (
    value: React.SetStateAction<
      Record<"new" | "completed" | "canceled", boolean>
    >
  ) => void;
  dateRange: OrdersDateRange;
  setDateRange: React.Dispatch<React.SetStateAction<OrdersDateRange>>;
}) => {
  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <IconFilter />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]" collisionPadding={16}>
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {orderStatusItems.map((item) => (
          <DropdownMenuCheckboxItem
            key={item}
            checked={props.status[item]}
            onCheckedChange={(val) => {
              props.setStatus((prev) => ({
                ...prev,
                [item]: val,
              }));
            }}
          >
            {getStatusLabel(item)}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Date Range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={props.dateRange}
          onValueChange={(val) => props.setDateRange(val as OrdersDateRange)}
        >
          {ordersDateRangeList.map((range) => (
            <DropdownMenuRadioItem value={range}>
              {getDateRangeLabel(range)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const OrderList = ({
  data = [],
  ...props
}: {
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  data?: Order[];
}) => {
  const empty = data.length === 0;

  const itemsView = data.map((order, index) => (
    <Card key={index} className="relative">
      <Badge variant="outline" className="text-xs absolute right-2 top-2">
        {order.status}
      </Badge>
      <CardHeader>
        <p className="text-[12px]">{formatDate(order.created_at)}</p>
        <CardTitle>ORDER-{order.order_number}</CardTitle>
        <CardDescription>IDR {order.summary.total}</CardDescription>
      </CardHeader>
    </Card>
  ));

  const loadingView = createArray(10).map((_, index) => (
    <Skeleton key={index} className="h-[110px]" />
  ));

  const emptyView = (
    <div className="flex gap-2">
      <p className="text-muted-foreground">Orders is empty!</p>
    </div>
  );

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 grid gap-2">
        {props.isLoading ? loadingView : null}
        {props.isSuccess ? itemsView : null}
        {empty ? emptyView : null}
      </div>
      <div className="px-4">
        <Button
          disabled={!props.hasMore || empty}
          onClick={props.onLoadMore}
          className="w-full"
          variant="secondary"
        >
          Load More
          {props.loadingMore && <Spinner className="w-3 h-3 ml-2" />}
        </Button>
      </div>
    </ScrollArea>
  );
};
