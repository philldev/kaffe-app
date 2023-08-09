import { useSupabase } from "@/lib/supabase";
import { useMutation } from "react-query";

export const useUpdatePassword = (
  props: {
    onSuccess?: () => void;
    onError?: (error: any) => void;
  } = {}
) => {
  const supabase = useSupabase();

  return useMutation({
    mutationKey: ["update-password"],
    async mutationFn(values: { password: string }) {
      return supabase.auth.updateUser(values);
    },
    onSuccess() {
      props.onSuccess?.();
    },
    onError(error) {
      props.onError?.(error);
    },
  });
};
