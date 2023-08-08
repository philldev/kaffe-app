import { useSupabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { ReactNode, createContext, useContext } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { OverlaySpinner } from "../ui/spinner";

type Status = "error" | "idle" | "loading" | "success";
type AuthContext = {
  getSession: () => Session | null | undefined;
  getLoggedIn: () => boolean;
  getIsLoading: () => boolean;
  getStatus: () => Status;
  invalidate: () => void;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = (props: { children: ReactNode }) => {
  const supabase = useSupabase();

  const sessionQuery = useQuery({
    queryKey: "session",
    async queryFn() {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
  });

  const getSession = () => sessionQuery.data;
  const getLoggedIn = () => !!getSession();
  const getIsLoading = () => sessionQuery.isLoading;
  const getStatus = () => sessionQuery.status;

  const invalidate = () => sessionQuery.refetch();

  return (
    <AuthContext.Provider
      value={{
        getSession,
        getLoggedIn,
        getIsLoading,
        getStatus,
        invalidate,
      }}
    >
      {getStatus() === "loading" ? <OverlaySpinner /> : null}
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth() Must be used inside auth provider");
  return ctx;
};

export const ProtectedRoute = (props: { children: ReactNode }) => {
  const auth = useAuth();
  if (auth.getStatus() !== "success") return <div>Loading...</div>;
  if (!auth.getLoggedIn()) return <Navigate to="/login" />;
  return props.children;
};

export const AuthRoute = (props: { children: ReactNode }) => {
  const auth = useAuth();
  if (auth.getStatus() !== "success") return <div>Loading...</div>;
  if (auth.getLoggedIn()) return <Navigate to="/" />;
  return props.children;
};
