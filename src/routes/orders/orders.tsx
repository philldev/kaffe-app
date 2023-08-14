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
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { getStatusLabel, orderStatusItems } from "@/utils/order-utils";
import { Order } from "@/types/order";

export const OrdersPage = () => {
  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      <div className="p-4 flex border-b justify-between items-center gap-4">
        <p className="font-semibold">Orders</p>
        <Filter />
      </div>
      <ProductList />
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

const Filter = () => {
  const [status, setStatus] = useState<Record<Order["status"], boolean>>({
    new: false,
    canceled: false,
    completed: false,
    waiting_for_payment: false,
  });
  const [dateRange, setDateRange] = useState("today");

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
            checked={status[item]}
            onCheckedChange={(val) => {
              setStatus((prev) => ({
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
        <DropdownMenuRadioGroup value={dateRange} onValueChange={setDateRange}>
          <DropdownMenuRadioItem value="new">Today</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="completed">
            This Week
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="canceled">
            This Month
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ProductList = () => {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 grid gap-2">
        {new Array(10).fill("Order").map((_, index) => (
          <Card key={index} className="relative">
            <Badge variant="outline" className="text-xs absolute right-2 top-2">
              New
            </Badge>
            <CardHeader>
              <p className="text-xs">Date</p>
              <CardTitle>Order-20231111-001</CardTitle>
              <CardDescription>IDR 250,000</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
