import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverlaySpinner } from "@/components/ui/spinner";
import { ProfileForm } from "@/components/user/profile-form";
import { UpdatePasswordForm } from "@/components/user/update-password-form";
import { useProfile } from "@/hooks/user/use-profile";
import { useSupabase } from "@/lib/supabase";

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
    <div className="px-4">
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
            <Card>
              <CardHeader>
                <CardTitle>Update Password</CardTitle>
              </CardHeader>
              <CardContent>
                <UpdatePasswordForm />
              </CardContent>
            </Card>
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
