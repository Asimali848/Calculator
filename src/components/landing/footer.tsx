import logo from "@/assets/img/Logo.png";
import { useEffect, useState } from "react";

const sections = ["features", "pricing", "faq", "contact"];

const Footer = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            currentSection = id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="w-full px-4 sm:px-8 md:px-16 lg:px-20 py-10 bg-white text-gray-800">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-left">
        
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="Logo" className="w-40 pb-3" />
          <p className="text-sm sm:text-base text-gray-700 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            pharetra condimentum.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-primary text-lg sm:text-xl font-bold mb-3">QUICK LINKS</h4>
          <ul className="flex flex-col gap-2 sm:gap-3 font-semibold">
            {sections.map((section) => (
              <li key={section}>
                <button
                  className={`hover:text-primary transition-colors ${
                    activeSection === section ? "" : ""
                  }`}
                  onClick={() => scrollToSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Plans */}
        <div>
          <h4 className="text-primary text-lg sm:text-xl font-bold mb-3">PRICING PLANS</h4>
          <ul className="flex flex-col gap-2 sm:gap-3 font-semibold">
            <li>
              <button
                className="hover:text-primary transition-colors"
                onClick={() => scrollToSection("pricing")}
              >
                Free
              </button>
            </li>
            <li>
              <button
                className="hover:text-primary transition-colors"
                onClick={() => scrollToSection("pricing")}
              >
                Paid
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 border-t border-primary pt-4 text-xs sm:text-sm text-center text-gray-600">
        © {new Date().getFullYear()} Judgmentcalc. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
