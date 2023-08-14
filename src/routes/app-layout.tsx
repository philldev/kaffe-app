import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  IconClipboardList,
  IconHome,
  IconPackages,
  IconUser,
} from "@tabler/icons-react";
import { NavLink, Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <>
      <NavMenus />
      <Outlet />
    </>
  );
};

const menus = [
  {
    Icon: IconHome,
    path: "/",
  },
  {
    Icon: IconClipboardList,
    path: "/orders",
  },
  {
    Icon: IconPackages,
    path: "/products",
  },
  {
    Icon: IconUser,
    path: "/account",
  },
];

const NavMenus = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40">
      <div className="h-[60px] bg-background max-w-xl flex mx-auto items-center border-t w-full">
        <nav className="px-4 flex gap-4 w-full">
          {menus.map((item) => (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  }),
                  "w-full flex-1",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )
              }
            >
              {({ isActive }) => <item.Icon strokeWidth={isActive ? 2 : 1} />}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
