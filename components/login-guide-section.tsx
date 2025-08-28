"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, MessageCircle, Camera, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export function LoginGuideSection() {
  const [showForm, setShowForm] = useState<
    "instant-login" | "instant-register" | "system-login" | "system-register" | null
  >(null)
  const { login } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "رمز عبور باید حداقل ۶ کاراکتر باشد"
    }
    if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      return "رمز عبور باید شامل حروف و اعداد باشد"
    }
    return null
  }

  const validateUsername = (username: string) => {
    if (username.length < 3) {
      return "نام کاربری باید حداقل ۳ کاراکتر باشد"
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و _ باشد"
    }

    // چک کردن تکراری بودن نام کاربری (mock data)
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    if (existingUsers.some((user: any) => user.username === username)) {
      return "این نام کاربری قبلاً استفاده شده است"
    }

    return null
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return "فرمت ایمیل صحیح نیست"
    }
    return null
  }

  const validatePhone = (phone: string) => {
    if (!/^09\d{9}$/.test(phone)) {
      return "شماره تلفن باید با ۰۹ شروع شود و ۱۱ رقم باشد"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isLogin = showForm?.includes("login")
    const isInstant = showForm?.includes("instant")

    if (!isLogin) {
      // چک کردن فیلدهای خالی
      if (!formData.name.trim()) {
        toast({
          title: "خطا",
          description: "لطفاً نام و نام خانوادگی خود را وارد کنید",
          variant: "destructive",
        })
        return
      }

      if (!formData.username.trim()) {
        toast({
          title: "خطا",
          description: "لطفاً نام کاربری خود را وارد کنید",
          variant: "destructive",
        })
        return
      }

      // validation نام کاربری
      const usernameError = validateUsername(formData.username)
      if (usernameError) {
        toast({
          title: "خطا در نام کاربری",
          description: usernameError,
          variant: "destructive",
        })
        return
      }

      // validation ایمیل
      const emailError = validateEmail(formData.email)
      if (emailError) {
        toast({
          title: "خطا در ایمیل",
          description: emailError,
          variant: "destructive",
        })
        return
      }

      // validation شماره تلفن
      const phoneError = validatePhone(formData.phone)
      if (phoneError) {
        toast({
          title: "خطا در شماره تلفن",
          description: phoneError,
          variant: "destructive",
        })
        return
      }

      // validation رمز عبور
      const passwordError = validatePassword(formData.password)
      if (passwordError) {
        toast({
          title: "خطا در رمز عبور",
          description: passwordError,
          variant: "destructive",
        })
        return
      }

      // چک کردن تطابق رمز عبور
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "خطا در تکرار رمز عبور",
          description: "رمز عبور و تکرار آن یکسان نیستند",
          variant: "destructive",
        })
        return
      }
    }

    try {
      if (isInstant) {
        if (isLogin) {
          // ورود فوری
          const success = await login(formData.username, formData.password, "instant")
          if (success) {
            toast({
              title: "ورود موفق",
              description: "با موفقیت وارد شدید",
            })
            setShowForm(null)
            setFormData({ name: "", username: "", email: "", phone: "", password: "", confirmPassword: "" })
          } else {
            toast({
              title: "خطا در ورود",
              description: "نام کاربری یا رمز عبور اشتباه است. لطفاً دوباره تلاش کنید.",
              variant: "destructive",
            })
          }
        } else {
          const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
          const newUser = {
            id: Date.now(),
            name: formData.name,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            type: "instant",
            status: "active",
            createdAt: new Date().toISOString(),
          }

          existingUsers.push(newUser)
          localStorage.setItem("registeredUsers", JSON.stringify(existingUsers))

          toast({
            title: "ثبت‌نام موفق",
            description: "حساب شما با موفقیت ایجاد شد و فعال است. می‌توانید وارد شوید.",
          })
          setShowForm("instant-login")
          setFormData({ name: "", username: "", email: "", phone: "", password: "", confirmPassword: "" })
        }
      } else {
        if (isLogin) {
          // ورود سیستم
          const success = await login(formData.username, formData.password, "system")
          if (success) {
            toast({
              title: "ورود موفق",
              description: "با موفقیت وارد شدید",
            })
            setShowForm(null)
            setFormData({ name: "", username: "", email: "", phone: "", password: "", confirmPassword: "" })
          } else {
            toast({
              title: "خطا در ورود",
              description: "نام کاربری یا رمز عبور اشتباه است یا حساب شما هنوز تایید نشده است.",
              variant: "destructive",
            })
          }
        } else {
          const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
          const newUser = {
            id: Date.now(),
            name: formData.name,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            type: "system",
            status: "pending",
            createdAt: new Date().toISOString(),
          }

          existingUsers.push(newUser)
          localStorage.setItem("registeredUsers", JSON.stringify(existingUsers))

          toast({
            title: "درخواست ارسال شد",
            description: "درخواست ثبت‌نام شما ارسال شد. پس از تایید مدیر می‌توانید وارد شوید.",
          })
          setShowForm(null)
          setFormData({ name: "", username: "", email: "", phone: "", password: "", confirmPassword: "" })
        }
      }
    } catch (error) {
      toast({
        title: "خطا در سیستم",
        description: "مشکلی در ارسال اطلاعات رخ داد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      })
    }
  }

  if (showForm) {
    const isLogin = showForm.includes("login")
    const isInstant = showForm.includes("instant")

    return (
      <section id="login-guide-section" className="py-12 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{isInstant ? "ورود سریع" : "حساب کاربری کامل"}</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowForm(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <Label htmlFor="name">نام و نام خانوادگی *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="نام کامل خود را وارد کنید"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="username">نام کاربری *</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="حداقل ۳ کاراکتر، فقط حروف انگلیسی و اعداد"
                      required
                    />
                  </div>

                  {!isLogin && (
                    <>
                      <div>
                        <Label htmlFor="email">ایمیل *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="example@email.com"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">شماره تماس *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="09123456789"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <Label htmlFor="password">رمز عبور *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="حداقل ۶ کاراکتر شامل حروف و اعداد"
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div>
                      <Label htmlFor="confirmPassword">تکرار رمز عبور *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="رمز عبور را دوباره وارد کنید"
                        required
                      />
                    </div>
                  )}

                  <Button type="submit" className="w-full">
                    {isLogin ? "ورود" : "ثبت‌نام"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="login-guide-section" className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">راهنمای انتخاب نوع ورود</h2>
          <p className="text-lg text-gray-600 mb-6">بر اساس نیاز خود، مناسب‌ترین روش ورود را انتخاب کنید</p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-8 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Camera className="w-5 h-5 text-amber-600" />
            <span className="font-medium text-amber-800">
              لطفاً خاطرات زیبای خود را با ما به اشتراک بگذارید و عکس‌هایتان را آپلود کنید
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-2 border-green-200 hover:border-green-300 transition-all hover:shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">حساب کاربری کامل</h3>
              <p className="text-gray-600 mb-6">برای شرکا و کاربرانی که نیاز به خدمات کامل دارند</p>

              <div className="text-right space-y-3 mb-8 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span>رزرو اتاق و خدمات</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span>ارسال تیکت و پشتیبانی</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <span>نیاز به تایید مدیر</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowForm("system-login")}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  ورود کامل
                </Button>
                <Button
                  onClick={() => setShowForm("system-register")}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                >
                  ثبت‌نام کامل
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 hover:border-blue-300 transition-all hover:shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">ورود سریع</h3>
              <p className="text-gray-600 mb-6">برای کاربران عادی که می‌خواهند نظر و عکس به اشتراک بگذارند</p>

              <div className="text-right space-y-3 mb-8 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span>ارسال نظرات و امتیاز</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span>آپلود عکس و تجربه‌ها</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span>فعال‌سازی فوری</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowForm("instant-login")}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  ورود سریع
                </Button>
                <Button
                  onClick={() => setShowForm("instant-register")}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                >
                  ثبت‌نام سریع
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
