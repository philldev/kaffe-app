import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="min-h-screen text-sm font-poppins bg-background">
      <div className="max-w-xl w-full mx-auto pb-[60px]">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
};
