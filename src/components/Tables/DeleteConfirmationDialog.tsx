"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CircleAlertIcon, TrashIcon } from "lucide-react"

interface DeleteConfirmationDialogProps {
  children?: React.ReactNode // Custom trigger component
  title?: string
  description?: string
  onConfirm: () => void
  onCancel?: () => void
  disabled?: boolean
  // For bulk delete mode
  itemCount?: number
  itemName?: string // e.g., "row", "event", "user"
  // For single delete mode
  singleItem?: boolean
  triggerVariant?: "default" | "outline" | "ghost" | "destructive" | "secondary"
  triggerSize?: "default" | "sm" | "lg" | "icon"
  showIcon?: boolean
}

export function DeleteConfirmationDialog({
  children,
  title,
  description,
  onConfirm,
  onCancel,
  disabled = false,
  itemCount,
  itemName = "item",
  singleItem = false,
  triggerVariant = "outline",
  triggerSize = "default",
  showIcon = true,
}: DeleteConfirmationDialogProps) {
  // Generate default title and description based on props
  const defaultTitle = singleItem 
    ? `Delete ${itemName}?`
    : itemCount 
    ? `Delete ${itemCount} ${itemCount === 1 ? itemName : `${itemName}s`}?`
    : "Are you absolutely sure?"

  const defaultDescription = singleItem
    ? `This action cannot be undone. This will permanently delete this ${itemName}.`
    : itemCount
    ? `This action cannot be undone. This will permanently delete ${itemCount} selected ${itemCount === 1 ? itemName : `${itemName}s`}.`
    : "This action cannot be undone. This will permanently delete the selected items."

  const finalTitle = title || defaultTitle
  const finalDescription = description || defaultDescription

  // Default trigger button when no custom children provided
  const defaultTrigger = (
    <Button 
      variant={triggerVariant} 
      size={triggerSize}
      disabled={disabled}
      className={singleItem ? "text-destructive hover:text-destructive" : ""}
    >
      {showIcon && (
        <TrashIcon
          className="-ms-1 opacity-60"
          size={16}
          aria-hidden="true"
        />
      )}
      {singleItem ? "Delete" : "Delete"}
      {itemCount && itemCount > 0 && (
        <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          {itemCount}
        </span>
      )}
    </Button>
  )

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children || defaultTrigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>{finalTitle}</AlertDialogTitle>
            <AlertDialogDescription>{finalDescription}</AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
