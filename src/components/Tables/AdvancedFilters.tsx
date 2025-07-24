"use client"

import { useState } from "react"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FilterIcon, Plus, CircleXIcon, Check } from "lucide-react"

export interface ColumnFilter {
  columnId: string
  label: string
  type: 'select' | 'text' | 'number' | 'date' | 'boolean'
  options?: Array<{ value: string; label: string }> // For select type
  placeholder?: string // For text/number type
  operator?: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between'
}

interface PendingFilter {
  id: string
  columnId: string
  value: unknown
  operator: string
}

interface AdvancedFiltersProps<TData> {
  table: Table<TData>
  columnFilters: ColumnFilter[]
  isLoading?: boolean
}

export function AdvancedFilters<TData>({
  table,
  columnFilters: availableColumnFilters,
  isLoading = false,
}: AdvancedFiltersProps<TData>) {
  const [isOpen, setIsOpen] = useState(false)
  const [pendingFilters, setPendingFilters] = useState<PendingFilter[]>([])

  // Get available column filters that are actually filterable
  const validColumnFilters = availableColumnFilters.filter(filter => {
    const column = table.getColumn(filter.columnId)
    return column?.getCanFilter()
  })

  // Initialize pending filters when popover opens
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    
    if (open) {
      const activeFilters = table.getState().columnFilters
      
      if (activeFilters.length > 0) {
        // Load existing active filters with proper operator mapping
        const pending = activeFilters.map((filter, index) => {
          const columnConfig = validColumnFilters.find(cf => cf.columnId === filter.id)
          const defaultOperator = columnConfig?.type === 'text' ? 'contains' : 'equals'
          
          return {
            id: `${filter.id}-${index}-${Date.now()}`,
            columnId: filter.id,
            value: filter.value,
            operator: defaultOperator
          }
        })
        setPendingFilters(pending)
      } else if (validColumnFilters.length > 0) {
        // Initialize with one empty filter if no active filters
        setPendingFilters([{
          id: Date.now().toString(),
          columnId: validColumnFilters[0].columnId,
          value: '',
          operator: validColumnFilters[0].type === 'text' ? 'contains' : 'equals'
        }])
      }
    } else {
      // Reset pending filters when popover closes
      setPendingFilters([])
    }
  }

  const activeFilters = table.getState().columnFilters

  const getFilterOptions = (filter: ColumnFilter) => {
    if (filter.options) return filter.options

    // Auto-generate options for select type filters
    if (filter.type === 'select') {
      const column = table.getColumn(filter.columnId)
      const facetedValues = column?.getFacetedUniqueValues()
      if (facetedValues) {
        return Array.from(facetedValues.keys())
          .sort()
          .map(value => ({
            value: String(value),
            label: String(value)
          }))
      }
    }
    return []
  }

  const addNewFilter = () => {
    if (validColumnFilters.length > 0) {
      const newFilter: PendingFilter = {
        id: Date.now().toString(),
        columnId: validColumnFilters[0].columnId,
        value: '',
        operator: validColumnFilters[0].type === 'text' ? 'contains' : 'equals'
      }
      setPendingFilters(prev => [...prev, newFilter])
    }
  }

  const removeFilter = (filterId: string) => {
    setPendingFilters(prev => prev.filter(f => f.id !== filterId))
  }

  const updateFilter = (filterId: string, updates: Partial<PendingFilter>) => {
    setPendingFilters(prev => prev.map(filter => 
      filter.id === filterId 
        ? { ...filter, ...updates }
        : filter
    ))
  }

  const applyFilters = () => {
    // Convert pending filters to table filters, excluding empty ones
    const validPendingFilters = pendingFilters.filter(filter => 
      filter.value !== '' && filter.value !== null && filter.value !== undefined
    )
    
    const newTableFilters = validPendingFilters.map(filter => ({
      id: filter.columnId,
      value: filter.value
    }))
    
    table.setColumnFilters(newTableFilters)
    setIsOpen(false)
  }

  const clearAllFilters = () => {
    table.resetColumnFilters()
    // Reset to one empty filter
    if (validColumnFilters.length > 0) {
      setPendingFilters([{
        id: Date.now().toString(),
        columnId: validColumnFilters[0].columnId,
        value: '',
        operator: validColumnFilters[0].type === 'text' ? 'contains' : 'equals'
      }])
    } else {
      setPendingFilters([])
    }
  }

  const getColumnFilterConfig = (columnId: string) => {
    return validColumnFilters.find(f => f.columnId === columnId)
  }

  if (validColumnFilters.length === 0) {
    return null
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" disabled={isLoading}>
          <FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
          Filter
          {activeFilters.length > 0 && (
            <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
              {activeFilters.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-6" align="start">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground text-sm font-medium">
              Filters
            </div>
            {activeFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
              >
                Clear all
              </Button>
            )}
          </div>
          
          {/* Pending Filters */}
          {pendingFilters.map((filter) => {
            const columnFilter = getColumnFilterConfig(filter.columnId)
            if (!columnFilter) return null
            
            return (
              <div key={filter.id} className="flex items-center gap-3 p-4 rounded-lg border bg-muted/30">
                {/* Column Selector */}
                <Select
                  value={filter.columnId}
                  onValueChange={(value) => updateFilter(filter.id, { 
                    columnId: value, 
                    value: '', // Reset value when column changes
                    operator: validColumnFilters.find(f => f.columnId === value)?.type === 'text' ? 'contains' : 'equals'
                  })}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {validColumnFilters.map((cf) => (
                      <SelectItem key={cf.columnId} value={cf.columnId}>
                        {cf.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* Operator Selector */}
                <Select
                  value={filter.operator}
                  onValueChange={(value) => updateFilter(filter.id, { operator: value })}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {columnFilter.type === 'text' && (
                      <>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="startsWith">Starts with</SelectItem>
                        <SelectItem value="endsWith">Ends with</SelectItem>
                      </>
                    )}
                    {columnFilter.type === 'select' && (
                      <SelectItem value="equals">Equals</SelectItem>
                    )}
                    {columnFilter.type === 'number' && (
                      <>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="greaterThan">Greater than</SelectItem>
                        <SelectItem value="lessThan">Less than</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                
                {/* Value Input/Selector */}
                {columnFilter.type === 'select' && (
                  <Select
                    value={String(filter.value || '')}
                    onValueChange={(value) => updateFilter(filter.id, { value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select value..." />
                    </SelectTrigger>
                    <SelectContent>
                      {getFilterOptions(columnFilter).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                {(columnFilter.type === 'text' || columnFilter.type === 'number') && (
                  <Input
                    className="min-w-48 flex-1"
                    placeholder={columnFilter.placeholder || "Enter value..."}
                    value={String(filter.value || '')}
                    onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                    type={columnFilter.type}
                  />
                )}
                
                {/* Remove Filter Button (only show if more than one filter) */}
                {pendingFilters.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter(filter.id)}
                    className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <CircleXIcon className="h-4 w-4" />
                    <span className="sr-only">Remove filter</span>
                  </Button>
                )}
              </div>
            )
          })}
          
          {/* Add Filter Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={addNewFilter}
            className="w-full"
            disabled={pendingFilters.length >= validColumnFilters.length}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Filter
          </Button>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2 border-t">
            <Button
              variant="default"
              size="sm"
              onClick={applyFilters}
              className="flex-1"
            >
              <Check className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
