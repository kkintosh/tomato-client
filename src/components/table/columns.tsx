import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileRecord } from "@/types/file";
import { shortenDateTime } from "@/utils/common";
import { formatBytes } from "@/utils/file";

const columns: Array<ColumnDef<FileRecord>> = [
  {
    accessorKey: "fileName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("fileName")}</div>,
  },
  {
    accessorKey: "fileType",
    header: "Type",
    cell: ({ row }) => <div className="uppercase">{row.getValue("fileType")}</div>,
  },
  {
    accessorKey: "fileSize",
    header: "File size",
    cell: ({ row }) => <div>{formatBytes(row.getValue("fileSize"))}</div>,
  },
  {
    accessorKey: "lastModified",
    header: "Last modified",
    cell: ({ row }) => <div>{shortenDateTime(row.getValue("lastModified"))}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
