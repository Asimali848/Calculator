import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Pricingplan = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-screen-2xl mx-auto h-full px-4 sm:px-8 md:px-10 pb-18 lg:pb-28 lg:px-10 ">
      <div className="flex flex-col justify-center items-center text-center gap-12 md:gap-16 w-full">
        
        {/* Title Section */}
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-3xl sm:text-4xl font-bold">Pricing Plan</p>
          <hr className="w-16 sm:w-20 h-1 bg-primary rounded-full" />
          <p className="text-base sm:text-lg md:text-xl font-semibold max-w-2xl">
            Design your beautiful Elementor pricing table with a colorful
            background color.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full ">
          
          {/* Free Plan */}
          <div className="bg-white w-full md:w-[50%] lg:w-[70%] max-w-full rounded-xl p-6 sm:p-8 md:p-10 border-2 border-primary duration-500 drop-shadow-xl hover:scale-105">
            <p className="text-2xl sm:text-3xl font-bold mb-5">Basic</p>
            <div className="bg-primary py-3 rounded-4xl text-center">
              <span className="text-3xl sm:text-4xl text-white font-bold">Free</span>
            </div>
            <div className="font-semibold text-base sm:text-lg md:text-xl py-8 sm:py-10 gap-4 flex flex-col">
              <p>100 GB Space</p>
              <p>1 Domain Name</p>
              <p>300 GB Bandwidth</p>
              <p>15 Email Account</p>
              <p>Enhanced Security</p>
              <p>00 Mysql Databases</p>
            </div>
            <Button
              // onClick={() => window.open("https://calcjuris.vercel.app/")}
            // onClick={() => (window.location.href = "https://calcjuris.vercel.app/")}
            onClick={() => navigate("/login")}
              className="text-white w-[200px] rounded-md font-medium my-4 sm:my-6 py-4 sm:py-6 border-2 border-primary hover:cursor-pointer hover:bg-white hover:scale-105 hover:text-primary hover:border-primary transition"
            >
              Order Now
            </Button>
          </div>

          {/* Paid Plan */}
          <div className="bg-primary w-full md:w-[50%] lg:w-[70%] max-w-full rounded-xl p-6 sm:p-8 md:p-10 border border-primary duration-500 drop-shadow-xl hover:scale-105">
            <p className="text-2xl sm:text-3xl font-bold mb-5 text-white">Basic</p>
            <div className="bg-white py-3 rounded-4xl flex justify-center items-center">
              <span className="text-3xl sm:text-4xl text-primary font-bold">
                <span className="text-lg sm:text-xl ">$</span>39
              </span>
            </div>
            <div className="font-semibold text-base sm:text-lg md:text-xl py-8 sm:py-10 gap-4 flex flex-col text-white">
              <p>100 GB Space</p>
              <p>1 Domain Name</p>
              <p>300 GB Bandwidth</p>
              <p>15 Email Account</p>
              <p>Enhanced Security</p>
              <p>00 Mysql Databases</p>
            </div>
            <Button
              // onClick={() => window.open("https://calcjuris.vercel.app/")}
            // onClick={() => (window.location.href = "https://calcjuris.vercel.app/")}
            onClick={() => navigate("/login")}
              className="text-primary w-[200px] rounded-md font-medium my-4 sm:my-6 py-4 sm:py-6 border-2 border-primary hover:cursor-pointer bg-white hover:text-white hover:border-white hover:scale-105 transition"
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricingplan;
