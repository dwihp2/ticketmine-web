"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  onSelect?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DatePicker({
  date,
  onSelect,
  placeholder = "Pick a date",
  disabled = false,
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

interface DateTimePickerProps {
  date?: Date
  onSelect?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DateTimePicker({
  date,
  onSelect,
  placeholder = "Pick a date and time",
  disabled = false,
  className,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false)

  // Extract date and time values from the prop
  const dateValue = date ? new Date(date.getFullYear(), date.getMonth(), date.getDate()) : undefined
  const timeValue = date ? format(date, "HH:mm") : ""

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate && timeValue) {
      // Combine the new date with existing time
      const [hours, minutes] = timeValue.split(':').map(Number)
      const combinedDate = new Date(newDate)
      combinedDate.setHours(hours, minutes)
      onSelect?.(combinedDate)
    } else if (newDate) {
      // Set default time to current time if no time is set
      const now = new Date()
      const combinedDate = new Date(newDate)
      combinedDate.setHours(now.getHours(), now.getMinutes())
      onSelect?.(combinedDate)
    } else {
      onSelect?.(undefined)
    }
    setOpen(false)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value
    if (dateValue && newTime) {
      const [hours, minutes] = newTime.split(':').map(Number)
      if (!isNaN(hours) && !isNaN(minutes)) {
        const combinedDate = new Date(dateValue)
        combinedDate.setHours(hours, minutes)
        onSelect?.(combinedDate)
      }
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <Label className="px-1">Date</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              className={cn(
                "w-full justify-between font-normal",
                !dateValue && "text-muted-foreground",
                className
              )}
            >
              {dateValue ? format(dateValue, "PPP") : placeholder}
              <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={dateValue}
              onSelect={handleDateSelect}
              captionLayout="dropdown"
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {dateValue && (
        <div className="flex flex-col gap-3 flex-shrink-0 w-full sm:w-32">
          <Label className="px-1">Time</Label>
          <Input
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
            disabled={disabled}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      )}
    </div>
  )
}
