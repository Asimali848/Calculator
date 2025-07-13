import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  calculateInterest,
  calculateNewBalance,
  formatCurrency,
} from "@/lib/calculations";

const transactionSchema = z.object({
  type: z.enum(["PAYMENT", "COST", "INTEREST"]),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  date: z.string().min(1, "Date is required"),
  description: z.string().optional(),
  interestRate: z.number().min(0, "Interest rate must be positive"),
});

interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TransactionFormData) => void;
  caseData: CaseData;
  editTransaction?: Transaction;
}

export function TransactionForm({
  open,
  onOpenChange,
  onSubmit,
  caseData,
  editTransaction,
}: TransactionFormProps) {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema as any),
    defaultValues: {
      type: "PAYMENT",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      description: "",
      interestRate: 10,
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    if (editTransaction) {
      form.reset({
        type: editTransaction.type,
        amount: editTransaction.amount,
        date: editTransaction.date,
        description: editTransaction.description || "",
        interestRate: 10,
      });
    }
  }, [editTransaction, form]);

  // Real-time calculations
  const calculatedInterest = calculateInterest(
    caseData.principalBalance,
    watchedValues.interestRate || 10,
    30 // Assuming 30 days for calculation
  );

  const newBalance = calculateNewBalance(
    caseData.principalBalance,
    watchedValues.amount || 0,
    calculatedInterest,
    watchedValues.type || "PAYMENT"
  );

  const handleSubmit = (data: TransactionFormData) => {
    const formData = {
      ...data,
      calculatedInterest,
      newBalance,
    };
    onSubmit(formData);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="h-full w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">
            {editTransaction ? "Edit Transaction" : "Add New Transaction"}
          </SheetTitle>
          <SheetDescription>
            {caseData.caseName} - {caseData.courtCaseNumber}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-1">
          <div className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transaction type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PAYMENT">Payment</SelectItem>
                          <SelectItem value="COST">Cost</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <div className="flex space-x-2">
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* {!editTransaction && (
                  <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interest Rate (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
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
                )} */}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter description..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Calculations Display */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Calculations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Current Balance:</span>
                      <span>{formatCurrency(caseData.principalBalance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Calculated Interest:</span>
                      <span>{formatCurrency(calculatedInterest)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>New Balance:</span>
                      <span>{formatCurrency(newBalance)}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col space-y-2 pt-5 sm:space-x-2 sm:space-y-0 md:flex-row">
                  <Button type="submit" className="flex-1">
                    {editTransaction ? "Update Transaction" : "Add Transaction"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Calculator */}
          {/* <div className="xl:block">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex min-h-[60px] items-center justify-end rounded bg-muted p-4 text-right font-mono text-xl">
                    {calculatorDisplay}
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <Button
                      variant="outline"
                      onClick={handleCalculatorClear}
                      className="col-span-2 text-sm"
                    >
                      Clear
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleCalculatorOperation("/")}
                      className="text-sm"
                    >
                      ÷
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleCalculatorOperation("*")}
                      className="text-sm"
                    >
                      ×
                    </Button>

                    {[7, 8, 9].map((num) => (
                      <Button
                        key={num}
                        variant="outline"
                        onClick={() => handleCalculatorNumber(num.toString())}
                        className="text-sm"
                      >
                        {num}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => handleCalculatorOperation("-")}
                      className="text-sm"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    {[4, 5, 6].map((num) => (
                      <Button
                        key={num}
                        variant="outline"
                        onClick={() => handleCalculatorNumber(num.toString())}
                        className="text-sm"
                      >
                        {num}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => handleCalculatorOperation("+")}
                      className="row-span-2 text-sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>

                    {[1, 2, 3].map((num) => (
                      <Button
                        key={num}
                        variant="outline"
                        onClick={() => handleCalculatorNumber(num.toString())}
                        className="text-sm"
                      >
                        {num}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      onClick={() => handleCalculatorNumber("0")}
                      className="col-span-2 text-sm"
                    >
                      0
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleCalculatorNumber(".")}
                      className="text-sm"
                    >
                      .
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCalculatorEquals}
                      className="text-sm"
                    >
                      <Equal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
