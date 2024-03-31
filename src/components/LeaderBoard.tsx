"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Row } from "react-day-picker";

export type Player = {
  number: number;
  id: string;
  Score: number;
  nickname: string;
  totalNumberOfGamesPlayed: number;
};

const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "number",
    header: "Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("number")}</div>
    ),
  },
  {
    accessorKey: "nickname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nickname
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("nickname")}</div>
    ),
  },
  {
    accessorKey: "totalNumberOfGamesPlayed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total games played
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("totalNumberOfGamesPlayed")}
      </div>
    ),
  },
  {
    accessorKey: "Score",
    header: ({ column }) => (
      <div className="flex flex-row">
        <div className="flex relative w-1/2 mr-4"></div>
        <Button
          className="flex relative w-1/2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Score
          <ArrowUpDown className="ml-2 h-[16px] w-[16px]" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const Score = parseFloat(row.getValue("Score"));

      // Format the Score as a dollar Score
      const formatted = new Intl.NumberFormat("en-US", {
        currency: "EUR",
      }).format(Score);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

const Leaderboard = ({ data }: { data: Player[] }) => {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "Score",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="h-[85vh]">
      <div className="mx-4 my-4 rounded-lg p-8 sm:px-8 md:mx-20 lg:mx-64  bg-gradient-to-tr from-gray-900 to-indigo-500">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by nickname..."
            value={
              (table.getColumn("nickname")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("nickname")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="bg-gradient-tr from-blue-600 to-gray-600 text-gray-300">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow key={row.id} data-state={row.getIsSelected()}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
