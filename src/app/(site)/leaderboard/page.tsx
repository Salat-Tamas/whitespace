"use client"

import * as React from "react"
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
} from "@tanstack/react-table"

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Row } from "react-day-picker"

const data: Player[] = [
    {
        number: 4,
        id: "m5gr84i9",
        Score: 316,
        nickname: "ken99@yahoo.com",
        totalNumberOfGamesPlayed: 5
    },
    {
        number: 5,
        id: "3u1reuv4",
        Score: 242,
        nickname: "Abe45@gmail.com",
        totalNumberOfGamesPlayed: 71
    },
    {
        number: 2,
        id: "derv1ws0",
        Score: 837,
        nickname: "Monserrat44@gmail.com",
        totalNumberOfGamesPlayed: 3
    },
    {
        number: 1,
        id: "5kma53ae",
        Score: 874,
        nickname: "Silas22@gmail.com",
        totalNumberOfGamesPlayed: 0
    },
    {
        number: 3,
        id: "bhqecj4p",
        Score: 721,
        nickname: "carmella@hotmail.com",
        totalNumberOfGamesPlayed: 23
    },
]

type Player = {
    number: number
    id: string
    Score: number
    nickname: string
    totalNumberOfGamesPlayed: number
}

const columns: ColumnDef<Player>[] = [
    {
        accessorKey: "number",
        header: "Number",
        cell: ({ row }) => (
            <div className="capitalize">{ row.getValue("number")}</div>
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
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("nickname")}</div>,
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
            )
        },
        cell: ({ row }) => (
            <div className="capitalize">{ row.getValue("totalNumberOfGamesPlayed")}</div>
        ),
    },
    {
        accessorKey: "Score",
        header: ({ column }) =>
            <div className="flex flex-row">
                <div className="flex relative w-1/2 mr-4"></div>
                <Button className="flex relative w-1/2"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Score
                    <ArrowUpDown className="ml-2 h-[16px] w-[16px]" />
                </Button>
            </div>,
        cell: ({ row }) => {
            const Score = parseFloat(row.getValue("Score"))

            // Format the Score as a dollar Score
            const formatted = new Intl.NumberFormat("en-US", {
                currency: "EUR",
            }).format(Score)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },

]

export function Leaderboard() {
    const [sorting, setSorting] = React.useState<SortingState>([
        {
            id: "Score",
            desc: true
        },
    ]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

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
    })

    return (
        <div className="mx-4 sm:px-8 md:mx-20 lg:mx-64 my-4 h-[80vh]">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by nickname..."
                    value={(table.getColumn("nickname")?.getFilterValue() as string) ?? ""}
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
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, rowIndex) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected()}
                                >
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
    )
}

export default Leaderboard;