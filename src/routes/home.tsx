import { useAuth } from "@/components/auth/auth-provider";
import { useSupabase } from "@/lib/supabase";

export const HomePage = () => {
  const auth = useAuth();
  const supabase = useSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    auth.invalidate();
  };

  return (
    <div>
      <div className="py-2">
        <p className="font-semibold">Account</p>
      </div>
    </div>
  );
};
