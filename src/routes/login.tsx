import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";

export const LoginPage = () => {
  const auth = useAuth();
  return (
    <div className="py-4">
      <Button onClick={auth.login}>Login</Button>
    </div>
  );
};
