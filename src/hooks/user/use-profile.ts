import { useAuth } from "@/components/auth/auth-provider";
import { useSupabase } from "@/lib/supabase";
import { Profile } from "@/types/user";
import { useQuery } from "react-query";

export const useProfile = () => {
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
