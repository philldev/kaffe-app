import { ProductCategory } from "@/types/product-category";
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

export type CategoryFormValues = PickPartial<ProductCategory, "id">;

interface CategoryFormProps {
  defaultValues?: CategoryFormValues;
  actions?: ReactNode;
  onSubmit?: (values: CategoryFormValues) => void;
}

const schema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const CategoryForm = (props: CategoryFormProps) => {
  const form = useForm<CategoryFormValues>({
    defaultValues: props.defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: CategoryFormValues) => {
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
        <div className="flex justify-end items-center">{props.actions}</div>
      </form>
    </Form>
  );
};
