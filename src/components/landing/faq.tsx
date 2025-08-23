// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { useInView } from "framer-motion";
// import { useRef } from "react";

// const Faq = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   return (
//     <div className="w-full h-full overflow-hidden  space-y-8 sm:space-y-10  md:py-5 ">
//       {/* Heading */}
//       <div className="w-full flex flex-col justify-center items-center gap-3 sm:gap-5 px-4 text-center">
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">FAQs</h1>
//         <hr className="w-16 sm:w-20 h-1 bg-primary rounded-full" />
//         <p className="text-base sm:text-lg md:text-2xl font-semibold text-gray-600 max-w-2xl">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//         </p>
//       </div>

//       <div
//         ref={ref}
//         className="w-full py-16 sm:py-24 lg:py-32 flex flex-col justify-start items-center transition-all duration-1000 ease-in-out bg-cover bg-center px-4 "
//         style={{
//           opacity: isInView ? 1 : 0,
//           transform: isInView ? "translateY(0px)" : "translateY(50px)",
//           backgroundImage:
//             "url(https://www.judgmentcalc.com/wp-content/uploads/2025/06/judge-gavel-with-justice-lawyers-having-team-meeti-HMWWXEN.webp)",
//         }}
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-0 lg:gap-6 w-full mx-auto max-w-screen-2xl ">
//           {/* Column 1 */}
//           <div className="w-full">
//             <Accordion
//               type="single"
//               collapsible
//               className="space-y-4 p-4 sm:p-5 text-white"
//             >
//               <AccordionItem
//                 value="item-1"
//                 className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
//               >
//                 <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
//                   What is JudgmentCalc used for?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
//                   JudgmentCalc helps you track judgments, calculate accrued
//                   interest, and manage transactions with ease.
//                 </AccordionContent>
//               </AccordionItem>
//               <AccordionItem
//                 value="item-2"
//                 className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
//               >
//                 <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
//                   Can I track multiple judgments?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
//                   Yes, you can track and manage multiple judgments at once,
//                   including payments and interest calculations.
//                 </AccordionContent>
//               </AccordionItem>
//               <AccordionItem
//                 value="item-3"
//                 className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
//               >
//                 <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
//                   Is interest calculation automatic?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
//                   Absolutely. Our tool automatically calculates accrued interest
//                   up to date based on your settings.
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </div>

//           {/* Column 2 */}
//           <div className="w-full">
//             <Accordion
//               type="single"
//               collapsible
//               className="space-y-4 p-4 sm:p-5 text-white"
//             >
//               <AccordionItem
//                 value="item-1"
//                 className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
//               >
//                 <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
//                   What is JudgmentCalc used for?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
//                   JudgmentCalc helps you track judgments, calculate accrued
//                   interest, and manage transactions with ease.
//                 </AccordionContent>
//               </AccordionItem>
//               <AccordionItem
//                 value="item-2"
//                 className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
//               >
//                 <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
//                   Can I track multiple judgments?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
//                   Yes, you can track and manage multiple judgments at once,
//                   including payments and interest calculations.
//                 </AccordionContent>
//               </AccordionItem>
//               <AccordionItem
//                 value="item-3"
//                 className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
//               >
//                 <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
//                   Is interest calculation automatic?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
//                   Absolutely. Our tool automatically calculates accrued interest
//                   up to date based on your settings.
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Faq;



