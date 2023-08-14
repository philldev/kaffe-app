import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OverlaySpinner } from "@/components/ui/spinner";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
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
        <div className="py-2 px-4"></div>
      </ScrollArea>
      <div className="p-4 flex flex-col gap-4">
        <Button variant="outline" className="w-full">
          Add Items
        </Button>
        <Button className="w-full">Create Order</Button>
      </div>
    </div>
  );
};
