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

export function calculatePayoffAmount(
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
