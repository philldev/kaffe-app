import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./routes/layout";
import { LoginPage } from "./routes/login";
import { HomePage } from "./routes/home";
import { NotFoundPage } from "./routes/404";
import { AppLayout } from "./routes/app-layout";
import {
  AuthProvider,
  AuthRoute,
  ProtectedRoute,
} from "./components/auth/auth-provider";
import { SignupPage } from "./routes/signup";
import { AccountPage } from "./routes/account";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/account",
            element: <AccountPage />,
          },
        ],
      },
      {
        path: "/login",
        element: (
          <AuthRoute>
            <LoginPage />
          </AuthRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthRoute>
            <SignupPage />
          </AuthRoute>
        ),
      },
      {
        path: "/*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
