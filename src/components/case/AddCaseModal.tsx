import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { CaseData } from "@/types/case";

const caseSchema = z.object({
  caseName: z.string().min(1, "Case name is required"),
  courtCaseNumber: z.string().min(1, "Court case number is required"),
  judgmentAmount: z
    .number()
    .min(0.01, "Judgment amount must be greater than 0"),
  interestRate: z.number().min(0, "Interest rate must be positive"),
  judgmentDate: z.string().min(1, "Judgment date is required"),
  endDate: z.string().optional(),
  paymentAmount: z.number().optional(),
  cost: z.number().optional(),
});

interface AddCaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CaseData) => void;
}

export function AddCaseModal({
  open,
  onOpenChange,
  onSubmit,
}: AddCaseModalProps) {
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
      courtCaseNumber: "",
      judgmentAmount: 0,
      interestRate: 10,
      judgmentDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      paymentAmount: 0,
      cost: 0,
    },
  });

  const watchedValues = form.watch();

  // Calculate results when form values change
  React.useEffect(() => {
    const judgmentAmount = watchedValues.judgmentAmount || 0;
    const interestRate = watchedValues.interestRate || 10;
    const paymentAmount = watchedValues.paymentAmount || 0;
    const cost = watchedValues.cost || 0;
    const judgmentDate = new Date(watchedValues.judgmentDate || new Date());
    const endDate = new Date(watchedValues.endDate || new Date());

    const days = Math.max(
      0,
      Math.floor(
        (endDate.getTime() - judgmentDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );
    const dailyInterest = (judgmentAmount * (interestRate / 100)) / 365;
    const interestAccrued = dailyInterest * days;
    const principalReduction = paymentAmount;
    const principalBalance = judgmentAmount - principalReduction + cost;
    const interestToDate = interestAccrued;
    const totalInterest = interestToDate;
    const grandTotal = principalBalance + totalInterest;

    setCalculationResults({
      judgmentAmount,
      principalReduction,
      principalBalance,
      costsAfterJudgment: cost,
      dailyInterest,
      interestAccrued,
      interestToDate,
      totalInterest,
      days,
      grandTotal,
    });
  }, [watchedValues]);

  const handleSubmit = (data: z.infer<typeof caseSchema>) => {
    const newCase: CaseData = {
      id: Date.now().toString(),
      caseName: data.caseName,
      courtCaseNumber: data.courtCaseNumber,
      judgmentAmount: data.judgmentAmount,
      judgmentDate: data.judgmentDate,
      lastPaymentDate: data.endDate || new Date().toISOString().split("T")[0],
      totalPayments: data.paymentAmount || 0,
      accruedInterest: calculationResults.totalInterest,
      principalBalance: calculationResults.principalBalance,
      payoffAmount: calculationResults.grandTotal,
    };

    onSubmit(newCase);
    form.reset();
    onOpenChange(false);
  };

  const handleCalculate = () => {
    // Trigger recalculation by updating the form
    form.trigger();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleStartOver = () => {
    form.reset();
    setCalculationResults({
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
  };

  const handleExit = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">New Case</DialogTitle>
          <DialogDescription>
            Enter judgment information and payment details to create a new case
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Judgment Information Section */}
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
                            type="input"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
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
                            type="input"
                            step="0.01"
                            placeholder="10.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
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

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
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

            {/* Payment and/or Cost Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">
                  Payment and/or Cost{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="paymentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="input"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cost</FormLabel>
                        <FormControl>
                          <Input
                            type="input"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-end">
                    <Button
                      type="button"
                      onClick={handleCalculate}
                      className="w-full hover:bg-primary/80"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button type="button" onClick={handleCalculate} variant="outline">
                Calculate
              </Button>
              <Button type="button" onClick={handlePrint} variant="outline">
                Print
              </Button>
              <Button type="button" onClick={handleStartOver} variant="outline">
                Start Over
              </Button>
              <Button type="button" onClick={handleExit} variant="outline">
                Exit
              </Button>
            </div>

            {/* Results Section */}
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
              <Button type="submit" className="flex-1 hover:bg-primary/80">
                Add Case
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
}