import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  {
    q: "Can I use this in my state?",
    a: (
      <>
        Yes. JudgmentCalc.com works no matter where your judgment was entered.
        You control the interest rate that’s applied — whether it’s statutory,
        contractual, or court-ordered.
        <br />
        <br />
        Not sure what rate your jurisdiction uses?{" "}
        <a
          href="/interest-rate"
          className="text-primary underline hover:text-primary/80"
        >
          Click here
        </a>{" "}
        to view a guide to judgment interest rates by state.
      </>
    ),
  },
  {
    q: "How is interest calculated?",
    a: (
      <>
        Interest is calculated on a daily simple interest basis, using the
        principal balance and any adjustments you’ve entered. When payments or
        costs are added, the system automatically updates the balance and applies
        interest going forward — just like a court would.
        <br />
        <br />
        You choose the rate and the as-of date, and JudgmentCalc.com does the
        rest. No compounding, no guesswork, and no spreadsheet formulas.
      </>
    ),
  },
  {
    q: "I'm renewing my judgment and need to compound the interest. How do I do that?",
    a: (
      <>
        To compound interest upon renewal, enter a payment on the renewal date
        for the full amount of unpaid accrued interest. This zeros out the running
        interest balance. Then, immediately enter a Cost Award for that same
        amount — effectively folding the accrued interest into the principal of
        the renewed judgment.
        <br />
        <br />
        From that point forward, interest will accrue on the increased balance,
        achieving proper compounding consistent with judgment renewal
        procedures. We'll be adding an auto compound feature soon. Stay tuned!
      </>
    ),
  },
  {
    q: "How are costs treated?",
    a: (
      <>
        Costs are treated as additions to the judgment principal on the date you
        enter them. Once added, they begin to accrue interest just like the
        original judgment amount.
        <br />
        <br />
        This ensures that recoverable expenses — like writ fees, levy charges, or
        renewal costs — are fully accounted for in the growing payoff balance.
        You control the timing and amount of each cost entry.
      </>
    ),
  },
  {
    q: "What's your cancellation/refund policy?",
    a: (
      <>
        We offer a free 30-day trial — no credit card required. If you decide not
        to subscribe, your data will be automatically deleted 10 days after the
        trial ends. We’re sorry to see you go!
        <br />
        <br />
        If you sign up for a paid plan, your subscription will remain active
        through the end of the billing term (monthly or yearly) and will not
        auto-renew. No surprise charges, no hassle. All of your data will be
        deleted thirty days after your subscription ends.
      </>
    ),
  },
  {
    q: "Is my data secure?",
    a: (
      <>
        Yes. Your data is encrypted in transit and stored securely using
        industry-standard best practices. We never share, sell, or mine your
        information — and we do not require any client-identifying details to use
        the system.
        <br />
        <br />
        You’re always in control. If you cancel your account, your data is
        permanently deleted after a short grace period.
      </>
    ),
  },
];

const Faq = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="w-full h-full overflow-hidden space-y-8 sm:space-y-10 md:py-5">
      {/* Heading */}
      <div className="w-full flex flex-col justify-center items-center gap-3 sm:gap-5 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">FAQs</h1>
        <hr className="w-16 sm:w-20 h-1 bg-primary rounded-full" />
        <p className="text-base sm:text-lg md:text-2xl font-semibold text-gray-600 max-w-2xl">
          Find answers to the most common questions about JudgmentCalc.
        </p>
      </div>

      <div
        ref={ref}
        className="w-full py-16 sm:py-24 lg:py-32 flex flex-col justify-start items-center transition-all duration-1000 ease-in-out bg-cover bg-center px-4"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0px)" : "translateY(50px)",
          backgroundImage:
            "url(https://www.judgmentcalc.com/wp-content/uploads/2025/06/judge-gavel-with-justice-lawyers-having-team-meeti-HMWWXEN.webp)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 lg:gap-6 w-full mx-auto max-w-screen-2xl">
          {/* Column 1 */}
          <div className="w-full">
            <Accordion type="single" collapsible className="space-y-4 p-4 sm:p-5 text-white">
              {faqs.slice(0, 3).map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
                >
                  <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Column 2 */}
          <div className="w-full">
            <Accordion type="single" collapsible className="space-y-4 p-4 sm:p-5 text-white">
              {faqs.slice(3).map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i + 3}`}
                  className="bg-primary rounded-xl p-4 sm:p-1 sm:px-5"
                >
                  <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-lg md:text-xl bg-white py-2 px-3 text-primary rounded-lg">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
