import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OverlaySpinner } from "@/components/ui/spinner";
import { useSupabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { z } from "zod";

export const AccountPage = () => {
  const auth = useAuth();
  const supabase = useSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    auth.invalidate();
  };

  const profileQ = useProfile();

  const isLoading = profileQ.isLoading;

  return (
    <div>
      <div className="py-2">
        <p className="font-semibold">Account</p>
      </div>
      <div className="py-6 space-y-4">
        {isLoading ? (
          <OverlaySpinner />
        ) : (
          <>
            <ProfileForm defaultValues={profileQ.data} />
            <Button onClick={handleLogout}>Logout</Button>
          </>
        )}
      </div>
    </div>
  );
};

interface Profile {
  id: string;
  email: string;
  full_name?: string;
}

const useProfile = () => {
  const auth = useAuth();
  const supabase = useSupabase();

  const userId = auth.getSession()?.user.id;
  const enabled = !!userId;

  return useQuery({
    queryKey: ["profile", userId],
    enabled,
    async queryFn({ queryKey }) {
      const [_, userId] = queryKey;
      const { data } = await supabase
        .from("profiles")
        .select()
        .eq("id", userId)
        .single()
        .throwOnError();

      return data as Profile;
    },
  });
};

const profileSchema = z.object({
  full_name: z.string().optional(),
  email: z.string().optional(),
});

const profileResolver = zodResolver(profileSchema);

type ProfileValues = z.infer<typeof profileSchema>;

const ProfileForm = (props: { defaultValues?: ProfileValues }) => {
  const form = useForm<ProfileValues>({
    resolver: profileResolver,
    defaultValues: props.defaultValues,
  });

  const onSubmit = (values: ProfileValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
