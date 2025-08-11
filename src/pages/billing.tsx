// import { useState } from "react";
// import { Check, Package, Rocket } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { cn } from "@/lib/utils"; // <-- import hook
// import { useStripeCheckoutMutation } from "@/store/services/auth";

// const Billing = () => {
//   const [billingCycle, setBillingCycle] = useState<"month" | "year">("month");
//   const [stripeCheckout, { isLoading }] = useStripeCheckoutMutation();

//   const plans = [
//     {
//       id: "starter",
//       name: "Starter",
//       description: "For growing law firms",
//       icon: Package,
//       price: { monthly: 0, yearly: 0 },
//       badge: "Current Plan",
//       badgeColor: "bg-orange-500",
//       features: [
//         "3 Cases",
//         "2 Document Templates",
//         "Basic Support",
//         "Standard Features",
//       ],
//       buttonText: "Current Plan",
//       buttonVariant: "outline" as const,
//       cardClass: "bg-card border-2 border-muted",
//       popular: false,
//     },
//     {
//       id: "normal",
//       name: "Pro",
//       description: "For Big Law Firms",
//       icon: Rocket,
//       price: { month: 129, year: 1290 },
//       features: [
//         "Unlimited Cases",
//         "10 Document Templates",
//         "Priority Support",
//         "Advanced Analytics",
//         "Custom Integrations",
//       ],
//       buttonText: "Subscribe Now",
//       buttonVariant: "default" as const,
//       cardClass:
//         "bg-primary/80 text-white border-2 transform scale-105 shadow-2xl hover:bg-primary/80",
//       popular: true,
//     },
//   ];

//  const handleSubscribe = async (price: number, interval: string) => {
//   try {
//     const token = localStorage.getItem("access"); // get token from localStorage
//     const res: any = await stripeCheckout({
//       token: token || undefined,
//       data: { price, interval },
//     }).unwrap();

//     if (res?.checkout_url) {
//       window.location.href = res.checkout_url; // redirect to Stripe Checkout
//     } else {
//       console.error("Stripe checkout_url not found in response", res);
//     }
//   } catch (error) {
//     console.error("Stripe checkout error:", error);
//   }
// };

//   return (
//     <div className="mx-auto flex h-screen w-full flex-col overflow-auto p-4 md:p-10">
//       <div className="max-w-8xl mx-auto flex w-full flex-col items-center justify-center">
//         {/* Header */}
//         <div className="w-full text-center">
//           <h1 className="text-4xl font-bold text-foreground">Choose Your Plan</h1>
//           <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
//             Select the perfect plan for your law firm. Upgrade or downgrade at any time.
//           </p>
//         </div>

//         {/* Billing Toggle */}
//         <div className="flex w-full justify-center gap-2.5 py-5">
//           <div className="flex rounded-lg bg-muted p-1">
//             <Button
//               variant={billingCycle === "month" ? "default" : "ghost"}
//               size="sm"
//               onClick={() => setBillingCycle("month")}
//               className="rounded-md"
//             >
//               Monthly
//             </Button>
//             <Button
//               variant={billingCycle === "year" ? "default" : "ghost"}
//               size="sm"
//               onClick={() => setBillingCycle("year")}
//               className="rounded-md"
//             >
//               Yearly
//               <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
//                 Save 20%
//               </Badge>
//             </Button>
//           </div>
//         </div>

//         {/* Pricing Cards */}
//         <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 pt-5 md:grid-cols-2">
//           {plans.map((plan) => {
//             const Icon = plan.icon;
//             const price = plan.price[billingCycle];

//             return (
//               <Card
//                 key={plan.id}
//                 className={cn(
//                   "relative overflow-hidden transition-all duration-300 hover:bg-primary/20 hover:shadow-lg",
//                   plan.cardClass
//                 )}
//               >
//                 {plan.popular && (
//                   <div className="absolute left-0 right-0 top-0 bg-primary/10 py-2 text-center text-sm font-medium text-white">
//                     Most Popular
//                   </div>
//                 )}

//                 {plan.badge && !plan.popular && (
//                   <div className="absolute right-4 top-4">
//                     <Badge className={cn("text-white", plan.badgeColor)}>
//                       {plan.badge}
//                     </Badge>
//                   </div>
//                 )}

//                 <CardHeader
//                   className={cn(
//                     "pb-4 text-center",
//                     plan.popular ? "pt-12" : "pt-6"
//                   )}
//                 >
//                   <div className="mb-4 flex justify-center">
//                     <div
//                       className={cn(
//                         "flex h-16 w-16 items-center justify-center rounded-2xl",
//                         plan.popular ? "bg-white/20" : "bg-primary/10"
//                       )}
//                     >
//                       <Icon
//                         className={cn(
//                           "h-8 w-8",
//                           plan.popular ? "text-white" : "text-primary"
//                         )}
//                       />
//                     </div>
//                   </div>

