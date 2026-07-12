"use client"

import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SaveButtonProps {
  onClick: () => void
  isLoading: boolean
  className?: string
  label?: string
  loadingLabel?: string
}

export function SaveButton({
  onClick,
  isLoading,
  className = "bg-blue-600 hover:bg-blue-700",
  label = "ذخیره تغییرات",
  loadingLabel = "در حال ذخیره...",
}: SaveButtonProps) {
  return (
    <div className="flex justify-end">
      <Button onClick={onClick} disabled={isLoading} className={className}>
        <Save className="w-4 h-4 ml-2" />
        {isLoading ? loadingLabel : label}
      </Button>
    </div>
  )
}
