import { Home, Landmark, LogOut, UserPen, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/img/Logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, truncateString } from "@/lib/utils";
import { useGetProfileQuery } from "@/store/services/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access") || "";
  const { data } = useGetProfileQuery({ token });

  const handleHome = () => {
    navigate("/home", { replace: true });
  };
  const handleBilling = () => {
    navigate("/billing", { replace: true });
    window.location.reload();
  };
  const handleProfile = () => {
    navigate("/profile");
    window.location.reload();
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  const profile = data?.profile;
  const username = profile?.full_name || "User";
  const image = profile?.image || "https://github.com/leerob.png";

  return (
    <nav className="h-16 w-full px-5 py-1 text-center">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-start justify-center gap-2.5">
          <img
            src={logo}
            alt="justicalc"
            className="cursorr-pointer h-16 w-full rounded-md p-2 dark:bg-white"
            onClick={handleHome}
          />
        </div>
        <div className="flex w-full items-center justify-end gap-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span
                className={cn(
                  "flex shrink-0 items-center justify-center gap-1 rounded-full object-cover",
                  image !== null
                    ? "bg-secondary dark:bg-secondary"
                    : "bg-primary p-2 dark:bg-primary"
                )}
              >
                {!username ? (
                  <Landmark className="text-white" />
                ) : (
                  <span className="capitalize">
                    <img src={image} alt="" className="size-10 rounded-full" />
                  </span>
                )}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span className="capitalize">{truncateString(username, 10)}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleHome}>
                <Home className="mr-2 h-4 w-4" />
                Home
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBilling}>
                <Wallet className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleProfile}>
                <UserPen className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
