import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OverlaySpinner } from "@/components/ui/spinner";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useProducts } from "@/hooks/products/use-products";
import { SearchForm } from "@/components/products/search-form";
import { ProductCategoryTabs } from "@/components/products/product-category-tabs";
import { ProductList } from "@/components/products/product-list";
import { useState } from "react";
import { OrderItem } from "@/types/order";
import { useArrayState } from "@/hooks/use-array-state";
import { Product } from "@/types/product";
import { useCreateOrder } from "@/hooks/order/use-create-order";
import { useAuth } from "@/components/auth/auth-provider";
import { toast } from "@/components/ui/use-toast";
import { formatPriceLong, formatPriceShort } from "@/lib/utils";

export const NewOrderPage = () => {
  const orderItems = useOrderItems();
  const [customerName, setCustomerName] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const mutation = useCreateOrder({
    onSuccess() {
      toast({
        title: "Order created successfully",
      });
      navigate("/orders");
    },
    onError() {
      toast({
        title: "Something went wrong! Please try again",
        variant: "destructive",
      });
    },
  });

  const isLoading = mutation.isLoading;

  const handleCreateOrder = () => {
    const userId = auth.getSession()?.user.id;
    if (userId)
      mutation.mutate({
        userId,
        items: orderItems.items,
        total: orderItems.getTotal(),
        customer_name: customerName,
      });
  };

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
          <div className="flex flex-col gap-2">
            <Label>Customer name</Label>
            <Input
              className="h-[40px]"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Items</Label>
            <div className="flex flex-col gap-1">
              {orderItems.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 text-xs"
                >
                  <div className="flex-1 flex flex-col">
                    <span>{item.product.name}</span>
                    <span className="font-bold">
                      {formatPriceShort(item.product.price)}
                    </span>
                  </div>
                  <span>x {item.quantity}</span>
                  <div>
                    <Button
                      onClick={() => {
                        orderItems.increment(item.product.id);
                      }}
                      variant="ghost"
                      size="icon"
                      className="w-5 h-5"
                    >
                      <IconPlus strokeWidth={1} className="w-3 h-3" />
                    </Button>

                    <Button
                      onClick={() => {
                        orderItems.decrement(item.product.id);
                      }}
                      variant="ghost"
                      size="icon"
                      className="w-5 h-5"
                    >
                      <IconMinus strokeWidth={1} className="w-3 h-3" />
                    </Button>

                    <Button
                      onClick={() => {
                        orderItems.remove(item.product.id);
                      }}
                      variant="ghost"
                      size="icon"
                      className="w-5 h-5"
                    >
                      <IconTrash strokeWidth={1} className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <AddItemsSheet onAddItem={orderItems.addItem} />
          </div>

          <div>
            <Label>Total</Label>
            <p className="text-muted-foreground text-2xl">
              {formatPriceLong(orderItems.getTotal())}
            </p>
          </div>
        </div>
      </ScrollArea>
      <div className="p-4 flex flex-col gap-4">
        <Button onClick={handleCreateOrder} className="w-full">
          Create Order
        </Button>
      </div>
    </div>
  );
};

const AddItemsSheet = ({
  onAddItem,
}: {
  onAddItem: (product: Product) => void;
}) => {
  const query = useProducts();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          Add Items
        </Button>
      </SheetTrigger>
      <SheetContent className="h-[90vh] px-0 pt-8" side="bottom">
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
          showAddButton
          onAddClick={(product) => {
            setOpen(false);
            onAddItem(product);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

const useOrderItems = () => {
  const items = useArrayState<OrderItem>([]);

  const increment = (id: string) => {
    const found = items.value.find((i) => i.product.id === id);
    if (!found) return;
    items.updateItem(
      (item) => item.product.id === id,
      (old) => ({
        ...old,
        quantity: old.quantity + 1,
      })
    );
  };

  const decrement = (id: string) => {
    const found = items.value.find((i) => i.product.id === id);
    if (!found) return;

    if (found.quantity <= 1) {
      const index = items.value.findIndex((i) => i.product.id === id);
      items.remove(index);
    } else {
      items.updateItem(
        (item) => item.product.id === id,
        (old) => ({
          ...old,
          quantity: old.quantity - 1,
        })
      );
    }
  };

  const addItem = (product: Product) => {
    const found = items.value.find((i) => i.product.id === product.id);

    if (found) {
      increment(found.product.id);
    } else {
      items.add({
        product,
        quantity: 1,
      });
    }
  };

  const remove = (id: string) => {
    const index = items.value.findIndex((i) => i.product.id === id);

    if (index >= 0) {
      items.remove(index);
    }
  };

  const getTotal = () => {
    return items.value.reduce((prev, current) => {
      return prev + current.quantity * current.product.price;
    }, 0);
  };

  return {
    items: items.value,
    remove,
    addItem,
    increment,
    decrement,
    getTotal,
  };
};
