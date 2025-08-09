import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Faq = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="w-full h-full overflow-hidden  space-y-8 sm:space-y-10  md:py-5 ">
      {/* Heading */}
      <div className="w-full flex flex-col justify-center items-center gap-3 sm:gap-5 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">FAQs</h1>
        <hr className="w-16 sm:w-20 h-1 bg-primary rounded-full" />
        <p className="text-base sm:text-lg md:text-2xl font-semibold text-gray-600 max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {/* Background Section */}
      <div
        ref={ref}
        className="w-full py-16 sm:py-24 lg:py-32 flex flex-col justify-start items-center transition-all duration-1000 ease-in-out bg-cover bg-center px-4 "
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0px)" : "translateY(50px)",
          backgroundImage:
            "url(https://www.judgmentcalc.com/wp-content/uploads/2025/06/judge-gavel-with-justice-lawyers-having-team-meeti-HMWWXEN.webp)",
        }}
      >
        {/* Accordion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 lg:gap-6 w-full mx-auto max-w-screen-2xl ">
          {/* Column 1 */}
          <div className="w-full">
            <Accordion
              type="single"
              collapsible
              className="space-y-4 p-4 sm:p-5 text-white"
            >
              <AccordionItem
                value="item-1"
                className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
              >
                <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
                  What is JudgmentCalc used for?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
                  JudgmentCalc helps you track judgments, calculate accrued
                  interest, and manage transactions with ease.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-2"
                className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
              >
                <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
                  Can I track multiple judgments?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
                  Yes, you can track and manage multiple judgments at once,
                  including payments and interest calculations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-3"
                className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
              >
                <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
                  Is interest calculation automatic?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
                  Absolutely. Our tool automatically calculates accrued interest
                  up to date based on your settings.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Column 2 */}
          <div className="w-full">
            <Accordion
              type="single"
              collapsible
              className="space-y-4 p-4 sm:p-5 text-white"
            >
              <AccordionItem
                value="item-1"
                className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
              >
                <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
                  What is JudgmentCalc used for?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
                  JudgmentCalc helps you track judgments, calculate accrued
                  interest, and manage transactions with ease.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-2"
                className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
              >
                <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
                  Can I track multiple judgments?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
                  Yes, you can track and manage multiple judgments at once,
                  including payments and interest calculations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-3"
                className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
              >
                <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
                  Is interest calculation automatic?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
                  Absolutely. Our tool automatically calculates accrued interest
                  up to date based on your settings.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
