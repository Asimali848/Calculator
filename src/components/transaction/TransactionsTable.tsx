import { useRef } from "react";

import { Edit, Printer, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

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
import { truncateString } from "@/lib/utils";
import type { RootState } from "@/store";
import { setEditTransactionId } from "@/store/global";
import { useGetTransactionQuery } from "@/store/services/transaction";

interface TransactionsTableProps {
  onEditTransaction: (transaction: TransactionFormData) => void;
  onDeleteTransaction: (transactionId: string) => void;
}

const TransactionsTable = ({
  onEditTransaction,
  onDeleteTransaction,
}: TransactionsTableProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const selectedCase = useSelector(
    (state: RootState) => state.global.selectedCase
  );

  const dispatch = useDispatch();
  const id = Number(selectedCase?.id);
  const token = localStorage.getItem("access") || "";
  const { data, isLoading } = useGetTransactionQuery(
    {
      id,
      token,
    },
    {
      skip: !id || !token,
      refetchOnMountOrArgChange: true,
    }
  );

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "", "height=600,width=800");
    if (!printWindow) return;

    printWindow.document.write("<html><head><title>Print Transactions</title>");
    printWindow.document.write(`
      <style>
        body { font-family: sans-serif; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
        h2, h3 { text-align: center; margin: 0; }
      </style>
    `);
    printWindow.document.write("</head><body>");
    printWindow.document.write(`<h2>Recent Transactions</h2>`);
    printWindow.document.write(`<h3>${selectedCase?.caseName ?? ""}</h3>`);
    printWindow.document.write(printContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case "PAYMENT":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "COST":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  if (!selectedCase) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-10 text-center text-muted-foreground">
            Select a case to view its transactions.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-end gap-3">
          <Button variant="default" size="sm" onClick={handlePrint}>
            <span className="text-md font-semibold">Print</span>
            <Printer className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <CardTitle className="text-center text-xl font-bold">
          Recent Transactions
        </CardTitle>
        <p className="text-center text-lg font-bold text-green-600">
          {selectedCase.caseName}
        </p>
      </CardHeader>

      <CardContent>
        <div ref={printRef}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DATE</TableHead>
                <TableHead>TRANSACTION TYPE</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>ACCRUED INTEREST</TableHead>
                <TableHead>PRINCIPAL BALANCE</TableHead>
                <TableHead>DESCRIPTION</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((transaction) => (
                  //@ts-ignore
                  <TableRow key={transaction?.id} className="hover:bg-muted/50">
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
                      {formatCurrency(transaction.interestRate)}
                    </TableCell>
                    <TableCell className="font-bold">
                      {formatCurrency(transaction.newBalance)}
                    </TableCell>
                    <TableCell className="truncate font-bold">
                      {truncateString(transaction?.description, 20) ||
                        "No description"}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            dispatch(
                              //@ts-ignore
                              setEditTransactionId(transaction?.id.toString())
                            );
                            onEditTransaction(transaction);
                          }}
                        >
                          <Edit className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          //@ts-ignore
                          onClick={() => onDeleteTransaction(transaction?.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
