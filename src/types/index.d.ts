declare type StripePaySession = {
  id: string;
};

declare type GlobalStateProps = {
  uploaded: Product[] | null;
  selectedProducts: number[];
  service: string;
  selectedCase: CaseData | null;
  editTransactionId: string | null;
};

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
  createdAt: string;
};

// declare type CaseData = {
//   id: string;
//   caseName: string;
//   courtName: string;
//   courtCaseNumber: string;
//   judgmentAmount: number;
//   judgmentDate: string;
//   lastPaymentDate: string;
//   totalPayments: number;
//   accruedInterest: number;
//   principalBalance: number;
//   payoffAmount: number;
//   isEnded?: boolean;
//   debtorInfo?: string;
//   interestRate: number;
//   caseId: number;
// };

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

declare type UserProfile = {
  status_code: number;
  message: string;
  profile: {
    full_name: string;
    email: string;
    company: string;
    location: string;
    phone_number: string;
    website: string;
    subscription_plan: string;
    member_since: string;
  };
};

declare type AddCase = {
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
  interestRate: number;
  isEnded: boolean;
  debtorInfo: string;
};

declare type EditCase = {
  caseName: string;
  courtName: string;
  courtCaseNumber: string;
  judgmentAmount: number;
  judgmentDate: string;
}
