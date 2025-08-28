"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Building, Save, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ImageIcon } from "lucide-react"

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

export function CompanyInfoManagement() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const iconInputRef = useRef<HTMLInputElement>(null)

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: "مجتمع تفریحی اقامتی دریاکنار",
    ownerName: "احمد محمدی",
    managerName: "علی رضایی",
    slogan: "تجربه‌ای فراموش‌نشدنی در کنار دریا",
    phone: "09123456789",
    landline: "07642247006",
    address: "هرمزگان، شهرستان بندر مقام، ساحلی",
    registrationCode: "123456789",
    economicCode: "987654321",
    logo: "",
    icon: "",
  })

  useEffect(() => {
    const savedCompanyInfo = localStorage.getItem("companyInfo")
    if (savedCompanyInfo) {
      try {
        const parsedInfo = JSON.parse(savedCompanyInfo)
        setCompanyInfo(parsedInfo)
      } catch (error) {
        console.error("Error parsing company info:", error)
      }
    }
  }, [])

  const handleInputChange = (field: keyof CompanyInfo, value: string) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileSelect = (type: "logo" | "icon") => {
    const input = type === "logo" ? logoInputRef.current : iconInputRef.current
    if (input) {
      input.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "logo" | "icon") => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setCompanyInfo((prev) => ({ ...prev, [type]: result }))
        toast({
          title: "موفق",
          description: `${type === "logo" ? "لوگو" : "آیکون"} با موفقیت انتخاب شد`,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // شبیه‌سازی ذخیره در بک‌اند
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // ذخیره در localStorage برای نمایش در سایت
      localStorage.setItem("companyInfo", JSON.stringify(companyInfo))

      toast({
        title: "موفق",
        description: "اطلاعات شرکت با موفقیت ذخیره شد و در سایت اعمال خواهد شد",
      })
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در ذخیره اطلاعات",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowRight className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Building className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold">اطلاعات شرکت</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* اطلاعات اصلی */}
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات اصلی</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">نام شرکت</Label>
              <Input
                id="companyName"
                value={companyInfo.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                placeholder="نام شرکت را وارد کنید"
              />
            </div>

            <div>
              <Label htmlFor="ownerName">نام مالک</Label>
              <Input
                id="ownerName"
                value={companyInfo.ownerName}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
                placeholder="نام مالک را وارد کنید"
              />
            </div>

            <div>
              <Label htmlFor="managerName">نام مدیر</Label>
              <Input
                id="managerName"
                value={companyInfo.managerName}
                onChange={(e) => handleInputChange("managerName", e.target.value)}
                placeholder="نام مدیر را وارد کنید"
              />
            </div>

            <div>
              <Label htmlFor="slogan">شعار</Label>
              <Input
                id="slogan"
                value={companyInfo.slogan}
                onChange={(e) => handleInputChange("slogan", e.target.value)}
                placeholder="شعار شرکت را وارد کنید"
              />
            </div>
          </CardContent>
        </Card>

        {/* اطلاعات تماس */}
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات تماس</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone">شماره موبایل</Label>
              <Input
                id="phone"
                value={companyInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="09123456789"
              />
            </div>

            <div>
              <Label htmlFor="landline">شماره ثابت</Label>
              <Input
                id="landline"
                value={companyInfo.landline}
                onChange={(e) => handleInputChange("landline", e.target.value)}
                placeholder="076-42247006"
              />
            </div>

            <div>
              <Label htmlFor="address">آدرس</Label>
              <Textarea
                id="address"
                value={companyInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="آدرس کامل را وارد کنید"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* اطلاعات قانونی */}
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات قانونی</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="registrationCode">کد ثبت</Label>
              <Input
                id="registrationCode"
                value={companyInfo.registrationCode}
                onChange={(e) => handleInputChange("registrationCode", e.target.value)}
                placeholder="کد ثبت شرکت"
              />
            </div>

            <div>
              <Label htmlFor="economicCode">کد اقتصادی</Label>
              <Input
                id="economicCode"
                value={companyInfo.economicCode}
                onChange={(e) => handleInputChange("economicCode", e.target.value)}
                placeholder="کد اقتصادی شرکت"
              />
            </div>
          </CardContent>
        </Card>

        {/* لوگو و آیکون */}
        <Card>
          <CardHeader>
            <CardTitle>لوگو و آیکون</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>لوگو شرکت</Label>
              <div className="flex items-center gap-2">
                <Input value={companyInfo.logo ? "فایل انتخاب شده" : ""} placeholder="لوگو انتخاب نشده" readOnly />
                <Button type="button" variant="outline" size="icon" onClick={() => handleFileSelect("logo")}>
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "logo")}
                className="hidden"
              />
              {companyInfo.logo && (
                <div className="mt-2">
                  <img
                    src={companyInfo.logo || "/placeholder.svg"}
                    alt="لوگو"
                    className="w-16 h-16 object-contain border rounded"
                  />
                </div>
              )}
            </div>

            <div>
              <Label>آیکون شرکت</Label>
              <div className="flex items-center gap-2">
                <Input value={companyInfo.icon ? "فایل انتخاب شده" : ""} placeholder="آیکون انتخاب نشده" readOnly />
                <Button type="button" variant="outline" size="icon" onClick={() => handleFileSelect("icon")}>
                  <ImageIcon className="w-4 h-4" />
                </Button>
              </div>
              <input
                ref={iconInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "icon")}
                className="hidden"
              />
              {companyInfo.icon && (
                <div className="mt-2">
                  <img
                    src={companyInfo.icon || "/placeholder.svg"}
                    alt="آیکون"
                    className="w-8 h-8 object-contain border rounded"
                  />
                </div>
              )}
            </div>

            {/* پیش‌نمایش */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">پیش‌نمایش:</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center overflow-hidden">
                  {companyInfo.icon ? (
                    <img
                      src={companyInfo.icon || "/placeholder.svg"}
                      alt="آیکون"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-white font-bold text-sm">د</span>
                  )}
                </div>
                <span className="font-bold text-sm">{companyInfo.companyName}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* دکمه ذخیره */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 ml-2" />
          {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </div>
    </div>
  )
}
