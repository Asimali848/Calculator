import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy, Star, Handshake } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Trophy className="size-8" />,
    title: "Easy Payment",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradise.",
  },
  {
    icon: <Star className="size-8 text-white" />,
    title: "User Review",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradise.",
    circleBg: "bg-primary",
  },
  {
    icon: <Handshake className="size-8" />,
    title: "Communication",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradise.",
  },
  {
    icon: <Star className="size-8 text-white" />,
    title: "User Review",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradise.",
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
    <div className="w-full h-full max-w-screen-2xl mx-auto bg-white">
      <div className="w-full flex flex-col justify-start items-center py-16 sm:py-20 md:py-24 gap-8 sm:gap-10">
        {/* Heading */}
        <div className="w-full flex flex-col justify-center items-center gap-3 px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Features
          </h1>
          <hr className="w-16 sm:w-20 h-1 bg-primary rounded-full" />
          <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-500 max-w-xl">
            Explore your design idea with this simple but eye-catchy minimal
            style with icon and button.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10 w-full max-w-screen-2xl">
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
              <Card className="text-center w-full items-center justify-center shadow-md border-2 h-auto md:h-[300px] lg:h-[400px] border-primary transition hover:scale-105 duration-300 hover:shadow-2xl hover:shadow-primary/20 p-4">
                <CardHeader className="flex flex-col items-center w-full gap-4 sm:gap-5">
                  <div
                    className={`group p-4 sm:p-6 rounded-full transition-colors duration-300 flex items-center justify-center
                      ${
                        feature.circleBg
                          ? "bg-primary"
                          : "bg-gray-100 hover:bg-primary"
                      }
                    `}
                  >
                    <span
                      className={`size-8 transition-colors duration-300
                        ${
                          feature.circleBg
                            ? "text-white"
                            : "text-primary group-hover:text-white"
                        }
                      `}
                    >
                      {feature.icon}
                    </span>
                  </div>
                  <CardTitle className="flex items-center justify-center font-bold text-base md:text-lg lg:text-2xl w-full">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm md:text-lg font-medium text-gray-500 w-full text-center md:text-justify lg:text-center mx-auto">
                    {feature.description}
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
