"use client"

import { useAuth } from "@/contexts/auth-context"
import { AdminDashboard } from "./admin-dashboard"
import { InstantUserDashboard } from "./instant-user-dashboard"
import { SystemUserDashboard } from "./system-user-dashboard"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function UserDashboard() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">دسترسی غیرمجاز</h1>
          <p className="text-gray-600 mb-4">لطفاً ابتدا وارد شوید</p>
          <Button asChild>
            <a href="/login">ورود</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* هدر داشبورد */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">داشبورد کاربری</h1>
              <p className="text-gray-600">خوش آمدید، {user.fullName}</p>
            </div>
            <Button variant="outline" onClick={logout}>
              <LogOut className="w-4 h-4 ml-2" />
              خروج
            </Button>
          </div>
        </div>
      </header>

      {/* محتوای داشبورد بر اساس نقش کاربر */}
      {user.role === "admin" && <AdminDashboard />}
      {user.role === "instant" && <InstantUserDashboard />}
      {user.role === "system" && <SystemUserDashboard />}
    </div>
  )
}
