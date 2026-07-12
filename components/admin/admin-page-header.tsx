"use client"

import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface AdminPageHeaderProps {
  icon: LucideIcon
  title: string
}

export function AdminPageHeader({ icon: Icon, title }: AdminPageHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ArrowRight className="w-5 h-5" />
      </Button>
      <div className="flex items-center gap-2">
        <Icon className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    </div>
  )
}
