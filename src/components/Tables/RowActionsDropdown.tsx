"use client"

import { Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog'
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Copy, 
  Trash2, 
  Archive,
  Download,
  Share,
  Star
} from 'lucide-react'

export interface RowAction<TData = unknown> {
  label: string
  icon?: React.ReactNode
  onClick: (row: Row<TData>) => void
  variant?: 'default' | 'destructive'
  showSeparatorAfter?: boolean
  disabled?: (row: Row<TData>) => boolean
}

export interface RowActionsDropdownProps<TData> {
  row: Row<TData>
  actions?: RowAction<TData>[]
  // Common action shortcuts
  onView?: (row: Row<TData>) => void
  onEdit?: (row: Row<TData>) => void
  onCopy?: (row: Row<TData>) => void
  onDelete?: (row: Row<TData>) => void
  onArchive?: (row: Row<TData>) => void
  onDownload?: (row: Row<TData>) => void
  onShare?: (row: Row<TData>) => void
  onToggleFavorite?: (row: Row<TData>) => void
  // Delete configuration
  deleteItemName?: string // e.g., "event", "user", "record"
  deleteTitle?: string
  deleteDescription?: string
  // UI configuration
  triggerSize?: "default" | "sm" | "lg" | "icon"
  align?: "start" | "center" | "end"
}

export function RowActionsDropdown<TData>({
  row,
  actions,
  onView,
  onEdit,
  onCopy,
  onDelete,
  onArchive,
  onDownload,
  onShare,
  onToggleFavorite,
  deleteItemName = "item",
  deleteTitle,
  deleteDescription,
  triggerSize = "sm",
  align = "end",
}: RowActionsDropdownProps<TData>) {
  // Build default actions based on provided handlers
  const defaultActions: RowAction<TData>[] = []

  if (onView) {
    defaultActions.push({
      label: "View",
      icon: <Eye className="mr-2 h-4 w-4" />,
      onClick: onView,
    })
  }

  if (onEdit) {
    defaultActions.push({
      label: "Edit",
      icon: <Edit className="mr-2 h-4 w-4" />,
      onClick: onEdit,
    })
  }

  if (onCopy) {
    defaultActions.push({
      label: "Duplicate",
      icon: <Copy className="mr-2 h-4 w-4" />,
      onClick: onCopy,
    })
  }

  if (onDownload) {
    defaultActions.push({
      label: "Download",
      icon: <Download className="mr-2 h-4 w-4" />,
      onClick: onDownload,
    })
  }

  if (onShare) {
    defaultActions.push({
      label: "Share",
      icon: <Share className="mr-2 h-4 w-4" />,
      onClick: onShare,
    })
  }

  if (onToggleFavorite) {
    defaultActions.push({
      label: "Toggle Favorite",
      icon: <Star className="mr-2 h-4 w-4" />,
      onClick: onToggleFavorite,
    })
  }

  // Add separator before destructive actions
  if (onArchive || onDelete) {
    if (defaultActions.length > 0) {
      defaultActions[defaultActions.length - 1].showSeparatorAfter = true
    }
  }

  if (onArchive) {
    defaultActions.push({
      label: "Archive",
      icon: <Archive className="mr-2 h-4 w-4" />,
      onClick: onArchive,
    })
  }

  if (onDelete) {
    defaultActions.push({
      label: "Delete",
      icon: <Trash2 className="mr-2 h-4 w-4" />,
      onClick: onDelete,
      variant: 'destructive',
    })
  }

  // Combine custom actions with default actions
  const allActions = [...(actions || []), ...defaultActions]

  if (allActions.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={triggerSize} 
          className={triggerSize === "icon" ? "h-8 w-8 p-0" : ""}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {allActions.map((action, index) => {
          const isDisabled = action.disabled ? action.disabled(row) : false
          
          return (
            <div key={index}>
              {action.variant === 'destructive' && action.label === 'Delete' && onDelete ? (
                <DeleteConfirmationDialog
                  singleItem
                  itemName={deleteItemName}
                  title={deleteTitle}
                  description={deleteDescription}
                  onConfirm={() => action.onClick(row)}
                  triggerSize="sm"
                  triggerVariant="ghost"
                  showIcon={false}
                >
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive w-full cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                  >
                    {action.icon}
                    {action.label}
                  </DropdownMenuItem>
                </DeleteConfirmationDialog>
              ) : (
                <DropdownMenuItem
                  onClick={() => action.onClick(row)}
                  disabled={isDisabled}
                  className={action.variant === 'destructive' ? 'text-destructive focus:text-destructive' : ''}
                >
                  {action.icon}
                  {action.label}
                </DropdownMenuItem>
              )}
              {action.showSeparatorAfter && <DropdownMenuSeparator />}
            </div>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Export some common action configurations for reuse  
export const createCommonActions = {
  view: <TData,>(onView: (row: Row<TData>) => void): RowAction<TData> => ({
    label: "View",
    icon: <Eye className="mr-2 h-4 w-4" />,
    onClick: onView,
  }),
  
  edit: <TData,>(onEdit: (row: Row<TData>) => void): RowAction<TData> => ({
    label: "Edit",
    icon: <Edit className="mr-2 h-4 w-4" />,
    onClick: onEdit,
  }),
  
  duplicate: <TData,>(onDuplicate: (row: Row<TData>) => void): RowAction<TData> => ({
    label: "Duplicate",
    icon: <Copy className="mr-2 h-4 w-4" />,
    onClick: onDuplicate,
  }),
  
  delete: <TData,>(onDelete: (row: Row<TData>) => void): RowAction<TData> => ({
    label: "Delete",
    icon: <Trash2 className="mr-2 h-4 w-4" />,
    onClick: onDelete,
    variant: 'destructive',
    showSeparatorAfter: true,
  }),
}
