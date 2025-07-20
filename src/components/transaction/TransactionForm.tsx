import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import {
  usePostTransactionMutation,
  usePutTransactionMutation,
} from "@/store/services/transaction";

// Frontend schema
const transactionSchema = z.object({
  type: z.enum(["PAYMENT", "COST"]),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  date: z.string().min(1, "Date is required"),
  description: z.string().optional(),
  interestRate: z.number().min(0, "Interest rate must be positive"),
});

// Type for frontend form data
type TransactionFormData = {
  type: "PAYMENT" | "COST";
  amount: number;
  date: string;
  description?: string;
  interestRate: number;
  calculatedInterest: number;
  newBalance: number;
};

// Type for backend payload
type TransactionPayload = {
  case_id: number; // or number, depending on backend
  transaction_type: string;
  amount: string;
  date: string;
  description: string;
  new_balance: string;
};

interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: CaseData;
  editTransaction?: Transaction | null;
  keepOpenAfterSubmit?: boolean;
}

interface CaseData {
  id: string; // or number
  caseName: string;
  courtCaseNumber: string;
  principalBalance: number;
}

interface Transaction {
  id: string;
  caseId: string;
  type: "PAYMENT" | "COST";
  amount: number;
  date: string;
  description?: string;
}

export function TransactionForm({
  open,
  onOpenChange,
  caseData,
  editTransaction,
  keepOpenAfterSubmit = false,
}: TransactionFormProps) {
  const [postTransaction, { isLoading: isPosting }] =
    usePostTransactionMutation();
  const [putTransaction, { isLoading: isPutting }] =
    usePutTransactionMutation();
  const isLoading = isPosting || isPutting;

  const form = useForm<TransactionFormData>({
    //@ts-ignore
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: editTransaction?.type || "PAYMENT",
      amount: editTransaction?.amount || 0,
      date: editTransaction?.date || new Date().toISOString().split("T")[0],
      description: editTransaction?.description || "",
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
    } else {
      form.reset({
        type: "PAYMENT",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        description: "",
        interestRate: 10,
      });
    }
  }, [editTransaction, form]);

  const calculatedInterest = calculateInterest(
    caseData.principalBalance,
    watchedValues.interestRate || 10,
    30
  );

  const newBalance = calculateNewBalance(
    caseData.principalBalance,
    watchedValues.amount || 0,
    calculatedInterest,
    watchedValues.type || "PAYMENT"
  );

  const handleSubmit = async (data: TransactionFormData) => {
    const token = localStorage.getItem("access");
    if (!token) {
      form.setError("root", {
        message: "Authentication token not found. Please log in.",
      });
      return;
    }

    const payload: TransactionPayload = {
      case_id: Number(caseData.id),
      transaction_type: data.type,
      amount: data.amount.toFixed(2),
      date: data.date,
      description: data.description || "",
      new_balance: newBalance.toFixed(2),
    };

    try {
      if (editTransaction && editTransaction.id) {
        await putTransaction({
          id: Number(editTransaction.id),
          token,
          data: {
            case_id: Number(caseData.id),
            amount: Number(payload.amount),
            date: payload.date,
            description: payload.description,
            new_balance: Number(payload.new_balance),
            transaction_type: payload.transaction_type,
          },
        });
        toast.success(
          `Transaction updated successfully. New Balance: ${formatCurrency(newBalance)}`
        );
      } else {
        await postTransaction({
          token,
          data: {
            case_id: Number(caseData.id),
            amount: Number(payload.amount),
            date: payload.date,
            description: payload.description,
            new_balance: Number(payload.new_balance),
            transaction_type: payload.transaction_type,
          },
        });
        toast.success(
          `Transaction created successfully. New Balance: ${formatCurrency(newBalance)}`
        );
      }
      form.reset();
      if (!keepOpenAfterSubmit) {
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error("Failed to submit transaction:", error);
      const errorMessage =
        error?.data?.message ||
        "Failed to submit transaction. Please try again.";
      form.setError("root", { message: errorMessage });
      toast.error(errorMessage);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="h-full w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">
            {editTransaction ? "Edit Transaction" : "Add New Transaction"}
          </SheetTitle>
          <SheetDescription>
            {caseData.caseName} - {caseData.courtCaseNumber} (Case ID:{" "}
            {caseData.id})
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-1">
          <div className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                {form.formState.errors.root && (
                  <div className="text-sm text-red-500">
                    {form.formState.errors.root.message}
                  </div>
                )}

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
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {editTransaction
                      ? isLoading
                        ? "Updating..."
                        : "Update Transaction"
                      : isLoading
                        ? "Submitting..."
                        : "Add Transaction"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
