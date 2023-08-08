import { createClient } from "@supabase/supabase-js";
import { ReactNode, createContext, useContext } from "react";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const Context = createContext<typeof supabase | null>(null);

export const SupabaseProvider = (props: { children: ReactNode }) => {
  return <Context.Provider value={supabase}>{props.children}</Context.Provider>;
};

export const useSupabase = () => {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Must be used inside supabase provider");
  return ctx;
};
