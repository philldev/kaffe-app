import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
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
      <Button onClick={handleLogout}>logout</Button>
    </div>
  );
};
