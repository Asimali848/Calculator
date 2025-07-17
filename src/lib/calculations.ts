export function calculateInterest(
  principal: number,
  rate: number,
  days: number
): number {
  return (principal * (rate / 100) * days) / 365;
}

export function calculateNewBalance(
  currentBalance: number,
  paymentAmount: number,
  accruedInterest: number,
  transactionType: "PAYMENT" | "COST" | "INTEREST"
): number {
  switch (transactionType) {
    case "PAYMENT":
      return Math.max(0, currentBalance + accruedInterest - paymentAmount);
    case "COST":
      return currentBalance + paymentAmount;
    case "INTEREST":
      return currentBalance + paymentAmount;
    default:
      return currentBalance;
  }
}

export default function calculatePayoffAmount(
  principalBalance: number,
  accruedInterest: number
): number {
  return principalBalance + accruedInterest;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US");
}

type Transaction = {
  date: string; // format: YYYY-MM-DD
  type: "payment" | "cost";
  amount: number;
};

type DailyEntry = {
  date: string;
  balance: number;
  interest: number;
};

export function truncateToTwoDecimals(num: number): number {
  return Math.floor(num * 100) / 100;
}

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

  let currentPrincipal = judgment_amount;
  let totalAccruedInterest = 0;
  let unpaidInterest = 0;

  const start = new Date(judgment_date);
  const end = new Date(end_date);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const currentDateStr = d.toISOString().split("T")[0];

    // Accrue daily interest
    const dailyInterest = truncateToTwoDecimals(
      (currentPrincipal * annual_interest_rate) / (100 * 365)
    );
    unpaidInterest += dailyInterest;
    totalAccruedInterest += dailyInterest;

    // Apply transactions
    while (
      sortedTransactions.length > 0 &&
      sortedTransactions[0].date === currentDateStr
    ) {
      const txn = sortedTransactions.shift()!;
      if (txn.type === "payment") {
        let payment = txn.amount;

        // Pay interest first
        const interestPaid = Math.min(payment, unpaidInterest);
        unpaidInterest -= interestPaid;
        payment -= interestPaid;

        // Then pay principal
        const principalPaid = Math.min(payment, currentPrincipal);
        currentPrincipal -= principalPaid;
        payment -= principalPaid;

        // Any excess is ignored
      } else if (txn.type === "cost") {
        currentPrincipal += txn.amount;
      }
    }

    dailyData.push({
      date: currentDateStr,
      balance: currentPrincipal,
      interest: unpaidInterest,
    });
  }

  return {
    dailyBreakdown: dailyData,
    totalAccruedInterest: truncateToTwoDecimals(totalAccruedInterest),
    finalBalance: truncateToTwoDecimals(currentPrincipal + unpaidInterest),
  };
}
