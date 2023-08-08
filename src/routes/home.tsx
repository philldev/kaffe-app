import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";

export const HomePage = () => {
  const auth = useAuth();

  return (
    <div>
      <Button onClick={auth.logout}>logout</Button>
    </div>
  );
};
