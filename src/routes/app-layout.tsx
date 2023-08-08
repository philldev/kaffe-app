import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  IconBox,
  IconClipboard,
  IconHome,
  IconPlus,
  IconUser,
} from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <>
      <NavMenus />
      <div className="py-4">
        <Outlet />
      </div>
    </>
  );
};

const menus = [
  {
    icon: <IconHome strokeWidth={1} />,
    path: "/",
  },
  {
    icon: <IconClipboard strokeWidth={1} />,
    path: "/",
  },
  {
    icon: <IconPlus strokeWidth={1} />,
    path: "/",
  },
  {
    icon: <IconBox strokeWidth={1} />,
    path: "/",
  },
  {
    icon: <IconUser strokeWidth={1} />,
    path: "/",
  },
];

const NavMenus = () => {
  return (
    <div className="fixed bottom-0 inset-x-0">
      <div className="h-[60px] max-w-xl flex mx-auto items-center border-t w-full">
        <nav className="flex gap-4 w-full">
          {menus.map((item) => (
            <Link
              to={item.path}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                }),
                "w-full flex-1"
              )}
            >
              {item.icon}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
