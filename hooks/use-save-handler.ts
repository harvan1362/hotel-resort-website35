"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const DEFAULT_ERROR_MESSAGE = "خطا در ذخیره تغییرات"

export function useSaveHandler() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const save = async (
    key: string,
    data: unknown,
    successMessage: string,
    errorMessage: string = DEFAULT_ERROR_MESSAGE,
  ) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem(key, JSON.stringify(data))
      toast({
        title: "موفق",
        description: successMessage,
      })
    } catch (error) {
      toast({
        title: "خطا",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, save }
}
