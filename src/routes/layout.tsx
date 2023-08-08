import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="min-h-screen text-sm font-poppins bg-background px-4">
      <div className="max-w-xl w-full mx-auto pb-[60px]">
        <Outlet />
      </div>
    </div>
  );
};
