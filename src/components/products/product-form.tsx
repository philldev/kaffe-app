import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PickPartial } from "@/lib/utils";
import { Product } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useProductCategories } from "@/hooks/products/use-product-categories";

export type ProductFormValues = PickPartial<Product, "id">;

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  actions?: ReactNode;
  onSubmit?: (values: ProductFormValues) => void;
}

const schema = z.object({
  name: z.string(),
  description: z.string().optional(),
  user_id: z.string(),
  category_id: z.string(),
  price: z.number(),
  price_currency: z.string(),
});

export const ProductForm = (props: ProductFormProps) => {
  const form = useForm<ProductFormValues>({
    defaultValues: props.defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: ProductFormValues) => {
    console.log(values);
    props.onSubmit?.(values);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <ProductCategoriesSelectItems />
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>Optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length === 0) field.onChange(undefined);
                    else field.onChange(Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price_currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center">{props.actions}</div>
      </form>
    </Form>
  );
};

const ProductCategoriesSelectItems = () => {
  const query = useProductCategories({
    limit: 99,
  });

  return query.allData?.map((item, index) => (
    <SelectItem key={index} value={item.id}>
      {item.name}
    </SelectItem>
  ));
};
