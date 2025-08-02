// export function calculateInterest(
//   principal: number,
//   rate: number,
//   days: number
// ): number {
//   return (principal * (rate / 100) * days) / 365;
// }

// export function calculateNewBalance(
//   currentBalance: number,
//   paymentAmount: number,
//   accruedInterest: number,
//   transactionType: "PAYMENT" | "COST" | "INTEREST"
// ): number {
//   switch (transactionType) {
//     case "PAYMENT":
//       return Math.max(0, currentBalance + accruedInterest - paymentAmount);
//     case "COST":
//       return currentBalance + paymentAmount;
//     case "INTEREST":
//       return currentBalance + paymentAmount;
//     default:
//       return currentBalance;
//   }
// }

// export default function calculatePayoffAmount(
//   principalBalance: number,
//   accruedInterest: number
// ): number {
//   return principalBalance + accruedInterest;
// }

// export function formatCurrency(amount: number): string {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 4,
//   }).format(amount);
// }

// export function formatDate(date: string): string {
//   return new Date(date).toLocaleDateString("en-US");
// }

// type Transaction = {
//   date: string; // format: YYYY-MM-DD
//   type: "payment" | "cost";
//   amount: number;
// };

// type DailyEntry = {
//   date: string;
//   balance: number;
//   interest: number;
// };

// export function truncateToFourDecimals(num: number): number {
//   return Math.floor(num * 10000) / 10000;
// }

// export function calculateJudgmentInterest(params: {
//   judgment_date: string;
//   end_date: string;
//   judgment_amount: number;
//   annual_interest_rate: number;
//   transactions: Transaction[];
// }) {
//   const {
//     judgment_date,
//     end_date,
//     judgment_amount,
//     annual_interest_rate,
//     transactions,
//   } = params;

//   const sortedTransactions = [...transactions].sort(
//     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//   );

//   const dailyData: DailyEntry[] = [];

//   let currentPrincipal = judgment_amount;
//   let totalAccruedInterest = 0;
//   let unpaidInterest = 0;

//   const start = new Date(judgment_date);
//   const end = new Date(end_date);

//   // for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//   for (
//     let d = new Date(start);
//     d.getTime() <= end.getTime();
//     d.setDate(d.getDate() + 1)
//   ) {
//     const currentDateStr = d.toISOString().split("T")[0];

//     // Accrue daily interest
//     const dailyInterest = truncateToFourDecimals(
//       (currentPrincipal * annual_interest_rate) / (100 * 365)
//     );
//     unpaidInterest += dailyInterest;
//     totalAccruedInterest += dailyInterest;

//     // Apply transactions
//     while (
//       sortedTransactions.length > 0 &&
//       sortedTransactions[0].date === currentDateStr
//     ) {
//       const txn = sortedTransactions.shift()!;
//       if (txn.type === "payment") {
//         let payment = txn.amount;

//         // Pay interest first
//         const interestPaid = Math.min(payment, unpaidInterest);
//         unpaidInterest -= interestPaid;
//         payment -= interestPaid;

//         // Then pay principal
//         const principalPaid = Math.min(payment, currentPrincipal);
//         currentPrincipal -= principalPaid;
//         payment -= principalPaid;

//         // Any excess is ignored
//       } else if (txn.type === "cost") {
//         currentPrincipal += txn.amount;
//       }
//     }

//     dailyData.push({
//       date: currentDateStr,
//       balance: currentPrincipal,
//       interest: unpaidInterest,
//     });
//   }

//   return {
//     dailyBreakdown: dailyData,
//     totalAccruedInterest: truncateToFourDecimals(totalAccruedInterest),
//     finalBalance: truncateToFourDecimals(currentPrincipal + unpaidInterest),
//   };
// }

// ========================================== ********************** ==========================================

// calculations.ts

// export function calculateInterest(
//   principal: number,
//   rate: number,
//   days: number
// ): number {
//   return (principal * (rate / 100) * days) / 365;
// }

