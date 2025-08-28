"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Camera, Star, Upload } from "lucide-react"

export function InstantUserDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ارسال نظر */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              ارسال نظر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">نظر خود را درباره تجربه اقامت بنویسید</p>
            <Button className="w-full">
              <Star className="w-4 h-4 ml-2" />
              ثبت نظر جدید
            </Button>
          </CardContent>
        </Card>

        {/* آپلود عکس */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              اشتراک عکس
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">عکس‌های خود را با دیگران به اشتراک بگذارید</p>
            <Button className="w-full">
              <Upload className="w-4 h-4 ml-2" />
              آپلود عکس
            </Button>
          </CardContent>
        </Card>

        {/* نظرات من */}
        <Card>
          <CardHeader>
            <CardTitle>نظرات من</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">مشاهده و مدیریت نظرات ارسالی</p>
            <Button variant="outline" className="w-full bg-transparent">
              مشاهده نظرات
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
