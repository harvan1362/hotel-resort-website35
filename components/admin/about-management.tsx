"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, FileText, Save, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface AboutInfo {
  title: string
  subtitle: string
  description: string
  mission: string
  vision: string
  values: string[]
  history: string
  achievements: string[]
  teamDescription: string
  contactInfo: string
  images: string[]
}

export function AboutManagement() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [aboutInfo, setAboutInfo] = useState<AboutInfo>({
    title: "درباره مجتمع تفریحی اقامتی دریاکنار بندر مقام",
    subtitle: "تجربه‌ای فراموش‌نشدنی در قلب طبیعت ساحلی",
    description:
      "مجتمع تفریحی اقامتی دریاکنار بندر مقام با امکانات کامل و خدمات درجه یک، مکانی ایده‌آل برای تفریح، استراحت و اقامت خانواده‌ها و گردشگران است.",
    mission: "ارائه بهترین خدمات گردشگری و اقامتی با رعایت استانداردهای بین‌المللی کیفیت",
    vision: "تبدیل شدن به برترین مقصد گردشگری ساحلی در منطقه خلیج فارس",
    values: ["کیفیت در ارائه خدمات", "احترام به محیط زیست", "رضایت مشتریان", "نوآوری و خلاقیت", "مسئولیت اجتماعی"],
    history:
      "مجتمع دریاکنار بندر مقام در سال ۱۴۰۰ با هدف ارائه خدمات گردشگری مطلوب تأسیس شد و تاکنون میزبان هزاران گردشگر داخلی و خارجی بوده است.",
    achievements: [
      "دریافت گواهینامه کیفیت ISO 9001",
      "برنده جایزه بهترین مجتمع گردشگری سال ۱۴۰۲",
      "رضایت ۹۵ درصدی مشتریان",
      "عضویت در انجمن هتل‌داران ایران",
    ],
    teamDescription:
      "تیم ما متشکل از متخصصان مجرب در زمینه گردشگری، هتل‌داری و خدمات مشتریان است که با تعهد کامل در خدمت شما عزیزان هستند.",
    contactInfo: "برای کسب اطلاعات بیشتر و رزرو، با ما در تماس باشید.",
    images: [],
  })

  // بارگذاری داده‌ها از localStorage
  useEffect(() => {
    const savedAboutInfo = localStorage.getItem("aboutInfo")
    if (savedAboutInfo) {
      setAboutInfo(JSON.parse(savedAboutInfo))
    }
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem("aboutInfo", JSON.stringify(aboutInfo))

      toast({
        title: "موفق",
        description: "اطلاعات درباره ما ذخیره شد",
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

  const handleAddValue = () => {
    setAboutInfo({
      ...aboutInfo,
      values: [...aboutInfo.values, ""],
    })
  }

  const handleUpdateValue = (index: number, value: string) => {
    const newValues = [...aboutInfo.values]
    newValues[index] = value
    setAboutInfo({
      ...aboutInfo,
      values: newValues,
    })
  }

  const handleRemoveValue = (index: number) => {
    setAboutInfo({
      ...aboutInfo,
      values: aboutInfo.values.filter((_, i) => i !== index),
    })
  }

  const handleAddAchievement = () => {
    setAboutInfo({
      ...aboutInfo,
      achievements: [...aboutInfo.achievements, ""],
    })
  }

  const handleUpdateAchievement = (index: number, achievement: string) => {
    const newAchievements = [...aboutInfo.achievements]
    newAchievements[index] = achievement
    setAboutInfo({
      ...aboutInfo,
      achievements: newAchievements,
    })
  }

  const handleRemoveAchievement = (index: number) => {
    setAboutInfo({
      ...aboutInfo,
      achievements: aboutInfo.achievements.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowRight className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold">مدیریت درباره ما</h1>
        </div>
      </div>

      <div className="grid gap-6">
        {/* اطلاعات اصلی */}
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات اصلی</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">عنوان اصلی</Label>
              <Input
                id="title"
                value={aboutInfo.title}
                onChange={(e) => setAboutInfo({ ...aboutInfo, title: e.target.value })}
                placeholder="عنوان صفحه درباره ما"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">زیرعنوان</Label>
              <Input
                id="subtitle"
                value={aboutInfo.subtitle}
                onChange={(e) => setAboutInfo({ ...aboutInfo, subtitle: e.target.value })}
                placeholder="زیرعنوان توضیحی"
              />
            </div>
            <div>
              <Label htmlFor="description">توضیحات کلی</Label>
              <Textarea
                id="description"
                value={aboutInfo.description}
                onChange={(e) => setAboutInfo({ ...aboutInfo, description: e.target.value })}
                placeholder="توضیحات کلی درباره مجتمع"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* ماموریت و چشم‌انداز */}
        <Card>
          <CardHeader>
            <CardTitle>ماموریت و چشم‌انداز</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="mission">ماموریت</Label>
              <Textarea
                id="mission"
                value={aboutInfo.mission}
                onChange={(e) => setAboutInfo({ ...aboutInfo, mission: e.target.value })}
                placeholder="ماموریت سازمان"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="vision">چشم‌انداز</Label>
              <Textarea
                id="vision"
                value={aboutInfo.vision}
                onChange={(e) => setAboutInfo({ ...aboutInfo, vision: e.target.value })}
                placeholder="چشم‌انداز سازمان"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* ارزش‌ها */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              ارزش‌های سازمانی
              <Button onClick={handleAddValue} size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 ml-1" />
                افزودن ارزش
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aboutInfo.values.map((value, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={value}
                  onChange={(e) => handleUpdateValue(index, e.target.value)}
                  placeholder="ارزش سازمانی"
                />
                <Button variant="outline" size="sm" onClick={() => handleRemoveValue(index)}>
                  حذف
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* تاریخچه */}
        <Card>
          <CardHeader>
            <CardTitle>تاریخچه</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="history">تاریخچه سازمان</Label>
              <Textarea
                id="history"
                value={aboutInfo.history}
                onChange={(e) => setAboutInfo({ ...aboutInfo, history: e.target.value })}
                placeholder="تاریخچه و سوابق سازمان"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* دستاوردها */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              دستاوردها و افتخارات
              <Button onClick={handleAddAchievement} size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 ml-1" />
                افزودن دستاورد
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aboutInfo.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={achievement}
                  onChange={(e) => handleUpdateAchievement(index, e.target.value)}
                  placeholder="دستاورد یا افتخار"
                />
                <Button variant="outline" size="sm" onClick={() => handleRemoveAchievement(index)}>
                  حذف
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* تیم و اطلاعات تماس */}
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات تکمیلی</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="teamDescription">معرفی تیم</Label>
              <Textarea
                id="teamDescription"
                value={aboutInfo.teamDescription}
                onChange={(e) => setAboutInfo({ ...aboutInfo, teamDescription: e.target.value })}
                placeholder="معرفی تیم و کارکنان"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="contactInfo">اطلاعات تماس</Label>
              <Textarea
                id="contactInfo"
                value={aboutInfo.contactInfo}
                onChange={(e) => setAboutInfo({ ...aboutInfo, contactInfo: e.target.value })}
                placeholder="اطلاعات تماس و راه‌های ارتباطی"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* دکمه ذخیره */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 ml-2" />
            {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </Button>
        </div>
      </div>
    </div>
  )
}
