"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Building, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface SystemLoginFormProps {
  onBack: () => void
}

export function SystemLoginForm({ onBack }: SystemLoginFormProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
  })
  const { login, register, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      const success = await login(formData.username, formData.password)
      if (success) {
        toast({
          title: "ورود موفق",
          description: "خوش آمدید!",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "خطا در ورود",
          description: "نام کاربری یا رمز عبور اشتباه است",
          variant: "destructive",
        })
      }
    } else {
      const success = await register({
        username: formData.username,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        role: "system",
      })

      if (success) {
        toast({
          title: "درخواست ثبت‌نام ارسال شد",
          description: "حساب شما پس از تایید مدیر فعال خواهد شد",
        })
        router.push("/")
      } else {
        toast({
          title: "خطا در ثبت‌نام",
          description: "لطفاً دوباره تلاش کنید",
          variant: "destructive",
        })
      }
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
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Building className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">{isLogin ? "ورود سیستم" : "ثبت‌نام سیستم"}</CardTitle>
          </CardHeader>

          <CardContent>
            {!isLogin && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">نکته مهم:</p>
                    <p>حساب شما پس از بررسی و تایید مدیر فعال خواهد شد. این فرآیند معمولاً 24 ساعت زمان می‌برد.</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">نام کاربری</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>

              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="fullName">نام کامل</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">شماره موبایل</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="09123456789"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">ایمیل</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="password">رمز عبور</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "در حال پردازش..." : isLogin ? "ورود" : "ارسال درخواست"}
              </Button>
            </form>

            <div className="text-center mt-4">
              <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "حساب ندارید؟ ثبت‌نام کنید" : "حساب دارید؟ وارد شوید"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
