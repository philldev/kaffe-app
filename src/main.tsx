import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { SupabaseProvider } from "./lib/supabase.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SupabaseProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SupabaseProvider>
  </React.StrictMode>
);
