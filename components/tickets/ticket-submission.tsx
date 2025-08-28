"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Ticket, Send, ArrowRight, AlertCircle } from "lucide-react"

const categories = [
  { value: "technical", label: "مشکل فنی" },
  { value: "reservation", label: "رزرو و اقامت" },
  { value: "complaint", label: "شکایت" },
  { value: "suggestion", label: "پیشنهاد" },
  { value: "other", label: "سایر" },
]

const priorities = [
  { value: "low", label: "کم" },
  { value: "medium", label: "متوسط" },
  { value: "high", label: "بالا" },
  { value: "urgent", label: "فوری" },
]

export function TicketSubmission() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "خطا",
        description: "لطفاً ابتدا وارد شوید",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // شبیه‌سازی ارسال تیکت
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "تیکت ارسال شد",
        description: "تیکت شما با موفقیت ثبت شد و در اسرع وقت پاسخ داده خواهد شد",
      })

      // ریست فرم
      setFormData({
        title: "",
        description: "",
        category: "",
        priority: "medium",
      })
    } catch (error) {
      toast({
        title: "خطا در ارسال",
        description: "لطفاً دوباره تلاش کنید",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <CardTitle>دسترسی محدود</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">برای ارسال تیکت، لطفاً ابتدا وارد حساب کاربری خود شوید</p>
            <Button asChild>
              <a href="/login">ورود به حساب کاربری</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* هدر */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Ticket className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ارسال تیکت پشتیبانی</h1>
        <p className="text-gray-600">مشکل یا درخواست خود را برای ما ارسال کنید تا در اسرع وقت پاسخ دهیم</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>فرم ارسال تیکت</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* اطلاعات کاربر */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label>نام کامل</Label>
                  <p className="text-lg font-medium">{user.fullName}</p>
                </div>
                <div>
                  <Label>شماره تماس</Label>
                  <p className="text-lg">{user.phone}</p>
                </div>
              </div>

              {/* عنوان تیکت */}
              <div>
                <Label htmlFor="title">عنوان تیکت *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="عنوان مختصری از مشکل یا درخواست خود بنویسید"
                  required
                />
              </div>

              {/* دسته‌بندی و اولویت */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">دسته‌بندی *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">اولویت</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* توضیحات */}
              <div>
                <Label htmlFor="description">توضیحات کامل *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="لطفاً مشکل یا درخواست خود را به طور کامل شرح دهید..."
                  rows={6}
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  هر چه توضیحات شما کامل‌تر باشد، پاسخ سریع‌تر و دقیق‌تری دریافت خواهید کرد
                </p>
              </div>

              {/* راهنمایی */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">نکات مهم:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• تیکت شما در اسرع وقت بررسی و پاسخ داده خواهد شد</li>
                  <li>• برای پیگیری تیکت، به بخش داشبورد مراجعه کنید</li>
                  <li>• در صورت فوری بودن موضوع، با شماره‌های تماس تماس بگیرید</li>
                </ul>
              </div>

              {/* دکمه ارسال */}
              <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
                {isSubmitting ? (
                  "در حال ارسال..."
                ) : (
                  <>
                    <Send className="w-4 h-4 ml-2" />
                    ارسال تیکت
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
