"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

type DateCustomProps = {
  value?: Date
  onValueChange?: (date?: Date) => void
  disabled?: boolean
  dateDisabled?: (date: Date) => boolean
  placeholder?: string
  formatPattern?: string
  id?: string
  buttonClassName?: string
  initialFocus?: boolean
  defaultMonth?: Date
  numberOfMonths?: number
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">

export default function DateCustom({
  className,
  value,
  onValueChange,
  disabled,
  dateDisabled,
  placeholder = "Pick a date",
  formatPattern = "LLL dd, y",
  id = "date",
  buttonClassName,
  initialFocus,
  defaultMonth,
  numberOfMonths = 1,
}: DateCustomProps) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value
  )

  const selectedDate = value ?? internalDate

  const handleSelect = (next?: Date) => {
    if (onValueChange) onValueChange(next)
    else setInternalDate(next)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground",
              buttonClassName
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, formatPattern)
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          data-slot="popover-content"
          className="w-auto p-0 rounded-2xl bg-white border-none overflow-visible shadow-[0_3px_10px_rgba(17,24,39,0.06),0_-2px_8px_rgba(17,24,39,0.04),3px_0_8px_rgba(17,24,39,0.04),-3px_0_8px_rgba(17,24,39,0.04)]"
          align="start"
        >
          <Calendar
            autoFocus={initialFocus}
            mode="single"
            defaultMonth={selectedDate ?? defaultMonth}
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={dateDisabled}
            numberOfMonths={numberOfMonths}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}