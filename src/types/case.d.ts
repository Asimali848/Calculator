declare type CaseData = {
  id: string;
  caseName: string;
  courtName: string;
  courtCaseNumber: string;
  judgmentAmount: number;
  judgmentDate: string;
  lastPaymentDate: string;
  totalPayments: number;
  accruedInterest: number;
  principalBalance: number;
  payoffAmount: number;
  isEnded?: boolean;
};

declare type Transaction = {
  id: string;
  caseId: string;
  date: string;
  type: "PAYMENT" | "COST" | "INTEREST";
  amount: number;
  accruedInterest: number;
  principalBalance: number;
  description?: string;
};

declare type TransactionFormData = {
  type: "PAYMENT" | "COST" | "INTEREST";
  amount: number;
  date: string;
  description?: string;
  interestRate: number;
  calculatedInterest: number;
  newBalance: number;
};
