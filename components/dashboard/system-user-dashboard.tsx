"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageSquare, CreditCard, Clock } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function SystemUserDashboard() {
  const { user } = useAuth()

  if (user?.status === "pending") {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <CardTitle>در انتظار تایید</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              حساب شما در انتظار تایید مدیر است. پس از تایید، می‌توانید از تمام امکانات استفاده کنید.
            </p>
            <Badge variant="secondary">وضعیت: در انتظار تایید</Badge>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* رزرو اتاق */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              رزرو اتاق
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">رزرو اتاق برای اقامت در مجتمع</p>
            <Button className="w-full">رزرو جدید</Button>
          </CardContent>
        </Card>

        {/* درخواست خدمات */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              درخواست خدمات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">درخواست خدمات اضافی و امکانات</p>
            <Button className="w-full">درخواست جدید</Button>
          </CardContent>
        </Card>

        {/* پیام‌ها */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              پیام‌ها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">مکاتبات با مدیریت مجتمع</p>
            <Button variant="outline" className="w-full bg-transparent">
              مشاهده پیام‌ها
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
