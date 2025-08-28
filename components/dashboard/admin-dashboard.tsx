"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Ticket, Settings, Hotel, BarChart3, UserCheck, AlertCircle } from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">کاربران فعال</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">تیکت‌های باز</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <Ticket className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">پیام‌های جدید</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">در انتظار تایید</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <UserCheck className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* منوی اصلی */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* نرم‌افزار هتل */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hotel className="w-5 h-5" />
              نرم‌افزار هتل
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              مدیریت اتاق‌ها
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              مدیریت رزروها
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              گزارش‌های مالی
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              تنظیمات هتل
            </Button>
          </CardContent>
        </Card>

        {/* مدیریت کاربران */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              مدیریت کاربران
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <UserCheck className="w-4 h-4 ml-2" />
              کاربران در انتظار تایید
              <Badge className="mr-auto bg-red-100 text-red-800">3</Badge>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              لیست تمام کاربران
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              مدیریت نقش‌ها
            </Button>
          </CardContent>
        </Card>

        {/* سیستم تیکت و پیام */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              تیکت و پیام‌ها
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Ticket className="w-4 h-4 ml-2" />
              صندوق تیکت‌ها
              <Badge className="mr-auto bg-orange-100 text-orange-800">7</Badge>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <MessageSquare className="w-4 h-4 ml-2" />
              صندوق پیام‌ها
              <Badge className="mr-auto bg-green-100 text-green-800">12</Badge>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              تنظیمات پیام‌رسانی
            </Button>
          </CardContent>
        </Card>

        {/* مدیریت محتوا */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              مدیریت محتوای سایت
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              اطلاعات شرکت
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              مدیریت اسلایدر
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              مدیریت خدمات
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              مدیریت اخبار
            </Button>
          </CardContent>
        </Card>

        {/* گزارش‌ها */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              گزارش‌ها و آمار
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              آمار بازدید
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              گزارش رزروها
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              آمار کاربران
            </Button>
          </CardContent>
        </Card>

        {/* هشدارها */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              هشدارها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">3 کاربر در انتظار تایید</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm">7 تیکت بدون پاسخ</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
