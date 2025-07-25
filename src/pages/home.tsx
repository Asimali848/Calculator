import { useState } from "react";

import { Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";

import AddCaseModal from "@/components/case/AddCaseModal";
import CaseDetails from "@/components/case/CaseDetails";
import CaseList from "@/components/case/CaseList";
import { EmptyState } from "@/components/case/EmptyState";
import { TransactionForm } from "@/components/transaction/TransactionForm";
import TransactionsTable from "@/components/transaction/TransactionsTable";
import { mockTransactions } from "@/data/mockData";
import { useGetCaseByIdQuery, useGetCaseQuery } from "@/store/services/case";

const Home = () => {
  const token = localStorage.getItem("access") || "";
  const { data: casesData = [], isLoading, error } = useGetCaseQuery(token);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const { data: selectedCase } = useGetCaseByIdQuery(
    { token, id: selectedCaseId ?? "" },
    { skip: !selectedCaseId }
  );

  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [isAddCaseModalOpen, setIsAddCaseModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<
    Transaction | undefined
  >();

  const caseTransactions = transactions.filter(
    (t) => t.caseId === selectedCaseId
  );

  const handleCaseSelect = (caseId: string) => {
    setSelectedCaseId(caseId);
  };

  const handleAddNewCase = () => {
    setIsAddCaseModalOpen(true);
  };

  const handleDeleteCase = (caseId: string) => {
    toast.success("Case deleted (UI only)", {
      className: "bg-primary text-white p-3",
    });

    if (selectedCaseId === caseId) {
      setSelectedCaseId(null);
    }
  };

  const handleAddCaseSubmit = (newCase: CaseData) => {
    toast.success("Case added successfully", {
      className: "bg-primary p-3 text-white",
    });
    setSelectedCaseId(newCase.id);
  };

  const handleAddTransaction = () => {
    setEditingTransaction(undefined);
    setIsTransactionFormOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsTransactionFormOpen(true);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
    toast.success("Transaction deleted successfully", {
      className: "bg-primary p-3 text-white",
    });
  };

  const handleTransactionSubmit = (data: TransactionFormData) => {
    if (!selectedCaseId) return;

    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? {
                ...t,
                ...data,
                accruedInterest: data.calculatedInterest,
                principalBalance: data.newBalance,
              }
            : t
        )
      );
      toast.success("Transaction updated", {
        className: "bg-primary text-white p-3",
      });
    } else {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        caseId: selectedCaseId,
        ...data,
        accruedInterest: data.calculatedInterest,
        principalBalance: data.newBalance,
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      toast.success("Transaction added", {
        className: "bg-primary text-white p-3",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading cases...</p>
        </div>
      </div>
    );
  }

  if (error || !casesData || casesData.length === 0) {
    return (
      <div className="mx-auto h-screen w-full overflow-auto bg-background p-4 md:p-10">
        <div className="mx-auto max-w-7xl">
          <EmptyState onAddNewCase={handleAddNewCase} />
          <AddCaseModal
            open={isAddCaseModalOpen}
            onOpenChange={setIsAddCaseModalOpen}
            //@ts-ignore
            onSubmit={handleAddCaseSubmit}
          />
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="mx-auto h-screen w-full overflow-auto bg-background p-4">
      <div className="mx-auto max-w-screen-xl space-y-6">
        <div className="z-10 mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CaseList
            cases={casesData}
            isLoading={isLoading}
            error={error}
            //@ts-ignore
            selectedCaseId={selectedCaseId}
            //@ts-ignore
            onCaseSelect={handleCaseSelect}
            onAddNewCase={handleAddNewCase}
            //@ts-ignore
            onDeleteCase={handleDeleteCase}
          />

          <CaseDetails
            //@ts-ignore
            case={selectedCase}
            onAddTransaction={handleAddTransaction}
            onDeleteCase={handleDeleteCase}
          />
        </div>

        <TransactionsTable
          //@ts-ignore
          transactions={selectedCase ? caseTransactions : []}
          caseName={selectedCase?.caseName ?? "No Case Selected"}
          //@ts-ignore
          onEditTransaction={handleEditTransaction}
          onDeleteTransaction={handleDeleteTransaction}
        />

        <TransactionForm
          open={isTransactionFormOpen}
          onOpenChange={setIsTransactionFormOpen}
          //@ts-ignore
          onSubmit={handleTransactionSubmit}
          //@ts-ignore
          caseData={selectedCase ?? ({} as CaseData)}
          //@ts-ignore
          editTransaction={editingTransaction}
        />

        <AddCaseModal
          open={isAddCaseModalOpen}
          //@ts-ignore
          onOpenChange={setIsAddCaseModalOpen}
          //@ts-ignore
          onSubmit={handleAddCaseSubmit}
        />
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