// export function calculateNewBalance(
//   currentBalance: number,
//   paymentAmount: number,
//   accruedInterest: number,
//   transactionType: "PAYMENT" | "COST" | "INTEREST"
// ): number {
//   switch (transactionType) {
//     case "PAYMENT":
//       return Math.max(0, currentBalance + accruedInterest - paymentAmount);
//     case "COST":
//     case "INTEREST":
//       return currentBalance + paymentAmount;
//     default:
//       return currentBalance;
//   }
// }

// export default function calculatePayoffAmount(
//   principalBalance: number,
//   accruedInterest: number
// ): number {
//   return principalBalance + accruedInterest;
// }

// export function formatCurrency(amount: number): string {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);
// }

// export function formatDate(date: string): string {
//   return new Date(date).toLocaleDateString("en-US");
// }

// export function truncateToFourDecimals(num: number): number {
//   return Math.floor(num * 10000) / 10000;
// }

// // export function truncateToTwoDecimals(num: number): number {
// //   return Math.floor(num * 100) / 100;
// // }

// type Transaction = {
//   date: string; // format: YYYY-MM-DD
//   type: "payment" | "cost";
//   amount: number;
// };

// type DailyEntry = {
//   date: string;
//   balance: number;
//   interest: number;
// };

// /**
//  * Main function to calculate interest with full daily breakdown.
//  * Includes interest for both judgment_date and end_date.
//  */
// export function calculateJudgmentInterest(params: {
//   judgment_date: string;
//   end_date: string;
//   judgment_amount: number;
//   annual_interest_rate: number;
//   transactions: Transaction[];
// }) {
//   const {
//     judgment_date,
//     end_date,
//     judgment_amount,
//     annual_interest_rate,
//     transactions,
//   } = params;

//   const sortedTransactions = [...transactions].sort(
//     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//   );

//   const dailyData: DailyEntry[] = [];

//   let currentPrincipal = judgment_amount;
//   let totalAccruedInterest = 0;
//   let unpaidInterest = 0;

//   const start = new Date(judgment_date);
//   const end = new Date(end_date);

//   // Ensure inclusive interest for both start and end dates
//   for (
//     let d = new Date(start);
//     d.getTime() <= end.getTime();
//     d.setDate(d.getDate() + 1)
//   ) {
//     const currentDateStr = d.toISOString().split("T")[0];

//     // Accrue interest
//     const dailyInterest = truncateToFourDecimals(
//       (currentPrincipal * annual_interest_rate) / (100 * 365)
//     );
//     unpaidInterest += dailyInterest;
//     totalAccruedInterest += dailyInterest;

//     // Apply transactions on this day
//     while (
//       sortedTransactions.length > 0 &&
//       sortedTransactions[0].date === currentDateStr
//     ) {
//       const txn = sortedTransactions.shift()!;
//       if (txn.type === "payment") {
//         let payment = txn.amount;

//         // Pay unpaid interest first
//         const interestPaid = Math.min(payment, unpaidInterest);
//         unpaidInterest -= interestPaid;
//         payment -= interestPaid;

//         // Pay down principal
//         const principalPaid = Math.min(payment, currentPrincipal);
//         currentPrincipal -= principalPaid;
//         payment -= principalPaid;

//         // Ignore excess
//       } else if (txn.type === "cost") {
//         currentPrincipal += txn.amount;
//       }
//     }

//     dailyData.push({
//       date: currentDateStr,
//       balance: truncateToFourDecimals(currentPrincipal),
//       interest: truncateToFourDecimals(unpaidInterest),
//     });
//   }

//   return {
//     dailyBreakdown: dailyData,
//     totalAccruedInterest: truncateToFourDecimals(totalAccruedInterest),
//     finalBalance: truncateToFourDecimals(currentPrincipal + unpaidInterest),
//   };
// }

// --------------------- ################### ---------------------

