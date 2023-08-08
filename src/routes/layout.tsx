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

export const RootLayout = () => {
  return (
    <div className="min-h-screen text-sm font-poppins bg-background px-4">
      <div className="max-w-xl w-full mx-auto pb-[60px]">
        <NavMenus />
        <div className="py-4">
          <Outlet />
        </div>
      </div>
    </div>
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
        <nav className="flex mx-auto gap-4">
          {menus.map((item) => (
            <Link
              to={item.path}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })
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
