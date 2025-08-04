// import { useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { formatCurrency } from "@/lib/calculations";
// import { usePostCaseMutation } from "@/store/services/case";
// import { Textarea } from "../ui/textarea";
// const roundToSix = (num: number): number => {
//   return parseFloat(num.toFixed(2));
// };
// type CaseData = {
//   id?: string;
//   caseName: string;
//   courtName: string;
//   courtCaseNumber: string;
//   judgmentAmount: number;
//   judgmentDate: string;
//   lastPaymentDate: string | null;
//   totalPayments: number;
//   accruedInterest: number;
//   principalBalance: number;
//   payoffAmount: number;
//   interestRate: number;
//   isEnded?: boolean;
//   debtorInfo?: string;
// };
// const caseSchema = z.object({
//   caseName: z.string().min(1, "Case name is required"),
//   courtName: z.string().min(1, "Court name is required"),
//   courtCaseNumber: z.string().min(1, "Court case number is required"),
//   judgmentAmount: z
//     .number()
//     .min(0.01, "Judgment amount must be greater than 0"),
//   interestRate: z.number().min(0, "Interest rate must be positive"),
//   judgmentDate: z.string().min(1, "Judgment date is required"),
//   endDate: z.string().optional(),
//   paymentAmount: z.number().optional(),
//   cost: z.number().optional(),
//   debtorInfo: z.string().optional(),
// });
// interface AddCaseModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSubmit: (data: CaseData) => void;
// }
// const AddCaseModal = ({ open, onOpenChange, onSubmit }: AddCaseModalProps) => {
//   const [isEndDateEnabled, _] = useState(false);
//   const [calculationResults, setCalculationResults] = useState({
//     judgmentAmount: 0,
//     principalReduction: 0,
//     principalBalance: 0,
//     costsAfterJudgment: 0,
//     dailyInterest: 0,
//     interestAccrued: 0,
//     interestToDate: 0,
//     totalInterest: 0,
//     days: 0,
//     grandTotal: 0,
//   });
//   const form = useForm<z.infer<typeof caseSchema>>({
//     resolver: zodResolver(caseSchema),
//     defaultValues: {
//       caseName: "",
//       courtName: "",
//       courtCaseNumber: "",
//       judgmentAmount: 0,
//       interestRate: 10,
//       judgmentDate: new Date().toISOString().split("T")[0],
//       endDate: new Date().toISOString().split("T")[0],
//       paymentAmount: 0,
//       cost: 0,
//       debtorInfo: "",
//     },
//   });
//   const watchedValues = form.watch();
//   useEffect(() => {
//     const {
//       judgmentAmount = 0,
//       interestRate = 10,
//       paymentAmount = 0,
//       cost = 0,
//       judgmentDate,
//       endDate,
//     } = watchedValues;
//     let startDate = new Date(judgmentDate);
//     let finalDate = new Date(endDate || new Date());
//     if (isNaN(startDate.getTime())) startDate = new Date();
//     if (isNaN(finalDate.getTime())) finalDate = new Date();
//     const timeDiff = finalDate.getTime() - startDate.getTime();
//     const days = Math.max(0, Math.floor(timeDiff / (1000 * 3600 * 24)) + 1);
//     const dailyInterest = roundToSix(
//       (judgmentAmount * (interestRate / 100)) / 365
//     );
//     const interestAccrued = roundToSix(dailyInterest * days);
//     const principalReduction = paymentAmount || 0;
//     const costsAfterJudgment = cost || 0;
//     const principalBalance = roundToSix(
//       judgmentAmount - principalReduction + costsAfterJudgment
//     );
//     const totalInterest = roundToSix(interestAccrued);
//     const grandTotal = roundToSix(principalBalance + totalInterest);
//     setCalculationResults({
//       judgmentAmount,
//       principalReduction,
//       principalBalance,
//       costsAfterJudgment,
//       dailyInterest,
//       interestAccrued,
//       interestToDate: interestAccrued,
//       totalInterest,
//       days,
//       grandTotal,
//     });
//   }, [watchedValues]);
//   const [postCase, { isLoading }] = usePostCaseMutation();
//   const handleSubmit = async (data: z.infer<typeof caseSchema>) => {
//     const token = localStorage.getItem("access") || "";
//     const newCase: CaseData = {
//       caseName: data.caseName,
//       courtName: data.courtName,
//       courtCaseNumber: data.courtCaseNumber,
//       judgmentAmount: roundToSix(data.judgmentAmount),
//       judgmentDate: data.judgmentDate,
//       // lastPaymentDate: data.endDate || new Date().toISOString().split("T")[0],
//       lastPaymentDate: isEndDateEnabled && data.endDate ? data.endDate : null,
//       totalPayments: roundToSix(data.paymentAmount || 0),
//       accruedInterest: calculationResults.totalInterest,
//       principalBalance: calculationResults.principalBalance,
//       payoffAmount: calculationResults.grandTotal,
//       interestRate: roundToSix(data.interestRate),
//       isEnded: false,
//       debtorInfo: data.debtorInfo || "",
//     };
//     try {
//       //@ts-ignore
//       const res = await postCase({ token, data: newCase }).unwrap();
//       form.reset();
//       onOpenChange(false);
//       window.location.reload();
//       toast.success("Case added successfully!", {
//         className: "bg-primary p-3 text-white",
//       });
//       //@ts-ignore
//       onSubmit(res);
//     } catch (error: any) {
//       console.error("Add case error:", error);
//       toast.error(
//         error?.data?.detail ||
//           error?.data?.message ||
//           "Failed to add case. Please try again.",
//         {
//           className: "bg-destrucative text-white p-3",
//         }
//       );
//     }
//   };
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-h-[90dvh] max-w-6xl overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-bold">New Case</DialogTitle>
//           <DialogDescription>
//             Enter judgment information and payment details to create a new case
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(handleSubmit)}
//             className="space-y-6"
//           >
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg text-primary">
//                   Judgment Information{" "}
//                   <span className="text-red-500">(Required)</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
//                   <FormField
//                     control={form.control}
//                     name="caseName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Case Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Enter case name" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="courtName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Court Name</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="e.g. Orange County Superior Court"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="courtCaseNumber"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Court Case Number</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Enter court case number"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="judgmentAmount"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Judgment Amount</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="input"
//                             placeholder="0000"
//                             value={field.value}
//                             onChange={(e) =>
//                               field.onChange(
//                                 e.target.value === ""
//                                   ? null
//                                   : parseFloat(e.target.value)
//                               )
//                             }
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="interestRate"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Interest Rate (%)</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="input"
//                             placeholder="0000"
//                             value={field.value}
//                             onChange={(e) =>
//                               field.onChange(
//                                 e.target.value === ""
//                                   ? null
//                                   : parseFloat(e.target.value)
//                               )
//                             }
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="judgmentDate"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Judgment Date</FormLabel>
//                         <FormControl>
//                           <Input type="date" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//             {/* <Card>
//               <CardHeader>
//                 <CardTitle className="flex w-full items-center justify-between text-lg text-primary">
//                   <div>
//                     Payment and Cost{" "}
//                     <span className="text-muted-foreground">(Optional)</span>
//                   </div>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setIsEndDateEnabled((prev) => !prev)}
//                   >
//                     {isEndDateEnabled
//                       ? "Last_Payment Date Disabled"
//                       : "Last_Payment Date Enabled"}
//                   </Button>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                   <FormField
//                     control={form.control}
//                     name="paymentAmount"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Payment Amount</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="input"
//                             placeholder="0000"
//                             value={field.value}
//                             onChange={(e) =>
//                               field.onChange(
//                                 e.target.value === ""
//                                   ? null
//                                   : parseFloat(e.target.value)
//                               )
//                             }
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="cost"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Cost</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="input"
//                             placeholder="0000"
//                             value={field.value}
//                             onChange={(e) =>
//                               field.onChange(
//                                 e.target.value === ""
//                                   ? null
//                                   : parseFloat(e.target.value)
//                               )
//                             }
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="endDate"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Last Payment Date</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="date"
//                             {...field}
//                             disabled={!isEndDateEnabled}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </CardContent>
//             </Card> */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg text-primary">
//                   Debtor Contact Info
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <FormField
//                   control={form.control}
//                   name="debtorInfo"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Debtor Information</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Enter debtor contact information"
//                           rows={3}
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-center text-lg">Results</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//                   <div className="space-y-4">
//                     <div className="flex justify-between">
//                       <span className="font-medium">Judgment Amount:</span>
//                       <span>
//                         {formatCurrency(calculationResults.judgmentAmount)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium">Principal Reduction:</span>
//                       <span>
//                         {formatCurrency(calculationResults.principalReduction)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium">Principal Balance:</span>
//                       <span>
//                         {formatCurrency(calculationResults.principalBalance)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium">Costs After Judgment:</span>
//                       <span>
//                         {formatCurrency(calculationResults.costsAfterJudgment)}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="space-y-4">
//                     <div className="flex justify-between">
//                       <span className="font-medium">Daily Interest:</span>
//                       <span>
//                         {formatCurrency(calculationResults.dailyInterest)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium">Interest Accrued:</span>
//                       <span>
//                         {formatCurrency(calculationResults.interestAccrued)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium">Interest to Date:</span>
//                       <span>
//                         {formatCurrency(calculationResults.interestToDate)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium">Total Interest:</span>
//                       <span>
//                         {formatCurrency(calculationResults.totalInterest)}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="space-y-4">
//                     <div className="flex justify-between">
//                       <span className="font-medium">Days:</span>
//                       <span>{calculationResults.days}</span>
//                     </div>
//                     <Separator />
//                     <div className="flex justify-between text-lg font-bold">
//                       <span>GRAND TOTAL:</span>
//                       <span className="text-primary">
//                         {formatCurrency(calculationResults.grandTotal)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <div className="flex space-x-2 pt-4">
//               <Button
//                 type="submit"
//                 className="flex-1 hover:bg-primary/80"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Adding Case..." : "Add Case"}
//               </Button>
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="flex-1"
//                 onClick={() => onOpenChange(false)}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };
// export default AddCaseModal;
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/calculations";
import { usePostCaseMutation } from "@/store/services/case";