// // types
// type Transaction = {
//   date: string; // format: YYYY-MM-DD
//   type: "payment" | "cost";
//   amount: number;
// };

// type DailyEntry = {
//   date: string;
//   balance: number;
//   interest: number;
// };

// // Utility: Truncate to 4 decimal places
// export function truncateToFourDecimals(num: number): number {
//   return Math.floor(num * 10000) / 10000;
// }

// // Utility: Calculate interest
// export function calculateInterest(
//   principal: number,
//   rate: number,
//   days: number
// ): number {
//   return (principal * (rate / 100) * days) / 365;
// }

// // Utility: Calculate new balance based on transaction type
// export function calculateNewBalance(
//   currentBalance: number,
//   paymentAmount: number,
//   accruedInterest: number,
//   transactionType: "PAYMENT" | "COST" | "INTEREST"
// ): number {
//   switch (transactionType) {
//     case "PAYMENT":
//       return Math.max(0, currentBalance + accruedInterest - paymentAmount);
//     case "COST":
//       return currentBalance + paymentAmount;
//     case "INTEREST":
//       return currentBalance + paymentAmount;
//     default:
//       return currentBalance;
//   }
// }

// // Utility: Total payoff amount
// export default function calculatePayoffAmount(
//   principalBalance: number,
//   accruedInterest: number
// ): number {
//   return principalBalance + accruedInterest;
// }

// // Utility: Format currency (USD, 2-4 decimals)
// export function formatCurrency(amount: number): string {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 4,
//   }).format(amount);
// }

// // Utility: Format date string (to MM/DD/YYYY)
// export function formatDate(date: string): string {
//   return new Date(date).toLocaleDateString("en-US");
// }

// // 🔍 Core Function: Judgment Interest Calculation
// export function calculateJudgmentInterest(params: {
//   judgment_date: string;
//   end_date: string;
//   judgment_amount: number;
//   annual_interest_rate: number;
//   transactions: Transaction[];
// }) {
//   const {
//     judgment_date,
//     end_date,
//     judgment_amount,
//     annual_interest_rate,
//     transactions,
//   } = params;

//   // Sort transactions by date (ascending)
//   const sortedTransactions = [...transactions].sort(
//     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//   );

//   const dailyData: DailyEntry[] = [];

//   let currentPrincipal = judgment_amount;
//   let totalAccruedInterest = 0;
//   let unpaidInterest = 0;

//   const start = new Date(judgment_date);
//   const end = new Date(end_date);

//   // Loop over each day from start to end
//   for (
//     let d = new Date(start);
//     d.getTime() <= end.getTime();
//     d.setDate(d.getDate() + 1)
//   ) {
//     const currentDateStr = d.toISOString().split("T")[0];

//     // 1️⃣ Accrue daily interest
//     const dailyInterest = truncateToFourDecimals(
//       (currentPrincipal * annual_interest_rate) / (100 * 365)
//     );
//     unpaidInterest += dailyInterest;
//     totalAccruedInterest += dailyInterest;

//     // 2️⃣ Apply transactions on this date
//     while (
//       sortedTransactions.length > 0 &&
//       sortedTransactions[0].date === currentDateStr
//     ) {
//       const txn = sortedTransactions.shift()!;

//       if (txn.type === "payment") {
//         let payment = txn.amount;

//         // a. Pay unpaid interest first
//         const interestPaid = Math.min(payment, unpaidInterest);
//         unpaidInterest -= interestPaid;
//         payment -= interestPaid;

//         // b. Then apply to principal
//         const principalPaid = Math.min(payment, currentPrincipal);
//         currentPrincipal -= principalPaid;
//         payment -= principalPaid;

//         // c. Any extra payment is ignored
//       } else if (txn.type === "cost") {
//         // Costs are added to principal
//         currentPrincipal += txn.amount;
//       }
//     }

