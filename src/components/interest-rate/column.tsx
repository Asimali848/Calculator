import { ColumnDef } from "@tanstack/react-table";
import { PostData } from "./DataTable";

export const columns: ColumnDef<PostData>[] = [
  {
    accessorKey: "State",
    header: "State",
  },
  {
    accessorKey: "PostJudgmentInterestRate",
    header: "Post-Judgment Interest Rate",
  },
  {
    accessorKey: "Cite",
    header: "Cite",
  },
  {
    accessorKey: "Link",
    header: "Link",
    cell: ({ row }) => {
      const link = row.original.Link;
      return link && link !== "NaN" ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View
        </a>
      ) : (
        <span className="text-gray-400">N/A</span>
      );
    },
  },
  {
    accessorKey: "Compounding",
    header: "Compounding",
  },
];
