import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/img/Logo.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="h-28 w-full bg-white py-5">
      <div className="mx-auto flex h-16 w-full max-w-screen-xl items-center justify-between p-2 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <img src={logo} alt="Logo" className="w-24 md:w-32" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 text-lg font-semibold md:flex">
          <span
            className="hover:cursor-pointer hover:text-primary"
            onClick={() => scrollToSection("features")}
          >
            Feature
          </span>
          <span
            className="hover:cursor-pointer hover:text-primary"
            onClick={() => scrollToSection("pricing")}
          >
            Pricing
          </span>
          <span
            className="hover:cursor-pointer hover:text-primary"
            onClick={() => scrollToSection("faq")}
          >
            FAQ
          </span>
          <span
            className="hover:cursor-pointer hover:text-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>

        {/* Mobile Menu (Sheet) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu size={28} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>
                  <img src={logo} alt="Logo" className="w-24" />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-6 px-5 text-lg font-semibold">
                <span
                  className="hover:cursor-pointer hover:text-primary"
                  onClick={() => scrollToSection("features")}
                >
                  Feature
                </span>
                <span
                  className="hover:cursor-pointer hover:text-primary"
                  onClick={() => scrollToSection("pricing")}
                >
                  Pricing
                </span>
                <span
                  className="hover:cursor-pointer hover:text-primary"
                  onClick={() => scrollToSection("faq")}
                >
                  FAQ
                </span>
                <span
                  className="hover:cursor-pointer hover:text-primary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