//     // 3️⃣ Track daily balance and interest
//     dailyData.push({
//       date: currentDateStr,
//       balance: truncateToFourDecimals(currentPrincipal),
//       interest: truncateToFourDecimals(unpaidInterest),
//     });
//   }

//   return {
//     dailyBreakdown: dailyData,
//     totalAccruedInterest: truncateToFourDecimals(totalAccruedInterest),
//     finalBalance: truncateToFourDecimals(currentPrincipal + unpaidInterest),
//   };
// }

// -----------------&&&&&&&&&&&&&------------------

// -------------------------
// Types
// // -------------------------
// export type Transaction = {
//   date: string; // format: YYYY-MM-DD
//   type: "payment" | "cost";
//   amount: number;
// };

// export type DailyEntry = {
//   date: string;
//   balance: number;   // principal
//   interest: number;  // unpaid accrued interest
// };

// // -------------------------
// // Utility: Truncate to 4 decimal places
// // -------------------------
// export function truncateToFourDecimals(num: number): number {
//   return Math.floor(num * 10000) / 10000;
// }

// // -------------------------
// // Utility: Calculate simple interest
// // -------------------------
// export function calculateInterest(
//   principal: number,
//   rate: number,
//   days: number
// ): number {
//   return (principal * (rate / 100) * days) / 365;
// }

// // -------------------------
// // Utility: Calculate new balance based on transaction type
// // Applies payment to interest first, then principal
// // -------------------------
// export function calculateNewBalance(
//   currentBalance: number,
//   paymentAmount: number,
//   accruedInterest: number,
//   transactionType: "PAYMENT" | "COST" | "INTEREST"
// ): number {
//   switch (transactionType) {
//     case "PAYMENT": {
//       const remainingAfterInterest = Math.max(0, paymentAmount - accruedInterest);
//       const newPrincipal = Math.max(0, currentBalance - remainingAfterInterest);
//       return newPrincipal;
//     }
//     case "COST":
//     case "INTEREST":
//       return currentBalance + paymentAmount;
//     default:
//       return currentBalance;
//   }
// }

// // -------------------------
// // Utility: Total payoff amount = principal + interest
// // -------------------------
// export default function calculatePayoffAmount(
//   principalBalance: number,
//   accruedInterest: number
// ): number {
//   return principalBalance + accruedInterest;
// }

// // -------------------------
// // Utility: Format currency (USD with 2-4 decimals)
// // -------------------------
// export function formatCurrency(amount: number): string {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 4,
//     maximumFractionDigits: 4,
//   }).format(amount);
// }

// // -------------------------
// // Utility: Format date string (to MM/DD/YYYY)
// // -------------------------
// export function formatDate(date: string): string {
//   return new Date(date).toLocaleDateString("en-US");
// }

// // -------------------------
// // 🔍 Core Function: Judgment Interest Calculation
// // Accrues daily interest, handles payment toward interest first, then principal
// // -------------------------
// export function calculateJudgmentInterest(params: {
//   judgment_date: string;
//   end_date: string;
//   judgment_amount: number;
//   annual_interest_rate: number;
//   transactions: Transaction[];
// }) {
//   const {
//     judgment_date,
//     end_date,
//     judgment_amount,
//     annual_interest_rate,
//     transactions,
//   } = params;

//   const sortedTransactions = [...transactions].sort(
//     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//   );

//   const dailyData: DailyEntry[] = [];

//   let currentPrincipal = judgment_amount;
//   let unpaidInterest = 0;
//   let totalAccruedInterest = 0;

//   const start = new Date(judgment_date);
//   const end = new Date(end_date);

//   let skipInterestToday = false;

//   for (
//     let d = new Date(start);
//     d.getTime() <= end.getTime();
//     d.setDate(d.getDate() + 1)
//   ) {
//     const currentDateStr = d.toISOString().split("T")[0];

