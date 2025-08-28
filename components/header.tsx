"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface CompanyInfo {
  companyName: string
  ownerName: string
  managerName: string
  slogan: string
  phone: string
  landline: string
  address: string
  registrationCode: string
  economicCode: string
  logo: string
  icon: string
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [companyInfo, setCompanyInfo] = useLocalStorage<CompanyInfo>("companyInfo", {
    companyName: "مجتمع اقامتی دریاکنار",
    ownerName: "",
    managerName: "",
    slogan: "",
    phone: "",
    landline: "",
    address: "",
    registrationCode: "",
    economicCode: "",
    logo: "",
    icon: "",
  })
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleStorageUpdate = (event: CustomEvent) => {
      setCompanyInfo(event.detail)
    }

    window.addEventListener(`localStorage-companyInfo` as any, handleStorageUpdate)

    return () => {
      window.removeEventListener(`localStorage-companyInfo` as any, handleStorageUpdate)
    }
  }, [setCompanyInfo])

  const menuItems = [
    { href: "/", label: "خانه" },
    { href: "/about", label: "درباره ما" },
  ]

  const userMenuItems = user
    ? [...menuItems, { href: "/dashboard", label: "داشبورد" }, { href: "/tickets", label: "تیکت‌ها" }]
    : menuItems

  const scrollToLoginGuide = () => {
    const loginGuideElement = document.getElementById("login-guide-section")
    if (loginGuideElement) {
      loginGuideElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* لوگو */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center overflow-hidden">
              {companyInfo.logo ? (
                <img
                  src={companyInfo.logo || "/placeholder.svg"}
                  alt="لوگو شرکت"
                  className="w-full h-full object-contain"
                />
              ) : companyInfo.icon ? (
                <img
                  src={companyInfo.icon || "/placeholder.svg"}
                  alt="آیکون شرکت"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-white font-bold text-lg">د</span>
              )}
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:block">{companyInfo.companyName}</span>
            <span className="font-bold text-lg text-gray-900 sm:hidden">دریاکنار</span>
          </Link>

          {/* منوی دسکتاپ */}
          <nav className="hidden md:flex items-center gap-8">
            {userMenuItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-gray-700 hover:text-blue-600 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* دکمه‌های عمل */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">سلام، {user.name}</span>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 ml-2" />
                  خروج
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/admin-login">ورود کارکنان</Link>
                </Button>
                <Button variant="default" onClick={scrollToLoginGuide}>
                  ورود کاربران
                </Button>
              </>
            )}
          </div>

          {/* دکمه منوی موبایل */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* منوی موبایل */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              {userMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t">
                {user ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 py-2">سلام، {user.name}</div>
                    <Button variant="outline" onClick={logout} className="w-full bg-transparent">
                      <LogOut className="w-4 h-4 ml-2" />
                      خروج
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link href="/admin-login">ورود کارکنان</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        setIsMenuOpen(false)
                        scrollToLoginGuide()
                      }}
                    >
                      ورود کاربران
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
