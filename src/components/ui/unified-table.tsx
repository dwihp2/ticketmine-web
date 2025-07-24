"use client"

import { useId, useMemo, useRef, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  Columns3Icon,
  EllipsisIcon,
  ListFilterIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { DeleteConfirmationDialog } from "@/components/Tables/DeleteConfirmationDialog"
import { AdvancedFilters, ColumnFilter } from "@/components/Tables/AdvancedFilters"

export interface UnifiedTableProps<TData> {
  // Core table props
  data: TData[]
  columns: ColumnDef<TData>[]
  
  // Configuration props to show/hide features
  config?: {
    showSearch?: boolean
    showColumnFilters?: boolean
    showColumnVisibility?: boolean
    showRowSelection?: boolean
    showPagination?: boolean
    showDeleteButton?: boolean
    showCustomActions?: boolean
  }
  
  // Custom buttons and actions
  customButton?: {
    label: string
    icon?: React.ReactNode
    onClick: () => void
    variant?: "default" | "outline" | "ghost" | "destructive" | "secondary"
  }
  
  // Column filters configuration
  columnFilters?: ColumnFilter[]
  
  // Additional action buttons (e.g., "Add User", "Import", "Export")
  actionButtons?: Array<{
    label: string
    icon?: React.ReactNode
    onClick: () => void
    variant?: "default" | "outline" | "ghost" | "destructive" | "secondary"
    disabled?: boolean
  }>
  
  // Callbacks
  onRowsDelete?: (selectedRows: Row<TData>[]) => void
  
  // Loading and error states
  isLoading?: boolean
  error?: string | null
  
  // Pagination options
  pageSizes?: number[]
  defaultPageSize?: number
  
  // Search configuration
  searchPlaceholder?: string
  searchColumnKey?: string
}

export function UnifiedTable<TData>({
  data,
  columns,
  config = {
    showSearch: true,
    showColumnFilters: false,
    showColumnVisibility: true,
    showRowSelection: false,
    showPagination: true,
    showDeleteButton: false,
    showCustomActions: true,
  },
  customButton,
  columnFilters: columnFiltersConfig,
  actionButtons,
  onRowsDelete,
  isLoading = false,
  error = null,
  pageSizes = [5, 10, 25, 50],
  defaultPageSize = 10,
  searchPlaceholder = "Search...",
  searchColumnKey,
}: UnifiedTableProps<TData>) {
  const id = useId()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const [sorting, setSorting] = useState<SortingState>([])

  const handleDeleteRows = () => {
    if (onRowsDelete) {
      const selectedRows = table.getSelectedRowModel().rows
      onRowsDelete(selectedRows)
      table.resetRowSelection()
    }
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  })

  // Get search column for filtering
  const searchColumn = searchColumnKey ? table.getColumn(searchColumnKey) : table.getAllColumns().find(col => col.getCanFilter())

  // Column filters management
  const availableColumnFilters = useMemo(() => {
    if (!columnFiltersConfig) return []
    return columnFiltersConfig.filter(filter => {
      const column = table.getColumn(filter.columnId)
      return column?.getCanFilter()
    })
  }, [columnFiltersConfig, table])

  if (error) {
    return (
      <div className="flex h-24 items-center justify-center rounded-md border border-destructive bg-destructive/10">
        <div className="text-center">
          <CircleAlertIcon className="mx-auto h-8 w-8 text-destructive" />
          <p className="mt-2 text-sm text-destructive">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters and Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          {config.showSearch && (
            <div className="relative">
              <Input
                id={`${id}-input`}
                ref={inputRef}
                className={cn(
                  "peer min-w-60 ps-9",
                  Boolean(searchColumn?.getFilterValue()) && "pe-9"
                )}
                value={
                  (searchColumn?.getFilterValue() ?? "") as string
                }
                onChange={(e) =>
                  searchColumn?.setFilterValue(e.target.value)
                }
                placeholder={searchPlaceholder}
                type="text"
                aria-label={searchPlaceholder}
                disabled={isLoading}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <ListFilterIcon size={16} aria-hidden="true" />
              </div>
              {Boolean(searchColumn?.getFilterValue()) && (
                <button
                  className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Clear filter"
                  onClick={() => {
                    searchColumn?.setFilterValue("")
                    if (inputRef.current) {
                      inputRef.current.focus()
                    }
                  }}
                >
                  <CircleXIcon size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          {/* Advanced Filters */}
          {config.showColumnFilters && availableColumnFilters.length > 0 && (
            <AdvancedFilters
              table={table}
              columnFilters={availableColumnFilters}
              isLoading={isLoading}
            />
          )}

          {/* Custom Button */}
          {customButton && (
            <Button 
              variant={customButton.variant || "outline"} 
              onClick={customButton.onClick}
              disabled={isLoading}
            >
              {customButton.icon && (
                <span className="-ms-1 opacity-60">
                  {customButton.icon}
                </span>
              )}
              {customButton.label}
            </Button>
          )}

          {/* Column Visibility Toggle */}
          {config.showColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={isLoading}>
                  <Columns3Icon
                    className="-ms-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
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
                        onSelect={(event) => event.preventDefault()}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Delete Button */}
          {config.showDeleteButton && config.showRowSelection && table.getSelectedRowModel().rows.length > 0 && onRowsDelete && (
            <DeleteConfirmationDialog
              itemCount={table.getSelectedRowModel().rows.length}
              itemName="row"
              onConfirm={handleDeleteRows}
              disabled={isLoading}
            />
          )}

          {/* Action Buttons */}
          {actionButtons && actionButtons.length > 0 && (
            <div className="flex items-center gap-2">
              {actionButtons.map((button, index) => (
                <Button 
                  key={index}
                  className="ml-auto" 
                  variant={button.variant || "outline"}
                  onClick={button.onClick}
                  disabled={button.disabled || isLoading}
                >
                  {button.icon && (
                    <span className="-ms-1 opacity-60">
                      {button.icon}
                    </span>
                  )}
                  {button.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const isSelectColumn = header.id === 'select'
                  const isActionsColumn = header.id === 'actions'
                  
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "h-11",
                        isSelectColumn && "w-12 text-center",
                        isActionsColumn && "w-32 text-center"
                      )}
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault()
                              header.column.getToggleSortingHandler()?.(e)
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isSelectColumn = cell.column.id === 'select'
                    const isActionsColumn = cell.column.id === 'actions'
                    
                    return (
                      <TableCell 
                        key={cell.id} 
                        className={cn(
                          "last:py-0",
                          isSelectColumn && "w-12 text-center",
                          isActionsColumn && "w-32 text-center"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
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

      {/* Pagination */}
      {config.showPagination && (
        <div className="flex items-center justify-between gap-8">
          {/* Results per page */}
          <div className="flex items-center gap-3">
            <Label htmlFor={id} className="max-sm:sr-only">
              Rows per page
            </Label>
            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
              disabled={isLoading}
            >
              <SelectTrigger id={id} className="w-fit whitespace-nowrap">
                <SelectValue placeholder="Select number of results" />
              </SelectTrigger>
              <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                {pageSizes.map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Page number information */}
          <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
            <p
              className="text-muted-foreground text-sm whitespace-nowrap"
              aria-live="polite"
            >
              <span className="text-foreground">
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}
                -
                {Math.min(
                  Math.max(
                    table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize +
                      table.getState().pagination.pageSize,
                    0
                  ),
                  table.getRowCount()
                )}
              </span>{" "}
              of{" "}
              <span className="text-foreground">
                {table.getRowCount().toString()}
              </span>
            </p>
          </div>

          {/* Pagination buttons */}
          <div>
            <Pagination>
              <PaginationContent>
                {/* First page button */}
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage() || isLoading}
                    aria-label="Go to first page"
                  >
                    <ChevronFirstIcon size={16} aria-hidden="true" />
                  </Button>
                </PaginationItem>
                {/* Previous page button */}
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage() || isLoading}
                    aria-label="Go to previous page"
                  >
                    <ChevronLeftIcon size={16} aria-hidden="true" />
                  </Button>
                </PaginationItem>
                {/* Next page button */}
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage() || isLoading}
                    aria-label="Go to next page"
                  >
                    <ChevronRightIcon size={16} aria-hidden="true" />
                  </Button>
                </PaginationItem>
                {/* Last page button */}
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage() || isLoading}
                    aria-label="Go to last page"
                  >
                    <ChevronLastIcon size={16} aria-hidden="true" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  )
}

// Export default row actions component
export function DefaultRowActions<TData>({ 
  row, 
  onAction 
}: { 
  row: Row<TData>
  onAction?: (row: Row<TData>, action: string) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Actions"
          >
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onAction?.(row, "edit")}>
            <span>Edit</span>
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction?.(row, "duplicate")}>
            <span>Duplicate</span>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onAction?.(row, "archive")}>
            <span>Archive</span>
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-destructive focus:text-destructive"
          onClick={() => onAction?.(row, "delete")}
        >
          <span>Delete</span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
