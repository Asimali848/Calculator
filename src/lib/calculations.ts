
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
export function formatCurrency(amount: number): string {
  const truncated = truncateToFourDecimals(amount).toFixed(4); // keep as a number
  const formatted = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
    //@ts-ignore
  }).format(truncated);
  return `$${formatted}`;
}
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
// export function formatDate(date: string): string {
//   return new Date(date).toLocaleDateString("en-US");
// }
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=
// export function formatDate(date?: string): string {
//   if (!date) return "--/--/----"; // or some fallback text
//   const parsed = new Date(date);
//   return isNaN(parsed.getTime()) ? "" : parsed.toLocaleDateString("en-US");
// }

// =--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-===-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

export function formatDate(date?: string, timeZone: string = "UTC"): string {
  if (!date) return "--/--/----"; // No date passed
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return ""; // Invalid date string
  
  return parsed.toLocaleDateString("en-US", {
    timeZone, // e.g., "UTC", "Asia/Karachi", "America/New_York"
  });
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

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
    d.setDate(d.getDate() + 1)
  ) {
    const currentDateStr = new Date(
      d.toLocaleString("en-US", { timeZone: userTimeZone })
    )
      .toISOString()
      .split("T")[0];

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
