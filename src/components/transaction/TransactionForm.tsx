import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
  usePostTransactionMutation,
  usePutTransactionMutation,
} from "@/store/services/transaction";

const transactionSchema = z.object({
  type: z.enum(["PAYMENT", "COST"], {
    required_error: "Transaction type is required",
  }),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  date: z.string().min(1, "Date is required"),
  description: z.string().optional(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: {
    id: string;
    caseName: string;
    courtCaseNumber: string;
  };
  editTransaction?: {
    id: string;
    caseId: string;
    type: "PAYMENT" | "COST";
    amount: number;
    date: string;
    description?: string;
  };
  keepOpenAfterSubmit?: boolean;
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
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: editTransaction?.type || "PAYMENT",
      amount: editTransaction?.amount || 0,
      date: editTransaction?.date || new Date().toISOString().split("T")[0],
      description: editTransaction?.description || "",
    },
  });

  const handleSubmit = async (data: TransactionFormData) => {
    const token = localStorage.getItem("access");
    if (!token) {
      form.setError("root", {
        message: "Authentication token not found. Please log in.",
      });
      return;
    }

    const payload = {
      case_id: caseData.id as string,
      transaction_type: data.type,
      amount: data.amount.toFixed(2),
      date: data.date,
      description: data.description || "",
    };

    try {
      if (editTransaction?.id) {
        await putTransaction({
          id: editTransaction.id.toString(),
          token,
          data: {
            ...payload,
            amount: +payload.amount,
          },
        });
      } else {
        await postTransaction({
          token,
          data: {
            ...payload,
            amount: +payload.amount,
          },
        });
      }

      toast.success(
        `Transaction ${editTransaction ? "updated" : "created"} successfully.`,
        { className: "bg-primary p-3 text-white" }
      );
      form.reset();
      if (!keepOpenAfterSubmit) onOpenChange(false);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        "Failed to submit transaction. Please try again.";
      form.setError("root", { message: errorMessage });
      toast.error(errorMessage, { className: "bg-destructive text-white p-3" });
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
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0000"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
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

                <div className="flex flex-col gap-2.5 pt-16 md:flex-row">
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
