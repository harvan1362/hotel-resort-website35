"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, Hotel, Calendar, DollarSign, TrendingUp, AlertCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const stats = [
  {
    title: "کل اتاق‌ها",
    value: "24",
    change: "+2",
    changeType: "positive" as const,
    icon: Hotel,
  },
  {
    title: "اتاق‌های اشغال",
    value: "18",
    change: "+5",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "درآمد امروز",
    value: "12,500,000",
    change: "+8%",
    changeType: "positive" as const,
    icon: DollarSign,
    suffix: "تومان",
  },
  {
    title: "نرخ اشغال",
    value: "75%",
    change: "+12%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
]

const recentReservations = [
  {
    id: "1",
    guestName: "احمد محمدی",
    room: "101",
    checkIn: "1404/5/20",
    checkOut: "1404/5/23",
    status: "confirmed" as const,
  },
  {
    id: "2",
    guestName: "فاطمه احمدی",
    room: "205",
    checkIn: "1404/5/21",
    checkOut: "1404/5/25",
    status: "pending" as const,
  },
  {
    id: "3",
    guestName: "علی رضایی",
    room: "301",
    checkIn: "1404/5/22",
    checkOut: "1404/5/24",
    status: "checked-in" as const,
  },
]

const alerts = [
  {
    type: "warning" as const,
    message: "3 کاربر در انتظار تایید",
    action: "مشاهده",
  },
  {
    type: "error" as const,
    message: "7 تیکت بدون پاسخ",
    action: "پاسخ",
  },
  {
    type: "info" as const,
    message: "اتاق 205 نیاز به تعمیر دارد",
    action: "بررسی",
  },
]

export function AdminOverview() {
  const router = useRouter()

  useEffect(() => {
    const seedGroupContent = () => {
      const groupContentData = {
        restaurant: [
          {
            id: "1",
            title: "کباب کوبیده",
            description: "کباب کوبیده تازه با برنج زعفرانی",
            price: "450000",
            category: "کباب",
            image: "/delicious-kebab.png",
            available: true,
          },
          {
            id: "2",
            title: "قورمه سبزی",
            description: "قورمه سبزی خانگی با گوشت تازه",
            price: "380000",
            category: "خورش",
            image: "/ghormeh-sabzi.png",
            available: true,
          },
          {
            id: "3",
            title: "ماهی شکم پر",
            description: "ماهی تازه جنوب با برنج هربی",
            price: "520000",
            category: "غذای دریایی",
            image: "/stuffed-fish.png",
            available: true,
          },
        ],
        fastfood: [
          {
            id: "1",
            title: "برگر کلاسیک",
            description: "برگر گوشت با پنیر و سبزیجات تازه",
            price: "180000",
            category: "برگر",
            image: "/classic-beef-burger.png",
            available: true,
          },
          {
            id: "2",
            title: "پیتزا مخصوص",
            description: "پیتزا با گوشت، قارچ و پنیر موزارلا",
            price: "320000",
            category: "پیتزا",
            image: "/delicious-pizza.png",
            available: true,
          },
        ],
        cafe: [
          {
            id: "1",
            title: "اسپرسو",
            description: "قهوه اسپرسو تازه دم",
            price: "45000",
            category: "نوشیدنی گرم",
            image: "/espresso-shot.png",
            available: true,
          },
          {
            id: "2",
            title: "کیک شکلاتی",
            description: "کیک شکلاتی خانگی با کرم",
            price: "85000",
            category: "شیرینی",
            image: "/decadent-chocolate-cake.png",
            available: true,
          },
        ],
        tour: [
          {
            id: "1",
            title: "ترانسفر فرودگاه عسلویه",
            description: "ترانسفر رفت و برگشت از فرودگاه عسلویه",
            price: "1200000",
            category: "ترانسفر",
            image: "/airport-transfer.png",
            available: true,
          },
          {
            id: "2",
            title: "تور ساحل مکسر",
            description: "تور گردشگری ساحل مکسر با راهنما",
            price: "850000",
            category: "تور گردشگری",
            image: "/maksar-beach-rocks.png",
            available: true,
          },
        ],
      }

      Object.keys(groupContentData).forEach((groupId) => {
        const existingData = localStorage.getItem(`groupContent_${groupId}`)
        if (!existingData) {
          localStorage.setItem(
            `groupContent_${groupId}`,
            JSON.stringify(groupContentData[groupId as keyof typeof groupContentData]),
          )
        }
      })
    }

    seedGroupContent()
  }, [])

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "new-room":
        router.push("/admin/rooms")
        break
      case "new-reservation":
        router.push("/admin/rooms")
        break
      case "new-user":
        router.push("/admin/users")
        break
      case "new-message":
        router.push("/admin/messages")
        break
      default:
        break
    }
  }

  const handleAlertAction = (type: string) => {
    switch (type) {
      case "pending-users":
        router.push("/admin/pending-users")
        break
      case "tickets":
        router.push("/admin/tickets")
        break
      case "maintenance":
        router.push("/admin/rooms")
        break
      default:
        break
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">داشبورد مدیریت</h1>
        <p className="text-gray-600">خلاصه‌ای از وضعیت فعلی مجتمع</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    {stat.suffix && <span className="text-sm text-gray-500">{stat.suffix}</span>}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-sm ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">از ماه گذشته</span>
                  </div>
                </div>
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>رزروهای اخیر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{reservation.guestName}</p>
                    <p className="text-sm text-gray-600">
                      اتاق {reservation.room} • {reservation.checkIn} تا {reservation.checkOut}
                    </p>
                  </div>
                  <Badge
                    variant={
                      reservation.status === "confirmed"
                        ? "default"
                        : reservation.status === "pending"
                          ? "secondary"
                          : "outline"
                    }
                    className={
                      reservation.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : reservation.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }
                  >
                    {reservation.status === "confirmed"
                      ? "تایید شده"
                      : reservation.status === "pending"
                        ? "در انتظار"
                        : "ورود"}
                  </Badge>
                </div>
              ))}
            </div>
            <Link href="/admin/rooms">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                مشاهده همه رزروها
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>هشدارها و اعلان‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    alert.type === "warning"
                      ? "bg-yellow-50 border border-yellow-200"
                      : alert.type === "error"
                        ? "bg-red-50 border border-red-200"
                        : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {alert.type === "warning" ? (
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    ) : alert.type === "error" ? (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-blue-600" />
                    )}
                    <span className="text-sm">{alert.message}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => {
                      if (index === 0) handleAlertAction("pending-users")
                      else if (index === 1) handleAlertAction("tickets")
                      else handleAlertAction("maintenance")
                    }}
                  >
                    {alert.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>دسترسی سریع</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => handleQuickAction("new-room")}
            >
              <Hotel className="w-6 h-6" />
              <span>اتاق جدید</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => handleQuickAction("new-reservation")}
            >
              <Calendar className="w-6 h-6" />
              <span>رزرو جدید</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => handleQuickAction("new-user")}
            >
              <Users className="w-6 h-6" />
              <span>کاربر جدید</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => handleQuickAction("new-message")}
            >
              <MessageSquare className="w-6 h-6" />
              <span>پیام جدید</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
