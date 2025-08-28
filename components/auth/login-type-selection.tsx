"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MessageCircle, Info, ArrowRight } from "lucide-react"
import { InstantLoginForm } from "./instant-login-form"
import { SystemLoginForm } from "./system-login-form"
import Link from "next/link"

export function LoginTypeSelection() {
  const [selectedType, setSelectedType] = useState<"instant" | "system" | null>(null)

  if (selectedType === "instant") {
    return <InstantLoginForm onBack={() => setSelectedType(null)} />
  }

  if (selectedType === "system") {
    return <SystemLoginForm onBack={() => setSelectedType(null)} />
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        {/* دکمه بازگشت */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowRight className="w-4 h-4 ml-2" />
              بازگشت به صفحه اصلی
            </Link>
          </Button>
        </div>

        {/* هدر */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Info className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">راهنمای انتخاب نوع ورود</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">بر اساس نیاز خود، مناسب‌ترین روش ورود را انتخاب کنید</p>
        </div>

        {/* هشدار */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4 mb-8">
          <p className="text-orange-800 text-center">
            💡 لطفاً خاطرات زیبای خود را با ما به اشتراک بگذارید و عکس‌هایتان را آپلود کنید
          </p>
        </div>

        {/* گزینه‌های ورود */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* ورود سریع */}
          <Card className="border-2 border-blue-200 hover:border-blue-300 transition-all hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">ورود سریع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center mb-4 text-sm">
                برای کاربران عادی که می‌خواهند نظر و عکس به اشتراک بگذارند
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>ارسال نظرات و امتیاز</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>آپلود عکس و تجربه‌ها</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>فعال‌سازی فوری</span>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  onClick={() => setSelectedType("instant")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  ثبت‌نام سریع
                </Button>
                <Button onClick={() => setSelectedType("instant")} variant="outline" className="w-full" size="lg">
                  ورود سریع
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* حساب کاربری کامل */}
          <Card className="border-2 border-green-200 hover:border-green-300 transition-all hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">حساب کاربری کامل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center mb-4 text-sm">برای شرکا و کاربرانی که نیاز به خدمات کامل دارند</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>رزرو اتاق و خدمات</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>ارسال تیکت و پشتیبانی</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>نیاز به تایید مدیر</span>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  onClick={() => setSelectedType("system")}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  ثبت‌نام کامل
                </Button>
                <Button onClick={() => setSelectedType("system")} variant="outline" className="w-full" size="lg">
                  ورود کامل
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
