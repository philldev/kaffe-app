import React from "react";
import ReactDOM from "react-dom/client";
import { SupabaseProvider } from "./lib/supabase.tsx";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SupabaseProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </SupabaseProvider>
  </React.StrictMode>
);
