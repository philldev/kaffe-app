import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OverlaySpinner } from "@/components/ui/spinner";
import { createArray } from "@/lib/utils";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const NewOrderPage = () => {
  const isLoading = false;

  return (
    <div className="flex flex-col overflow-hidden h-[calc(100vh-60px)]">
      {isLoading ? <OverlaySpinner /> : null}
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Link to="/orders">
              <ChevronLeftIcon className="w-4 h-4" />
            </Link>
          </Button>
          <p className="font-semibold">New Order</p>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="py-2 px-4 flex flex-col gap-4">
          <div>
            <Label>Date</Label>
            <p className="text-muted-foreground">Order 2202202-001</p>
          </div>
          <div>
            <Label>Order Number</Label>
            <p className="text-muted-foreground">Order 2202202-001</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Customer name</Label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Items</Label>
            <div className="flex flex-col gap-1">
              {createArray(5).map((_, index) => (
                <div key={index} className="flex justify-between gap-2">
                  <span className="flex-1">Potato x 1</span>
                  <span>IDR 15K</span>
                  <div>
                    <Button variant="ghost" size="icon" className="w-5 h-5">
                      <IconPlus strokeWidth={1} className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-5 h-5">
                      <IconMinus strokeWidth={1} className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-5 h-5">
                      <IconTrash strokeWidth={1} className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Add Items
            </Button>
          </div>

          <div>
            <Label>Total</Label>
            <p className="text-muted-foreground text-2xl">IDR 150,000</p>
          </div>
        </div>
      </ScrollArea>
      <div className="p-4 flex flex-col gap-4">
        <Button className="w-full">Create Order</Button>
      </div>
    </div>
  );
};
