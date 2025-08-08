import { useState } from "react";

import { Edit, Loader2, Printer } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrencyintwo, formatDate } from "@/lib/calculations";
import { truncateString } from "@/lib/utils";
import type { RootState } from "@/store";
import { setEditTransactionId } from "@/store/global";
import {
  useDeleteTransactionMutation,
  useDownloadPrintTransactionMutation,
  useGetTransactionQuery,
} from "@/store/services/transaction";

interface TransactionsTableProps {
  onEditTransaction: (transaction: any) => void;
}

const TransactionsTable = ({ onEditTransaction }: TransactionsTableProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<number | null>(
    null
  );
  const [isPrinting, setIsPrinting] = useState(false);
  const [deleteTransaction, { isLoading: isDeleting }] =
    useDeleteTransactionMutation();
  const [downloadPrint] = useDownloadPrintTransactionMutation();

  const selectedCase = useSelector(
    (state: RootState) => state.global.selectedCase
  );

  const dispatch = useDispatch();
  const id = Number(selectedCase?.id);
  const token = localStorage.getItem("access") || "";
  const { data, isLoading, refetch } = useGetTransactionQuery(
    {
      id,
      token,
    },
    {
      skip: !id || !token,
      refetchOnMountOrArgChange: true,
    }
  );

  const handlePrint = async () => {
    if (!selectedCase || !token) {
      toast.error("No case selected or missing token", {
        className: "bg-destructive text-white p-3",
      });
      return;
    }

    try {
      setIsPrinting(true);

      const pdfBlob = await downloadPrint({
        token,
        caseId: selectedCase.id.toString(),
      }).unwrap();

      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      //@ts-ignore
      a.download = `transactions-${selectedCase.caseName}-${formatDate(new Date())}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("PDF downloaded successfully", {
        className: "bg-primary text-white p-3",
      });
    } catch (error) {
      console.error("PDF download error:", error);
      toast.error("Failed to download PDF", {
        className: "bg-destructive text-white p-3",
      });
    } finally {
      setIsPrinting(false);
    }
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

  // const handleDeleteClick = (transactionId: number) => {
  //   setTransactionToDelete(transactionId);
  //   setDeleteDialogOpen(true);
  // };

  const confirmDelete = async () => {
    if (transactionToDelete && token) {
      try {
        await deleteTransaction({
          token,
          id: transactionToDelete,
        }).unwrap();

        refetch();
        toast.success("Transaction deleted successfully", {
          className: "bg-primary text-white p-3",
        });
      } catch (error) {
        console.error("Delete transaction error:", error);
        toast.error("Failed to delete transaction", {
          className: "bg-destructive text-white p-3",
        });
      } finally {
        setDeleteDialogOpen(false);
        setTransactionToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setTransactionToDelete(null);
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
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this transaction? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="w-full"
            >
              {isDeleting ? "Deleting..." : "Delete Permanently"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={cancelDelete}
              disabled={isDeleting}
              className="mt-2 w-full sm:mt-0"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CardHeader>
        <div className="flex justify-end gap-3">
          <Button
            variant="default"
            size="sm"
            onClick={handlePrint}
            disabled={isPrinting}
          >
            {isPrinting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Printer className="mr-2 h-4 w-4" />
            )}
            <span className="font-semibold">
              {isPrinting ? "Generating PDF..." : "Print"}
            </span>
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
        <div>
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
              ) : data && data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center">
                    No transactions found.
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
                      {formatCurrencyintwo(transaction.amount)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrencyintwo(transaction.calculatedInterest)}
                    </TableCell>
                    <TableCell className="font-bold">
                      {formatCurrencyintwo(transaction.newBalance)}
                    </TableCell>
                    <TableCell className="truncate font-bold">
                      {transaction.description
                        ? truncateString(transaction.description, 20)
                        : "No description"}
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
                        {/* <Button
                          variant="ghost"
                          size="sm"
                          //@ts-ignore
                          onClick={() => handleDeleteClick(transaction?.id)}
                          disabled={isDeleting}
                        >
                          <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
                        </Button> */}
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
