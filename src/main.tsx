import React from "react";
import ReactDOM from "react-dom/client";
import { SupabaseProvider } from "./lib/supabase.tsx";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/toaster.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SupabaseProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </SupabaseProvider>
  </React.StrictMode>
);
