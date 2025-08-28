"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Settings, Shield } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface AdminLoginFormProps {
  onBack: () => void
}

export function AdminLoginForm({ onBack }: AdminLoginFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const success = await login(formData.username, formData.password)
    if (success) {
      toast({
        title: "ورود موفق",
        description: "به پنل مدیریت خوش آمدید",
      })
      router.push("/admin")
    } else {
      toast({
        title: "خطا در ورود",
        description: "نام کاربری یا رمز عبور اشتباه است",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">ورود مدیریت</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                <div className="text-sm text-purple-800">
                  <p className="font-medium mb-1">ورود محدود:</p>
                  <p>این بخش فقط برای مدیران و کارکنان مجاز است.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">نام کاربری</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="نام کاربری مدیریت"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">رمز عبور</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="رمز عبور"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? "در حال ورود..." : "ورود به پنل مدیریت"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
