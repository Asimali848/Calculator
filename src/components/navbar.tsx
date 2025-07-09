import { Home, LogOut, UserPen, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/img/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ThemeToggle } from "./theme-toggle";

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
    // TODO: Clear auth tokens or session if applicable
    navigate("/", { replace: true }); // go to login or home
    window.location.reload(); // force a full reload (optional)
  };

  return (
    <nav className="h-fit w-full px-5 py-2 text-center">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-start justify-center gap-2.5">
          <img
            src={logo}
            alt="justicalc"
            className="h-16 w-full rounded-md p-2 dark:bg-white md:h-20"
          />
        </div>
        <div className="flex w-full items-center justify-end gap-2.5">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/leerob.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel>User</DropdownMenuLabel>
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
