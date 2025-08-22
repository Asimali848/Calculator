import { motion } from "framer-motion";
import { Calculator, CalendarClock, MousePointerClick, Infinity, } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: <Calculator className="size-8" />,
    title: "Precision Interest Calculations",
    description: [
      "Crunches numbers so you don't.",
      "Interest adds up like magic.",
      "No spreadsheets, no sweat.",
      "See exactly what they owe.",
    ],
  },
  {
    icon: <CalendarClock className="size-8 text-white" />,
    title: "Live Payoff Tracking",
    description: [
      "Track every penny from judgment to collection.",
      "Payments, costs, and credits update in real time.",
      "Your balance is always current.",
    ],
    circleBg: "bg-primary",
  },
  {
    icon: <MousePointerClick className="size-8" />,
    title: "Easy to use",
    description: [
      "Built for lawyers, not engineers.",
      "No manuals. No downloads. No BS.",
      "Just enter your numbers and go.",
      "Fast, intuitive, courtroom-ready.",
    ],
  },
  {
    icon: <Infinity className="size-8 text-white" />,
    title: "Unlimited Cases, Unlimited Transactions",
    description: [
      "Stop retyping the same numbers.",
      "Save every case, payment, and cost.",
      "Jump back in anytime, fully synced.",
      "Manage all your judgments in one place.",
    ],
    circleBg: "bg-primary",
  },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Features = () => {
  return (
    <div className="mx-auto h-full w-full max-w-screen-2xl bg-white">
      <div className="flex w-full flex-col items-center justify-start gap-8 py-16 sm:gap-10 sm:py-20 md:py-24">
        {/* Heading */}
        <div className="flex w-full flex-col items-center justify-center gap-3 px-4 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Features</h1>
          <hr className="h-1 w-16 rounded-full bg-primary sm:w-20" />
          <p className="max-w-xl text-sm font-semibold text-gray-500 sm:text-base md:text-lg">
            Explore your design idea with this simple but eye-catchy minimal
            style with icon and button.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid w-full max-w-screen-2xl grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:px-6 md:px-10 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <motion.div
              className="w-full"
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              //@ts-ignore
              variants={cardVariants}
            >
              <Card className="h-auto w-full items-center justify-center border-2 border-primary p-3 text-center shadow-md transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 md:h-[300px] lg:h-[450px]">
                <CardHeader className="flex w-full flex-col items-center ">
                  <div
                    className={`group flex items-center justify-center rounded-full p-4 transition-colors duration-300 sm:p-6 ${
                      feature.circleBg
                        ? "bg-primary"
                        : "bg-gray-100 hover:bg-primary"
                    } `}
                  >
                    <span
                      className={`size-8 transition-colors duration-300 ${
                        feature.circleBg
                          ? "text-white"
                          : "text-primary group-hover:text-white"
                      } `}
                    >
                      {feature.icon}
                    </span>
                  </div>
                </CardHeader>
                <CardTitle className="flex h-24 w-full items-center justify-center text-base font-bold md:text-lg lg:text-2xl  ">
                  {feature.title}
                </CardTitle>
                <CardContent>
                  <CardDescription className="mx-auto w-full font-medium text-gray-500">
                    <ul className=" list-disc space-y-2 text-left text-sm ">
                      {feature.description.map((point, i) => (
                        <li className="text-sm" key={i}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