//     // Step 1: Accrue interest (if not skipped from yesterday's payment)
//     if (!skipInterestToday) {
//       const dailyInterest = truncateToFourDecimals(
//         (currentPrincipal * annual_interest_rate) / (100 * 365)
//       );
//       unpaidInterest += dailyInterest;
//       totalAccruedInterest += dailyInterest;
//     }

//     skipInterestToday = false;

//     // Step 2: Apply transactions
//     while (
//       sortedTransactions.length > 0 &&
//       sortedTransactions[0].date === currentDateStr
//     ) {
//       const txn = sortedTransactions.shift()!;

//       if (txn.type === "payment") {
//         let payment = txn.amount;

//         const interestPaid = Math.min(payment, unpaidInterest);
//         unpaidInterest -= interestPaid;
//         payment -= interestPaid;

//         const principalPaid = Math.min(payment, currentPrincipal);
//         currentPrincipal -= principalPaid;
//         payment -= principalPaid;

//         // If interest fully cleared, do not accrue again today
//         if (unpaidInterest <= 0) {
//           unpaidInterest = 0;
//           skipInterestToday = true;
//         }
//       }

//       if (txn.type === "cost") {
//         currentPrincipal += txn.amount;
//       }
//     }

//     dailyData.push({
//       date: currentDateStr,
//       balance: truncateToFourDecimals(currentPrincipal),
//       interest: truncateToFourDecimals(unpaidInterest),
//     });
//   }

//   return {
//     dailyBreakdown: dailyData,
//     totalAccruedInterest: truncateToFourDecimals(totalAccruedInterest),
//     finalBalance: truncateToFourDecimals(currentPrincipal + unpaidInterest),
//     finalPrincipal: truncateToFourDecimals(currentPrincipal),
//     finalInterest: truncateToFourDecimals(unpaidInterest),
//   };
// }

export type Transaction = {
  date: string; // format: YYYY-MM-DD
  type: "payment" | "cost";
  amount: number;
};

export type DailyEntry = {
  date: string;
  balance: number; // principal
  interest: number; // unpaid accrued interest
};

// -------------------------
// Utility: Truncate to 4 decimal places
// -------------------------
export function truncateToFourDecimals(num: number): number {
  return Math.floor(num * 10000) / 10000;
}

// -------------------------
// Utility: Calculate simple interest
// -------------------------
export function calculateInterest(
  principal: number,
  rate: number,
  days: number
): number {
  const raw = (principal * (rate / 1000) * days) / 365;
  // round to 4 decimal places and return as number
  return parseFloat(raw.toFixed(4));
}

// -------------------------
// Utility: Calculate new balance based on transaction type
// Applies payment to interest first, then principal
// -------------------------
export function calculateNewBalance(
  currentBalance: number,
  paymentAmount: number,
  accruedInterest: number,
  transactionType: "PAYMENT" | "COST" | "INTEREST"
): number {
  switch (transactionType) {
    case "PAYMENT": {
      const remainingAfterInterest = Math.max(
        0,
        truncateToFourDecimals(paymentAmount - accruedInterest)
      );
      const newPrincipal = Math.max(
        0,
        truncateToFourDecimals(currentBalance - remainingAfterInterest)
      );
      return newPrincipal;
    }
    case "COST":
    case "INTEREST":
      return truncateToFourDecimals(currentBalance + paymentAmount);
    default:
      return currentBalance;
  }
}

// -------------------------
// Utility: Total payoff amount = principal + interest
// -------------------------
export default function calculatePayoffAmount(
  principalBalance: number,
  accruedInterest: number
): number {
  return truncateToFourDecimals(principalBalance + accruedInterest);
}

// -------------------------
// Utility: Format currency (USD with 2-4 decimals)
// -------------------------
// export function formatCurrency(amount: number): string {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 4,
//     maximumFractionDigits: 4,
//   }).format(amount);
// }


