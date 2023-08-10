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
import { ProductsPage } from "./routes/products";
import { OrdersPage } from "./routes/orders";
import { NewProductPage } from "./routes/new-product";
import { ProductCategoriesPage } from "./routes/product-categories";
import { NewProductCategoryPage } from "./routes/new-product-category";
import { ProductDetailPage } from "./routes/product-detail";
import { ProductCategoryDetailPage } from "./routes/product-category-detail";

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
            path: "account",
            element: <AccountPage />,
          },
          {
            path: "products",
            element: <ProductsPage />,
          },
          {
            path: "products/categories",
            element: <ProductCategoriesPage />,
          },
          {
            path: "products/categories/:id",
            element: <ProductCategoryDetailPage />,
          },
          {
            path: "products/categories/new",
            element: <NewProductCategoryPage />,
          },
          {
            path: "products/new",
            element: <NewProductPage />,
          },
          {
            path: "products/:id",
            element: <ProductDetailPage />,
          },
          {
            path: "orders",
            element: <OrdersPage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
      {
        path: "login",
        element: (
          <AuthRoute>
            <LoginPage />
          </AuthRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthRoute>
            <SignupPage />
          </AuthRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
