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
  debtorInfo?: string;
  interestRate: number;
};

declare type Transaction = {
  id: string;
  caseId: string;
  date: string;
  type: "PAYMENT" | "COST";
  amount: number;
  accruedInterest: number;
  principalBalance: number;
  description?: string;
};

declare type TransactionFormData = {
  type: "PAYMENT" | "COST";
  amount: number;
  date: string;
  description?: string;
  interestRate: number;
  calculatedInterest: number;
  newBalance: number;
};
