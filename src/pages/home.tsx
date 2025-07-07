import { useState } from "react";

import { Toaster, toast } from "sonner";

import { AddCaseModal } from "@/components/case/AddCaseModal";
import { CaseDetails } from "@/components/case/CaseDetails";
import { CaseList } from "@/components/case/CaseList";
import { EmptyState } from "@/components/case/EmptyState";
import Navbar from "@/components/navbar";
import { TransactionForm } from "@/components/transaction/TransactionForm";
import { TransactionsTable } from "@/components/transaction/TransactionsTable";
import { mockCases, mockTransactions } from "@/data/mockData";
import { CaseData, Transaction, TransactionFormData } from "@/types/case";

const Home = () => {
  const [cases, setCases] = useState<CaseData[]>(mockCases);
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>("1");
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [isAddCaseModalOpen, setIsAddCaseModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<
    Transaction | undefined
  >();

  const selectedCase = cases.find((c) => c.id === selectedCaseId);
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
    setCases((prev) => prev.filter((c) => c.id !== caseId));
    setTransactions((prev) => prev.filter((t) => t.caseId !== caseId));

    if (selectedCaseId === caseId) {
      const remainingCases = cases.filter((c) => c.id !== caseId);
      setSelectedCaseId(
        remainingCases.length > 0 ? remainingCases[0].id : null
      );
    }

    toast.success("Case deleted successfully!", {
      className: "bg-primary p-3 text-white",
    });
  };

  const handleAddCaseSubmit = (newCase: CaseData) => {
    setCases((prev) => [newCase, ...prev]);
    setSelectedCaseId(newCase.id);
    toast.success("Case added successfully", {
      className: "bg-primary p-3 text-white",
    });
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
    if (editingTransaction) {
      // Update existing transaction
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? {
                ...t,
                type: data.type,
                amount: data.amount,
                date: data.date,
                description: data.description,
                accruedInterest: data.calculatedInterest,
                principalBalance: data.newBalance,
              }
            : t
        )
      );
      toast.success("Transaction updated successfully", {
        className: "bg-primary text-white p-3",
      });
    } else {
      // Add new transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        caseId: selectedCaseId!,
        type: data.type,
        amount: data.amount,
        date: data.date,
        description: data.description,
        accruedInterest: data.calculatedInterest,
        principalBalance: data.newBalance,
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      toast.success("Transaction added successfully", {
        className: "bg-primary text-white p-3",
      });
    }

    // Update case data with new calculations
    if (selectedCase) {
      setCases((prev) =>
        prev.map((c) =>
          c.id === selectedCaseId
            ? {
                ...c,
                principalBalance: data.newBalance,
                accruedInterest: data.calculatedInterest,
                payoffAmount: data.newBalance + data.calculatedInterest,
                lastPaymentDate:
                  data.type === "PAYMENT" ? data.date : c.lastPaymentDate,
                totalPayments:
                  data.type === "PAYMENT"
                    ? c.totalPayments + data.amount
                    : c.totalPayments,
              }
            : c
        )
      );
    }
  };

  // Show empty state when no cases exist
  if (cases.length === 0) {
    return (
      <div className="mx-auto h-screen w-full overflow-auto bg-background p-4 md:p-10">
        <div className="mx-auto max-w-7xl">
          <Navbar />

          <EmptyState onAddNewCase={handleAddNewCase} />

          <AddCaseModal
            open={isAddCaseModalOpen}
            onOpenChange={setIsAddCaseModalOpen}
            onSubmit={handleAddCaseSubmit}
          />
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="mx-auto h-screen w-full overflow-auto bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <Navbar />
        <div className="z-10 mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CaseList
            cases={cases}
            selectedCaseId={selectedCaseId}
            onCaseSelect={handleCaseSelect}
            onAddNewCase={handleAddNewCase}
            onDeleteCase={handleDeleteCase}
          />

          {selectedCase && (
            <CaseDetails
              case={selectedCase}
              onAddTransaction={handleAddTransaction}
              onDeleteCase={handleDeleteCase}
            />
          )}
        </div>

        {selectedCase && (
          <TransactionsTable
            transactions={caseTransactions}
            caseName={selectedCase.caseName}
            onEditTransaction={handleEditTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        )}

        {selectedCase && (
          <TransactionForm
            open={isTransactionFormOpen}
            onOpenChange={setIsTransactionFormOpen}
            onSubmit={handleTransactionSubmit}
            caseData={selectedCase}
            editTransaction={editingTransaction}
          />
        )}

        <AddCaseModal
          open={isAddCaseModalOpen}
          onOpenChange={setIsAddCaseModalOpen}
          onSubmit={handleAddCaseSubmit}
        />
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
