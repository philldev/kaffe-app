import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconFilter } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export const OrdersPage = () => {
  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      <div className="p-4 flex border-b justify-between items-center gap-4">
        <p className="font-semibold">Orders</p>
        <Filter />
      </div>
      <ProductList />
    </div>
  );
};

const Filter = () => {
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState("today");
  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <IconFilter />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-xs w-full" collisionPadding={16}>
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
          <DropdownMenuRadioItem value="new">New</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="completed">
            Completed
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="canceled">
            Canceled
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Date Range</DropdownMenuLabel>
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
        {new Array(10).fill("Order").map((label, index) => (
          <Card>
            <CardHeader>
              <CardTitle>{`${label} ${index + 1}`}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
