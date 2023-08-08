import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate } from "react-router-dom";

type Status = "pending" | "ready" | "error";

const AuthContext = createContext<{
  getLoggedIn: () => boolean;
  getIsLoading: () => boolean;
  getStatus: () => Status;
  login: () => void;
  logout: () => void;
} | null>(null);

export const AuthProvider = (props: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [status, setStatus] = useState<Status>("pending");

  console.log({
    loggedIn,
    status,
  });

  const getLoggedIn = () => loggedIn;
  const getIsLoading = () => status === "pending";
  const getStatus = () => status;

  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);

  useEffect(() => {
    setTimeout(() => {
      setStatus("ready");
    }, 2000);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        getLoggedIn,
        getIsLoading,
        getStatus,
        login,
        logout,
      }}
    >
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
  if (auth.getStatus() !== "ready") return <div>Loading...</div>;
  if (!auth.getLoggedIn()) return <Navigate to="/login" />;
  return props.children;
};

export const AuthRoute = (props: { children: ReactNode }) => {
  const auth = useAuth();
  if (auth.getStatus() !== "ready") return <div>Loading...</div>;
  if (auth.getLoggedIn()) return <Navigate to="/" />;
  return props.children;
};
