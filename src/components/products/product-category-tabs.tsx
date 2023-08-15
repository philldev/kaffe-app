import { useProductCategories } from "@/hooks/products/use-product-categories";
import { cn, createArray } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";

export const ProductCategoryTabs = ({
  value,
  onChange = () => {},
}: {
  value?: string;
  onChange?: (val?: string) => void;
}) => {
  const query = useProductCategories({
    limit: 50,
  });

  const itemsView = query.allData?.map((item, index) => (
    <button
      key={index}
      onClick={() => {
        if (item.id === value) onChange();
        else onChange(item.id);
      }}
      className={cn(
        "border-transparent border",
        buttonVariants({
          size: "sm",
          variant: item.id === value ? "default" : "outline",
        }),
        "max-w-max min-w-max snap-start"
      )}
    >
      {item.name}
    </button>
  ));

  const loadingView = createArray(5).map((_, index) => (
    <div key={index}>
      <Skeleton className="h-[40px] w-[100px]" />
    </div>
  ));

  const emptyView = (
    <Link
      to="/products/categories/new"
      className={cn(
        buttonVariants({
          size: "sm",
          variant: "outline",
        }),
        "max-w-max min-w-max snap-start"
      )}
    >
      Create category
    </Link>
  );

  return (
    <div className="py-2 w-screen">
      <div className="flex gap-4 px-4 overflow-x-auto scroll-pl-4 snap-x">
        {query.isLoading ? loadingView : null}
        {query.isSuccess ? itemsView : null}
        {query.allData?.length === 0 ? emptyView : null}
      </div>
    </div>
  );
};