const roundToSix = (num: number): number => {
  return parseFloat(num.toFixed(4));
};

type CaseData = {
  id?: string;
  caseName: string;
  courtName: string;
  courtCaseNumber: string;
  judgmentAmount: number;
  judgmentDate: string;
  lastPaymentDate: string | null;
  totalPayments: number;
  accruedInterest: number;
  principalBalance: number;
  payoffAmount: number;
  interestRate: number;
  isEnded?: boolean;
  debtorInfo?: string;
};

const caseSchema = z.object({
  caseName: z.string().min(1, "Case name is required"),
  courtName: z.string().min(1, "Court name is required"),
  courtCaseNumber: z.string().min(1, "Court case number is required"),
  judgmentAmount: z
    .number()
    .min(0.01, "Judgment amount must be greater than 0"),
  interestRate: z.number().min(0, "Interest rate must be positive"),
  judgmentDate: z.string().min(1, "Judgment date is required"),
  endDate: z.string().optional(),
  paymentAmount: z.number().optional(),
  cost: z.number().optional(),
  debtorFirm: z.string().optional(),
  debtorStreet: z.string().optional(),
  debtorCity: z.string().optional(),
  debtorState: z.string().optional(),
  debtorZip: z.string().optional(),
  debtorPhone: z.string().optional(),
  debtorEmail: z.string().optional(),
});