// export function formatCurrency(amount: number): string {
//   const truncated = truncateToFourDecimals(amount).toFixed(4); // force 4 digits
//   return `$${truncated}`;
// }
export function formatCurrency(amount: number): string {
  const truncated = truncateToFourDecimals(amount).toFixed(4); // keep as a number
  const formatted = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
    //@ts-ignore
  }).format(truncated);
  return `$${formatted}`;
}
// export function formatCurrencyintwo(amount: number): string {
//   const truncated = truncateToFourDecimals(amount).toFixed(2); // force 4 digits
//   return `$${truncated}`;
// }
export function formatCurrencyintwo(amount: number): string {
  const truncated = truncateToFourDecimals(amount).toFixed(2); // still a number
  const formatted = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    //@ts-ignore
  }).format(truncated);
  return `$${formatted}`;
}

// -------------------------
// Utility: Format date string (to MM/DD/YYYY)
// -------------------------
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US");
}

// -------------------------
// 🔍 Core Function: Judgment Interest Calculation
// Accrues daily interest, handles payment toward interest first, then principal
// -------------------------
export function calculateJudgmentInterest(params: {
  judgment_date: string;
  end_date: string;
  judgment_amount: number;
  annual_interest_rate: number;
  transactions: Transaction[];
}) {
  const {
    judgment_date,
    end_date,
    judgment_amount,
    annual_interest_rate,
    transactions,
  } = params;

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const dailyData: DailyEntry[] = [];

  let currentPrincipal = truncateToFourDecimals(judgment_amount);
  let unpaidInterest = 0;
  let totalAccruedInterest = 0;

  const start = new Date(judgment_date);
  const end = new Date(end_date);

  let skipInterestToday = false;

  for (
    let d = new Date(start);
    d.getTime() <= end.getTime();
    d.setDate(d.getDate())
  ) {
    const currentDateStr = d.toISOString().split("T")[0];

    // Step 1: Accrue interest (if not skipped from yesterday's payment)
    if (!skipInterestToday) {
      const dailyInterest = truncateToFourDecimals(
        (currentPrincipal * annual_interest_rate) / (100 * 365)
      );
      unpaidInterest = truncateToFourDecimals(unpaidInterest + dailyInterest);
      totalAccruedInterest = truncateToFourDecimals(
        totalAccruedInterest + dailyInterest
      );
    }

    skipInterestToday = false;

    // Step 2: Apply transactions
    while (
      sortedTransactions.length > 0 &&
      sortedTransactions[0].date === currentDateStr
    ) {
      const txn = sortedTransactions.shift()!;

      if (txn.type === "payment") {
        let payment = truncateToFourDecimals(txn.amount);

        const interestPaid = truncateToFourDecimals(
          Math.min(payment, unpaidInterest)
        );
        unpaidInterest = truncateToFourDecimals(unpaidInterest - interestPaid);
        payment = truncateToFourDecimals(payment - interestPaid);

        const principalPaid = truncateToFourDecimals(
          Math.min(payment, currentPrincipal)
        );
        currentPrincipal = truncateToFourDecimals(
          currentPrincipal - principalPaid
        );
        payment = truncateToFourDecimals(payment - principalPaid);

        // If interest fully cleared, do not accrue again today
        if (unpaidInterest <= 0) {
          unpaidInterest = 0;
          skipInterestToday = true;
        }
      }

      if (txn.type === "cost") {
        currentPrincipal = truncateToFourDecimals(
          currentPrincipal + txn.amount
        );
      }
    }

    dailyData.push({
      date: currentDateStr,
      balance: truncateToFourDecimals(currentPrincipal),
      interest: truncateToFourDecimals(unpaidInterest),
    });
  }

  return {
    dailyBreakdown: dailyData,
    totalAccruedInterest: truncateToFourDecimals(totalAccruedInterest),
    finalBalance: truncateToFourDecimals(currentPrincipal + unpaidInterest),
    finalPrincipal: truncateToFourDecimals(currentPrincipal),
    finalInterest: truncateToFourDecimals(unpaidInterest),
  };
}
