import { Edit, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/calculations";
import { Transaction } from "@/types/case";

interface TransactionsTableProps {
  transactions: Transaction[];
  caseName: string;
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (transactionId: string) => void;
}

export function TransactionsTable({
  transactions,
  caseName,
  onEditTransaction,
  onDeleteTransaction,
}: TransactionsTableProps) {
  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case "PAYMENT":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "COST":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "INTEREST":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">
          Recent Transactions
        </CardTitle>
        <p className="text-center text-lg font-bold text-green-600">
          {caseName}
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-foreground">DATE</TableHead>
              <TableHead className="font-bold text-foreground">
                TRANSACTION TYPE
              </TableHead>
              <TableHead className="font-bold text-foreground">
                AMOUNT
              </TableHead>
              <TableHead className="font-bold text-foreground">
                ACCRUED INTEREST
              </TableHead>
              <TableHead className="font-bold text-foreground">
                PRINCIPAL BALANCE
              </TableHead>
              <TableHead className="font-bold text-foreground">
                ACTIONS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-muted/50">
                <TableCell className="font-medium text-green-600">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getTransactionTypeColor(transaction.type)}
                  >
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(transaction.accruedInterest)}
                </TableCell>
                <TableCell className="font-bold">
                  {formatCurrency(transaction.principalBalance)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditTransaction(transaction)}
                    >
                      <Edit className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteTransaction(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
