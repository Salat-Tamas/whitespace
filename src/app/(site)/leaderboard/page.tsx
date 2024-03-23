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
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const data: Player[] = [
    {
        id: "m5gr84i9",
        Score: 316,
        subscription: "Creator",
        Nickname: "ken99@yahoo.com",
    },
    {
        id: "3u1reuv4",
        Score: 242,
        subscription: "Creator",
        Nickname: "Abe45@gmail.com",
    },
    {
        id: "derv1ws0",
        Score: 837,
        subscription: "Player",
        Nickname: "Monserrat44@gmail.com",
    },
    {
        id: "5kma53ae",
        Score: 874,
        subscription: "Creator",
        Nickname: "Silas22@gmail.com",
    },
    {
        id: "bhqecj4p",
        Score: 721,
        subscription: "Player",
        Nickname: "carmella@hotmail.com",
    },
]

export type Player = {
    id: string
    Score: number
    Nickname: string
    totalNumberOfGamesPlayed: number
}

export const columns: ColumnDef<Player>[] = [
    {
        accessorKey: "number",
        header: "Number",
        cell: ({ }) => (
            <div className="capitalize">{ }</div>
        ),
    },
    {
        accessorKey: "subscription",
        header: "Type",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("subscription")}</div>
        ),
    },
    {
        accessorKey: "Nickname",
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
        cell: ({ row }) => <div className="lowercase">{row.getValue("Nickname")}</div>,
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
                </Button></div>,
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

export function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([])
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
        <div className="mx-8 my-4">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by nickname..."
                    value={(table.getColumn("nickname")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("nickname")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
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
                                    {row.getVisibleCells().map((cell, cellIndex) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                            {cellIndex === 0 && rowIndex}
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

export default DataTableDemo;