//                   <h3
//                     className={cn(
//                       "text-2xl font-bold",
//                       plan.popular ? "text-white" : "text-foreground"
//                     )}
//                   >
//                     {plan.name}
//                   </h3>

//                   <p
//                     className={cn(
//                       "text-sm",
//                       plan.popular ? "text-blue-100" : "text-muted-foreground"
//                     )}
//                   >
//                     {plan.description}
//                   </p>
//                 </CardHeader>

//                 <CardContent className="space-y-6">
//                   {/* Price */}
//                   <div className="text-center">
//                     {price === 0 ? (
//                       <div
//                         className={cn(
//                           "text-5xl font-bold",
//                           plan.popular ? "text-white" : "text-foreground"
//                         )}
//                       >
//                         Free
//                       </div>
//                     ) : (
//                       <div className="flex items-baseline justify-center">
//                         <span
//                           className={cn(
//                             "text-5xl font-bold",
//                             plan.popular ? "text-white" : "text-foreground"
//                           )}
//                         >
//                           ${price}
//                         </span>
//                         <span
//                           className={cn(
//                             "ml-1 text-lg",
//                             plan.popular ? "text-blue-100" : "text-muted-foreground"
//                           )}
//                         >
//                           /{billingCycle === "month" ? "m" : "y"}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Features */}
//                   <div className="space-y-4">
//                     <h4
//                       className={cn(
//                         "font-semibold",
//                         plan.popular ? "text-white" : "text-foreground"
//                       )}
//                     >
//                       What's Included
//                     </h4>

//                     <ul className="space-y-3">
//                       {plan.features.map((feature, index) => (
//                         <li key={index} className="flex items-center gap-3">
//                           <div
//                             className={cn(
//                               "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
//                               plan.popular ? "bg-white/20" : "bg-primary/10"
//                             )}
//                           >
//                             <Check
//                               className={cn(
//                                 "h-3 w-3",
//                                 plan.popular ? "text-white" : "text-primary"
//                               )}
//                             />
//                           </div>
//                           <span
//                             className={cn(
//                               "text-sm",
//                               plan.popular ? "text-blue-50" : "text-foreground"
//                             )}
//                           >
//                             {feature}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Button */}
//                   <Button
//                     className={cn(
//                       "w-full py-3 font-semibold",
//                       plan.popular
//                         ? "border-0 bg-white/30 text-white hover:bg-primary"
//                         : plan.id === "starter"
//                         ? "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
//                         : "bg-primary text-primary-foreground hover:bg-primary/70"
//                     )}
//                     variant={plan.buttonVariant}
//                     disabled={plan.id === "starter" || isLoading}
//                     onClick={() => {
//                       if (plan.id !== "starter") {
//                         handleSubscribe(Number(price), billingCycle);
//                       }
//                     }}
//                   >
//                     {isLoading && plan.id === "normal" ? "Redirecting..." : plan.buttonText}
//                   </Button>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Billing;



import { useState } from "react";
import { Check, Package, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useStripeCheckoutMutation } from "@/store/services/auth";

