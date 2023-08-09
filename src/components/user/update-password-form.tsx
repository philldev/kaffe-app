import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { OverlaySpinner } from "../ui/spinner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdatePassword } from "@/hooks/user/use-update-password";

const updatePasswordSchema = z.object({
  new_password: z.string(),
});

const updatePasswordResolver = zodResolver(updatePasswordSchema);

type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;

export const UpdatePasswordForm = () => {
  const form = useForm<UpdatePasswordValues>({
    resolver: updatePasswordResolver,
  });

  const mutation = useUpdatePassword({
    onSuccess() {
      toast({
        title: "Success",
      });
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message ?? "something went wrong",
      });
    },
  });

  const onSubmit = (values: UpdatePasswordValues) => {
    mutation.mutate({
      password: values.new_password,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        {mutation.isLoading && <OverlaySpinner />}

        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button>Update Password</Button>
        </div>
      </form>
    </Form>
  );
};
