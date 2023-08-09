import { useAuth } from "@/components/auth/auth-provider";
import { useSupabase } from "@/lib/supabase";
import { Profile } from "@/types/user";
import { useMutation } from "react-query";

export const useUpdateProfile = (
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