// interface AddCaseModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSubmit: (data: CaseData) => void;
// }
interface AddCaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void; // ✅ Rename for clarity
}

const AddCaseModal = ({ open, onOpenChange, onSubmit }: AddCaseModalProps) => {
  const [isEndDateEnabled, _] = useState(false);

  const [calculationResults, setCalculationResults] = useState({
    judgmentAmount: 0,
    principalReduction: 0,
    principalBalance: 0,
    costsAfterJudgment: 0,
    dailyInterest: 0,
    interestAccrued: 0,
    interestToDate: 0,
    totalInterest: 0,
    days: 0,
    grandTotal: 0,
  });

  const form = useForm<z.infer<typeof caseSchema>>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      caseName: "",
      courtName: "",
      courtCaseNumber: "",
      judgmentAmount: 0,
      interestRate: 10,
      judgmentDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      paymentAmount: 0,
      cost: 0,
      debtorFirm: "",
      debtorStreet: "",
      debtorCity: "",
      debtorState: "",
      debtorZip: "",
      debtorPhone: "",
      debtorEmail: "",
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    const {
      judgmentAmount = 0,
      interestRate = 10,
      paymentAmount = 0,
      cost = 0,
      judgmentDate,
      endDate,
    } = watchedValues;

    let startDate = new Date(judgmentDate);
    let finalDate = new Date(endDate || new Date());

    if (isNaN(startDate.getTime())) startDate = new Date();
    if (isNaN(finalDate.getTime())) finalDate = new Date();

    const timeDiff = finalDate.getTime() - startDate.getTime();

    // const days = Math.max(0, Math.floor(timeDiff / (1000 * 3600 * 24)) +1 );
    const days = Math.max(0, Math.floor(timeDiff / (1000 * 3600 * 24)));

    const dailyInterest = roundToSix(
      (judgmentAmount * (interestRate / 100)) / 365
    );
    const interestAccrued = roundToSix(dailyInterest * days);
    const principalReduction = paymentAmount || 0;
    const costsAfterJudgment = cost || 0;
    const principalBalance = roundToSix(
      judgmentAmount - principalReduction + costsAfterJudgment
    );
    const totalInterest = roundToSix(interestAccrued);
    const grandTotal = roundToSix(principalBalance + totalInterest);

    setCalculationResults({
      judgmentAmount,
      principalReduction,
      principalBalance,
      costsAfterJudgment,
      dailyInterest,
      interestAccrued,
      interestToDate: interestAccrued,
      totalInterest,
      days,
      grandTotal,
    });
  }, [watchedValues]);

  const [postCase, { isLoading }] = usePostCaseMutation();

  // const handleSubmit = async (data: z.infer<typeof caseSchema>) => {
  //   const token = localStorage.getItem("access") || "";

  //   // Combine debtor info into a single string
  //   const debtorInfo = [
  //     data.debtorFirm,
  //     data.debtorStreet,
  //     `${data.debtorCity}, ${data.debtorState} ${data.debtorZip}`,
  //     `Phone: ${data.debtorPhone}`,
  //     `Email: ${data.debtorEmail}`,
  //   ]
  //     .filter(Boolean)
  //     .join("\n");

  //   const newCase: CaseData = {
  //     caseName: data.caseName,
  //     courtName: data.courtName,
  //     courtCaseNumber: data.courtCaseNumber,
  //     judgmentAmount: roundToSix(data.judgmentAmount),
  //     judgmentDate: data.judgmentDate,
  //     lastPaymentDate: isEndDateEnabled && data.endDate ? data.endDate : null,
  //     totalPayments: roundToSix(data.paymentAmount || 0),
  //     accruedInterest: calculationResults.totalInterest,
  //     principalBalance: calculationResults.principalBalance,
  //     payoffAmount: calculationResults.grandTotal,
  //     interestRate: roundToSix(data.interestRate),
  //     isEnded: false,
  //     debtorInfo,
  //   };

  //   try {
  //     //@ts-ignore
  //     const res = await postCase({ token, data: newCase }).unwrap();
  //     form.reset();
  //     onOpenChange(false);
  //     toast.success("Case added successfully!", {
  //       className: "bg-primary p-3 text-white",
  //     });
  //     // setTimeout(() => {
  //     //   window.location.reload();
  //     // }, 1000);
  //     //@ts-ignore
  //     onSubmit(res);
  //   } catch (error: any) {
  //     toast.error(
  //       error?.data?.detail ||
  //         error?.data?.message ||
  //         "Failed to add case. Please try again.",
  //       {
  //         className: "bg-destructive text-white p-3",
  //       }
  //     );
  //   }
  // };

  const handleSubmit = async (data: z.infer<typeof caseSchema>) => {
    const token = localStorage.getItem("access") || "";

    const debtorInfo = [
      data.debtorFirm,
      data.debtorStreet,
      `${data.debtorCity}, ${data.debtorState} ${data.debtorZip}`,
      `Phone: ${data.debtorPhone}`,
      `Email: ${data.debtorEmail}`,
    ]
      .filter(Boolean)
      .join("\n");

    const newCase: CaseData = {
      caseName: data.caseName,
      courtName: data.courtName,
      courtCaseNumber: data.courtCaseNumber,
      judgmentAmount: roundToSix(data.judgmentAmount),
      judgmentDate: data.judgmentDate,
      lastPaymentDate: isEndDateEnabled && data.endDate ? data.endDate : null,
      totalPayments: roundToSix(data.paymentAmount || 0),
      accruedInterest: calculationResults.totalInterest,
      principalBalance: calculationResults.principalBalance,
      payoffAmount: calculationResults.grandTotal,
      interestRate: roundToSix(data.interestRate),
      isEnded: false,
      debtorInfo,
    };

    try {
      //@ts-ignore
      const res = await postCase({ token, data: newCase }).unwrap();

      form.reset();
      onOpenChange(false);

      toast.success("Case added successfully.", {
        className: "bg-green-600 p-3 text-white",
      });

      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);

      onSubmit();
    } catch (error: any) {
      const statusCode = error?.data?.status_code || error?.status_code;

      if (statusCode === 400) {
        toast.error("Bad request: Please check your input.", {
          className: "bg-destructive text-white p-3",
        });
      } else if (statusCode === 500) {
        toast.error("Server error: Please try again later.", {
          className: "bg-destructive text-white p-3",
        });
      } else {
        null
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">New Case</DialogTitle>
          <DialogDescription>
            Enter judgment information
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">
                  Judgment Information{" "}
                  <span className="text-red-500">(Required)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <FormField
                    control={form.control}
                    name="caseName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Case Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter case name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="courtName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Court Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Orange County Superior Court"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="courtCaseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Court Case Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter court case number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="judgmentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Judgment Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0000"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? null
                                  : parseFloat(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interest Rate (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0000"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? null
                                  : parseFloat(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="judgmentDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Judgment Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">
                  Debtor Contact Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="debtorFirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firm Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter firm name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="debtorStreet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter street address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="debtorCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="debtorState"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="debtorZip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter zip code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="debtorPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="debtorEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center text-lg">Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Judgment Amount:</span>
                      <span>
                        {formatCurrency(calculationResults.judgmentAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Principal Reduction:</span>
                      <span>
                        {formatCurrency(calculationResults.principalReduction)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Principal Balance:</span>
                      <span>
                        {formatCurrency(calculationResults.principalBalance)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Costs After Judgment:</span>
                      <span>
                        {formatCurrency(calculationResults.costsAfterJudgment)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Daily Interest:</span>
                      <span>
                        {formatCurrency(calculationResults.dailyInterest)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Interest Accrued:</span>
                      <span>
                        {formatCurrency(calculationResults.interestAccrued)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Interest to Date:</span>
                      <span>
                        {formatCurrency(calculationResults.interestToDate)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Total Interest:</span>
                      <span>
                        {formatCurrency(calculationResults.totalInterest)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Days:</span>
                      <span>{calculationResults.days}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>GRAND TOTAL:</span>
                      <span className="text-primary">
                        {formatCurrency(calculationResults.grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-2 pt-4">
              <Button
                type="submit"
                className="flex-1 hover:bg-primary/80"
                disabled={isLoading}
              >
                {isLoading ? "Adding Case..." : "Add Case"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCaseModal;
