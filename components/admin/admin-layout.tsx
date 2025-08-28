"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import {
  Hotel,
  Calendar,
  Users,
  MessageSquare,
  Settings,
  BarChart3,
  ImageIcon,
  FileText,
  MapPin,
  Menu,
  X,
  Home,
  Building,
  Ticket,
  UserCheck,
  LogOut,
  Info,
  Phone,
} from "lucide-react"

const menuItems = [
  {
    title: "داشبورد",
    href: "/admin",
    icon: Home,
  },
  {
    title: "نرم‌افزار هتل",
    icon: Hotel,
    children: [
      { title: "مدیریت اتاق‌ها", href: "/admin/rooms", icon: Building },
      { title: "مدیریت رزروها", href: "/admin/reservations", icon: Calendar },
      { title: "گزارش‌های مالی", href: "/admin/financial-reports", icon: BarChart3 },
      { title: "تنظیمات هتل", href: "/admin/hotel-settings", icon: Settings },
    ],
  },
  {
    title: "مدیریت کاربران",
    icon: Users,
    children: [
      { title: "کاربران در انتظار تایید", href: "/admin/pending-users", icon: UserCheck },
      { title: "مدیریت کاربران", href: "/admin/users", icon: Users },
      { title: "مدیریت گروه‌های دسترسی", href: "/admin/user-groups", icon: Settings },
    ],
  },
  {
    title: "تیکت و پیام‌ها",
    icon: MessageSquare,
    children: [
      { title: "صندوق تیکت‌ها", href: "/admin/tickets", icon: Ticket },
      { title: "صندوق پیام‌ها", href: "/admin/messages", icon: MessageSquare },
    ],
  },
  {
    title: "مدیریت محتوا",
    icon: Settings,
    children: [
      { title: "اطلاعات شرکت", href: "/admin/company-info", icon: Building },
      { title: "مدیریت گروه‌ها", href: "/admin/groups", icon: Menu },
      { title: "مدیریت اسلایدر", href: "/admin/slider", icon: ImageIcon },
      { title: "مدیریت خدمات", href: "/admin/services", icon: Settings },
      { title: "مدیریت اخبار", href: "/admin/news", icon: FileText },
      { title: "مدیریت جاذبه‌ها", href: "/admin/attractions", icon: MapPin },
      { title: "مدیریت درباره ما", href: "/admin/about", icon: Info },
      { title: "مدیریت اطلاعات تماس", href: "/admin/contact-info", icon: Phone },
      { title: "مدیریت فوتر", href: "/admin/footer-management", icon: Settings },
    ],
  },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* موبایل هدر */}
      <div className="lg:hidden bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">پنل مدیریت</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* سایدبار */}
        <aside
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-64 bg-white border-l transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
            sidebarOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">د</span>
              </div>
              <div>
                <h2 className="font-bold">پنل مدیریت</h2>
                <p className="text-sm text-gray-500">دریاکنار</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="hidden lg:flex">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <div>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => toggleExpanded(item.title)}>
                      <item.icon className="w-4 h-4 ml-2" />
                      {item.title}
                    </Button>
                    {expandedItems.includes(item.title) && (
                      <div className="mr-6 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "w-full justify-start text-sm",
                                pathname === child.href && "bg-blue-50 text-blue-600",
                              )}
                            >
                              <child.icon className="w-3 h-3 ml-2" />
                              {child.title}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn("w-full justify-start", pathname === item.href && "bg-blue-50 text-blue-600")}
                    >
                      <item.icon className="w-4 h-4 ml-2" />
                      {item.title}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* محتوای اصلی */}
        <main className="flex-1 lg:mr-64">
          <div className="p-6">{children}</div>
        </main>
      </div>

      {/* پس‌زمینه موبایل */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
