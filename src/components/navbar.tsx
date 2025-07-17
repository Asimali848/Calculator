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

import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    // TODO: Clear auth tokens or session if applicable
    navigate("/home", { replace: true }); // go to login or home
    window.location.reload(); // force a full reload (optional)
  };
  const handleBilling = () => {
    // TODO: Clear auth tokens or session if applicable
    navigate("/billing", { replace: true }); // go to login or home
    window.location.reload(); // force a full reload (optional)
  };
  const handleProfile = () => {
    navigate("/profile"); // go to Profile or Home
    window.location.reload(); // force a full reload (optional)
  };
  const handleLogout = () => {
    // Clear all authentication tokens and user data from localStorage
    localStorage.clear();
    navigate("/", { replace: true }); // go to login or home
    window.location.reload(); // force a full reload (optional)
  };

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const username = userData?.username || "User";
  const image = userData?.image || "https://github.com/leerob.png";

  return (
    <nav className="h-18 w-full px-5 py-2 text-center">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-start justify-center gap-2.5">
          <img
            src={logo}
            alt="justicalc"
            className="h-16 w-full rounded-md p-2 dark:bg-white"
          />
        </div>
        <div className="flex w-full items-center justify-end gap-2.5">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="flex items-center justify-center gap-1 rounded-full bg-primary p-2 dark:bg-primary">
                {/* <ChevronDown className="text-white size-4" />  */}
                <Landmark className="text-white" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span className="capitalize">{username}</span>
                <Avatar>
                  <AvatarImage className="shrink-0 object-cover" src={image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
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
