import logo from "@/assets/img/logo.jpeg";

import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  return (
    <nav className="mb-8 h-16 text-center md:h-full">
      <div className="mb-4 flex items-center justify-between gap-5">
        <div className="flex items-start justify-center gap-2.5">
          <img
            src={logo}
            alt="justicalc"
            className="size-16 rounded-xl md:size-20"
          />
          <div className="flex flex-col items-start justify-center">
            <h1 className="font-bold text-foreground md:text-3xl">
              <span className="text-primary">Judgment</span> Calc
            </h1>
            <p className="md:text-md text-left text-sm text-muted-foreground md:mt-2">
              Manage cases, track payments, and calculate interest
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
