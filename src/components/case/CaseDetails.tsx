import { Plus, Trash2, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency, formatDate } from "@/lib/calculations";
import { CaseData } from "@/types/case";

interface CaseDetailsProps {
  case: CaseData;
  onAddTransaction: () => void;
  onDeleteCase: (caseId: string) => void;
}

export function CaseDetails({
  case: caseData,
  onAddTransaction,
  onDeleteCase,
}: CaseDetailsProps) {
  return (
    <Card className="h-full dark:bg-white/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">Case Details</CardTitle>
        <div className="flex space-x-2">
          <Button
            onClick={onAddTransaction}
            className="bg-primary text-white hover:bg-primary/80"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Cost/Payment
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="h-[320px] md:h-[300px] md:space-y-5">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-destructive">
                  Delete Case
                </DialogTitle>
                <DialogDescription>
                  <div className="flex w-full flex-col items-center justify-center gap-2.5">
                    <TriangleAlert className="size-16 text-red-500" />
                    <span className="text-center text-muted-foreground">
                      Are you sure you want to delete{" "}
                      <span className="font-semibold text-destructive">
                        "{caseData.caseName}"
                      </span>
                      ? This action cannot be undone and will remove all
                      associated transactions.
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button
                  variant="destructive"
                  onClick={() => onDeleteCase(caseData.id)}
                >
                  Delete Case
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="mb-6 py-5 text-center">
          <h2 className="mb-2 text-2xl font-bold text-primary">
            {caseData.caseName}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-4">
            <div className="flex justify-between border-b border-muted-foreground/20 pb-1">
              <span className="text-muted-foreground">
                LA Superior Court Case No.
              </span>
              <span className="font-medium">{caseData.courtCaseNumber}</span>
            </div>

            <div className="flex justify-between border-b border-muted-foreground/20 pb-1">
              <span className="text-muted-foreground">Judgment Amount</span>
              <span className="font-medium">
                {formatCurrency(caseData.judgmentAmount)}
              </span>
            </div>

            <div className="flex justify-between border-b border-muted-foreground/20 pb-1">
              <span className="text-muted-foreground">Judgment Date</span>
              <span className="font-medium">
                {formatDate(caseData.judgmentDate)}
              </span>
            </div>

            <div className="flex justify-between border-b border-muted-foreground/20 pb-1">
              <span className="text-muted-foreground">Last Payment Date</span>
              <span className="font-medium">
                {formatDate(caseData.lastPaymentDate)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-muted-foreground/20 pb-1">
              <span className="text-muted-foreground">
                Total Payments to Date
              </span>
              <span className="font-medium">
                {formatCurrency(caseData.totalPayments)}
              </span>
            </div>

            <div className="flex justify-between border-b border-muted-foreground/20 pb-1">
              <span className="text-muted-foreground">Accrued Interest</span>
              <span className="font-medium">
                {formatCurrency(caseData.accruedInterest)}
              </span>
            </div>

            <div className="flex justify-between pt-10 text-lg font-bold">
              <span className="text-muted-foreground">Today's Payoff</span>
              <span className="text-primary">
                {formatCurrency(caseData.payoffAmount)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
