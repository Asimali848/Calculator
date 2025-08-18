import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import mobile_bg from "@/assets/img/Depositphotos_221861706_XL.webp";
import bg from "@/assets/img/hamza-Temp.webp";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full min-h-[300px] w-full flex-col items-center justify-center gap-8 md:flex-row md:gap-12 lg:h-screen">
      {/* Text Section */}
      <div className="order-1 flex w-full flex-1 flex-col items-center justify-center gap-3 px-6 py-5 md:absolute md:order-none md:items-start lg:max-w-screen-xl lg:gap-6">
        <motion.h1
          className="text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-4xl lg:text-6xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Know What They Owe
        </motion.h1>

        <motion.p
          className="max-w-md pb-2 text-center text-base font-semibold text-black md:w-1/3 md:text-left md:leading-5 lg:text-xl lg:leading-9"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Track Multiple Judgments Up to Date Accrued Interest Easy Transaction
          Entry & Editing Instant Payoff Calculator
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            onClick={() => navigate("/login")}
            className="w-[160px] rounded-md border-2 border-primary py-4 text-sm font-medium text-white transition-all hover:scale-105 hover:cursor-pointer hover:border-primary hover:bg-white hover:text-primary sm:w-[180px] sm:py-5 sm:text-base md:w-[200px] md:py-6 md:text-lg"
          >
            Get Started <ArrowRight className="ml-2 inline-block" />
          </Button>
        </motion.div>
      </div>

      {/* Image Section */}
      <motion.div
        className="hidden h-[300px] w-full flex-1 md:flex md:h-[400px] lg:h-screen"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src={bg}
          alt="Background"
          className="h-full w-full rounded-lg bg-cover md:h-[300px] md:rounded-none lg:h-full"
        />
      </motion.div>
      <motion.div
        className="order-2 h-[250px] w-full flex-1 p-5 sm:h-[350px] md:order-none md:hidden md:h-full"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src={mobile_bg}
          alt="Background"
          className="h-full w-full rounded-lg object-cover md:h-screen md:rounded-none"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