const Billing = () => {
  const [billingCycle, _] = useState<"month" | "year">("month");
  const [stripeCheckout, { isLoading }] = useStripeCheckoutMutation();

  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isPaidUser = user?.is_paid === true;

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "For growing law firms",
      icon: Package,
      price: { monthly: 0, yearly: 0 },
      badge: !isPaidUser ? "Current Plan" : undefined,
      badgeColor: "bg-orange-500",
      features: [
        "3 Cases",
        "2 Document Templates",
        "Basic Support",
        "Standard Features",
      ],
      buttonText: !isPaidUser ? "Current Plan" : "Upgrade",
      buttonVariant: !isPaidUser ? ("default" as const) : ("default" as const),
      cardClass: "bg-card border-2 border-muted",
      popular: false,
      disabled: !isPaidUser, // starter disabled if not paid
    },
    {
      id: "normal",
      name: "Pro",
      description: "For Big Law Firms",
      icon: Rocket,
      price: { month: 129, year: 1290 },
      badge: isPaidUser ? "Current Plan" : undefined, // ✅ show if paid
      badgeColor: "bg-orange-500",
      features: [
        "Unlimited Cases",
        "10 Document Templates",
        "Priority Support",
        "Advanced Analytics",
        "Custom Integrations",
      ],
      buttonText: isPaidUser ? "Current Plan" : "Subscribe Now",
      buttonVariant: isPaidUser ? ("default" as const) : ("default" as const),
      cardClass:
        "bg-primary text-red-500 border-2 transform scale-105 shadow-2xl hover:bg-primary/80",
      popular: true,
      disabled: isPaidUser, // ✅ disable if already paid
    },
  ];

  const handleSubscribe = async (price: number, interval: string) => {
    try {
      const token = localStorage.getItem("access");
      const res: any = await stripeCheckout({
        token: token || undefined,
        data: { price, interval },
      }).unwrap();

      if (res?.checkout_url) {
        window.location.href = res.checkout_url;
      } else {
        console.error("Stripe checkout_url not found in response", res);
      }
    } catch (error) {
      console.error("Stripe checkout error:", error);
    }
  };

  return (
    <div className="mx-auto flex h-screen w-full flex-col overflow-auto p-4 md:p-10">
      <div className="max-w-8xl mx-auto flex w-full flex-col items-center justify-center">
        {/* Header */}
        <div className="w-full text-center">
          <h1 className="text-4xl font-bold text-foreground">Choose Your Plan</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Select the perfect plan for your law firm. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Billing Toggle */}
        {/* <div className="flex w-full justify-center gap-2.5 py-5">
          <div className="flex rounded-lg bg-muted p-1">
            <Button
              variant={billingCycle === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("month")}
              className="rounded-md"
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "year" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("year")}
              className="rounded-md"
            >
              Yearly
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                Save 20%
              </Badge>
            </Button>
          </div>
        </div> */}

        {/* Pricing Cards */}
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 pt-20">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = plan.price[billingCycle];

            return (
              <Card
                key={plan.id}
                className={cn(
                  "relative overflow-hidden transition-all duration-300 hover:bg-primary/20 hover:shadow-lg",
                  plan.cardClass
                )}
              >
                {plan.popular && (
                  <div className="absolute left-0 right-0 top-0 bg-primary/10 py-2 text-center text-sm font-medium text-white">
                    Most Popular
                  </div>
                )}

                {plan.badge && (
                  <div className="absolute right-4 top-4">
                    <Badge className={cn("text-white", plan.badgeColor)}>
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader
                  className={cn("pb-4 text-center", plan.popular ? "pt-12" : "pt-6")}
                >
                  <div className="mb-4 flex justify-center">
                    <div
                      className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-2xl",
                        plan.popular ? "bg-white/20" : "bg-primary/10"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-8 w-8",
                          plan.popular ? "text-white" : "text-primary"
                        )}
                      />
                    </div>
                  </div>
                  <h3
                    className={cn(
                      "text-2xl font-bold",
                      plan.popular ? "text-white" : "text-foreground"
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={cn(
                      "text-sm",
                      plan.popular ? "text-blue-100" : "text-muted-foreground"
                    )}
                  >
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price */}
                  <div className="text-center">
                    {price === 0 ? (
                      <div
                        className={cn(
                          "text-5xl font-bold",
                          plan.popular ? "text-white" : "text-foreground"
                        )}
                      >
                        Free
                      </div>
                    ) : (
                      <div className="flex items-baseline justify-center">
                        <span
                          className={cn(
                            "text-5xl font-bold",
                            plan.popular ? "text-white" : "text-foreground"
                          )}
                        >
                          ${price}
                        </span>
                        <span
                          className={cn(
                            "ml-1 text-lg",
                            plan.popular ? "text-blue-100" : "text-muted-foreground"
                          )}
                        >
                          /{billingCycle === "month" ? "m" : "y"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4
                      className={cn(
                        "font-semibold",
                        plan.popular ? "text-white" : "text-foreground"
                      )}
                    >
                      What's Included
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div
                            className={cn(
                              "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                              plan.popular ? "bg-white/20" : "bg-primary/10"
                            )}
                          >
                            <Check
                              className={cn(
                                "h-3 w-3",
                                plan.popular ? "text-white" : "text-primary"
                              )}
                            />
                          </div>
                          <span
                            className={cn(
                              "text-sm",
                              plan.popular ? "text-blue-50" : "text-foreground"
                            )}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <Button
                    className="w-full py-3 font-semibold shadow-none text-white border-2 border-white "
                    variant={plan.buttonVariant}
                    disabled={plan.disabled || isLoading}
                    onClick={() => {
                      if (!plan.disabled) {
                        handleSubscribe(Number(price), billingCycle);
                      }
                    }}
                  >
                    {isLoading && !plan.disabled
                      ? "Redirecting..."
                      : plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Billing;
