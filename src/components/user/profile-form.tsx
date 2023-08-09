import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateProfile } from "@/hooks/user/use-update-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { OverlaySpinner } from "../ui/spinner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const profileSchema = z.object({
  full_name: z.string().optional(),
  email: z.string().optional(),
});

const profileResolver = zodResolver(profileSchema);

type ProfileValues = z.infer<typeof profileSchema>;

export const ProfileForm = (props: { defaultValues?: ProfileValues }) => {
  const form = useForm<ProfileValues>({
    resolver: profileResolver,
    defaultValues: props.defaultValues,
  });

  const mutation = useUpdateProfile({
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

  const onSubmit = (values: ProfileValues) => {
    mutation.mutate(values);
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button>Update Profile</Button>
        </div>
      </form>
    </Form>
  );
};
