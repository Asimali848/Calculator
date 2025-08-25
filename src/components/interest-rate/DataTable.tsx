import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

export type PostData = {
  State: string;
  PostJudgmentInterestRate: string;
  Cite: string;
  Link?: string | null;
  Compounding?: string | null;
};

interface DataTableProps {
  columns: ColumnDef<PostData>[];
  data: PostData[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="w-full overflow-x-auto rounded-2xl shadow-md">
      <CardContent className="p-4">
        <Table className="min-w-full border-collapse text-sm table-fixed">
          {/* Table Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={`
                      text-base font-semibold text-primary 
                      ${index === 0 ? "w-40 " : ""}
                      ${index === 1 ? "w-full min-w-[150px] max-w-[150px] " : ""} 
                      ${index === 2 ? "w-72 " : ""}
                      ${index === 3 ? "w-20 " : ""}
                      ${index === 4 ? "w-52 " : ""}
                    `}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={`
                        px-3 py-2 align-top 
                        ${index === 0 ? "w-40 font-medium " : ""}
                        ${index === 1 ? "w-full min-w-[150px] max-w-[150px] " : ""}
                        ${index === 2 ? "w-80 " : ""}
                        ${index === 3 ? "w-20 text-blue-600 underline " : ""}
                        ${index === 4 ? "w-40 " : ""}
                      `}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
