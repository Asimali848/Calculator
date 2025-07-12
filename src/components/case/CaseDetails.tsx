import { useState } from "react";

import {
  Calendar,
  Download,
  MoreVertical,
  Plus,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, formatDate } from "@/lib/calculations";

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
  const [isEndCaseDialogOpen, setIsEndCaseDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [payoffDate, setPayoffDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isCaseEnded, setIsCaseEnded] = useState(!!caseData.isEnded);

  const handleDownloadPayoffLetter = () => {
    const content = `
PAYOFF STATEMENT

Case Name: ${caseData.caseName}
Court Case Number: ${caseData.courtCaseNumber}
Judgment Date: ${formatDate(caseData.judgmentDate)}
Judgment Amount: ${formatCurrency(caseData.judgmentAmount)}

Principal Balance: ${formatCurrency(caseData.principalBalance)}
Accrued Interest: ${formatCurrency(caseData.accruedInterest)}
Total Payoff Amount: ${formatCurrency(caseData.payoffAmount)}

Payoff Date: ${formatDate(payoffDate)}
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${caseData.caseName}_payoff_statement.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEndCase = () => {
    toast.success(
      `Case "${caseData.caseName}" has been marked as ended with payoff date: ${formatDate(payoffDate)}`,
      { className: "bg-primary text-white p-3" }
    );
    setIsCaseEnded(true);
    setIsEndCaseDialogOpen(false);
  };

  return (
    <Card className="h-full dark:bg-white/10">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
        <CardTitle className="text-xl font-bold">Case Details</CardTitle>

        {/* Desktop Actions */}
        <div className="hidden gap-2 sm:flex">
          <EndCaseDialog
            open={isEndCaseDialogOpen}
            onOpenChange={setIsEndCaseDialogOpen}
            disabled={isCaseEnded}
            payoffDate={payoffDate}
            setPayoffDate={setPayoffDate}
            caseData={caseData}
            onEndCase={handleEndCase}
            onDownload={handleDownloadPayoffLetter}
          />

          <Button
            onClick={onAddTransaction}
            size="sm"
            disabled={isCaseEnded}
            className="bg-primary text-white hover:bg-primary/80"
          >
            <Plus className="mr-2 h-4 w-4" />
            {isCaseEnded ? "Case Ended" : "New Cost/Payment"}
          </Button>

          <DeleteCaseDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            caseData={caseData}
            onDelete={onDeleteCase}
          />
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-fit">
              <DropdownMenuItem
                onSelect={onAddTransaction}
                disabled={isCaseEnded}
              >
                <Plus className="mr-2 h-4 w-4" />
                {isCaseEnded ? "Case Ended" : "New Cost/Payment"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setIsEndCaseDialogOpen(true)}
                disabled={isCaseEnded}
              >
                <Calendar className="mr-2 h-4 w-4" />
                End Case
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setIsDeleteDialogOpen(true)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Case
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="my-6 text-center">
          <h2 className="text-2xl font-bold text-primary">
            {caseData.caseName}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-4">
            <CaseDetail
              label="Court Case No."
              value={caseData.courtCaseNumber}
            />
            <CaseDetail
              label="Judgment Amount"
              value={formatCurrency(caseData.judgmentAmount)}
            />
            <CaseDetail
              label="Judgment Date"
              value={formatDate(caseData.judgmentDate)}
            />
            <CaseDetail
              label="Last Payment Date"
              value={formatDate(caseData.lastPaymentDate)}
            />
          </div>

          <div className="space-y-4">
            <CaseDetail
              label="Total Payments to Date"
              value={formatCurrency(caseData.totalPayments)}
            />
            <CaseDetail
              label="Accrued Interest"
              value={formatCurrency(caseData.accruedInterest)}
            />
            <CaseDetail
              label="Today's Payoff"
              value={formatCurrency(caseData.payoffAmount)}
              bold
              primary
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Reusable component for the End Case Dialog
function EndCaseDialog({
  open,
  onOpenChange,
  disabled,
  payoffDate,
  setPayoffDate,
  caseData,
  onDownload,
}: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          title={disabled ? "This case is already ended" : ""}
          className="bg-primary text-white hover:bg-primary/80 hover:text-white"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Payoff Demand
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payoff Demand - {caseData.caseName}</DialogTitle>
          <DialogDescription>
            Enter the payoff date to generate the payoff statement.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2.5">
            <Label htmlFor="payoff-date">Payoff Date</Label>
            <Input
              id="payoff-date"
              type="date"
              value={payoffDate}
              onChange={(e) => setPayoffDate(e.target.value)}
              className="w-44 dark:bg-white/20"
            />
          </div>

          <div className="space-y-2 rounded-lg bg-muted p-4 text-sm">
            <h4 className="font-semibold">Payoff Summary</h4>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-muted-foreground">Principal Balance:</span>
              <span>{formatCurrency(caseData.principalBalance)}</span>
              <span className="text-muted-foreground">Accrued Interest:</span>
              <span>{formatCurrency(caseData.accruedInterest)}</span>
              <span className="font-semibold text-muted-foreground">
                Total Payoff:
              </span>
              <span className="font-bold text-primary">
                {formatCurrency(caseData.payoffAmount)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={onDownload} variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Statement
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Reusable component for the Delete Case Dialog
function DeleteCaseDialog({ open, onOpenChange, caseData, onDelete }: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Case</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center gap-2.5 text-center">
              <TriangleAlert className="size-16 text-red-500" />
              <span className="text-muted-foreground">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-destructive">
                  "{caseData.caseName}"
                </span>
                ? This action cannot be undone and will remove all associated
                transactions.
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-end gap-2 pt-4 md:flex-row">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => onDelete(caseData.id)}
            >
              Delete Case
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CaseDetail({
  label,
  value,
  bold = false,
  primary = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
  primary?: boolean;
}) {
  return (
    <div className="flex justify-between border-b border-muted-foreground/20 pb-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`${bold ? "font-bold" : "font-medium"} ${
          primary ? "text-primary" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
