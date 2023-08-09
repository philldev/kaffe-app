import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { toast } from "@/components/ui/use-toast";
import { useSupabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
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
      <div className="py-6 flex flex-col gap-6">
        {isLoading ? (
          <OverlaySpinner />
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileForm defaultValues={profileQ.data} />
              </CardContent>
            </Card>
            <div className="flex justify-end">
              <Button variant="ghost" onClick={handleLogout}>
                Update Password
              </Button>
            </div>
            <div className="flex justify-end">
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </div>
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

const useUpdateProfile = (
  props: {
    onSuccess?: () => void;
    onError?: (error: any) => void;
  } = {}
) => {
  const supabase = useSupabase();
  const auth = useAuth();

  const userId = auth.getSession()?.user.id;

  return useMutation({
    mutationKey: ["profile"],
    async mutationFn(values: Partial<Profile>) {
      return supabase
        .from("profiles")
        .update({
          ...values,
        })
        .eq("id", userId)
        .select()
        .throwOnError();
    },
    onSuccess() {
      props.onSuccess?.();
    },
    onError(error) {
      props.onError?.(error);
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
