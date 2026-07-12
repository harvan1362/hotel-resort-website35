"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Plus, Trash2, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { useSaveHandler } from "@/hooks/use-save-handler"
import { SaveButton } from "@/components/admin/save-button"

interface SlideItem {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  order: number
  active: boolean
}

export function SliderManagement() {
  const { toast } = useToast()
  const { isLoading, save } = useSaveHandler()
  const [editingId, setEditingId] = useState<string | null>(null)

  const [slides, setSlides] = useState<SlideItem[]>([
    {
      id: "1",
      title: "مجتمع تفریحی اقامتی دریاکنار",
      subtitle: "تجربه‌ای فراموش‌نشدنی در کنار دریا",
      description: "لذت اقامت در قلب طبیعت ساحلی هرمزگان با امکانات رفاهی کامل و خدمات درجه یک",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-ozokTrFlObkXXfxpEDsZXZC94GkBXr.png",
      order: 1,
      active: true,
    },
    {
      id: "2",
      title: "اقامت لوکس در کنار خلیج فارس",
      subtitle: "آرامش و زیبایی در یک مکان",
      description: "اتاق‌های مجهز با نمای دریا، رستوران‌های متنوع و امکانات تفریحی بی‌نظیر",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-jMmiqgUEKRiI7EB2uDIfD35w33pvpQ.png",
      order: 2,
      active: true,
    },
  ])

  const [newSlide, setNewSlide] = useState<Partial<SlideItem>>({
    title: "",
    subtitle: "",
    description: "",
    image: "",
  })

  const handleAddSlide = () => {
    if (!newSlide.title || !newSlide.subtitle || !newSlide.image) {
      toast({
        title: "خطا",
        description: "لطفاً تمام فیلدهای ضروری را پر کنید",
        variant: "destructive",
      })
      return
    }

    const slide: SlideItem = {
      id: Date.now().toString(),
      title: newSlide.title!,
      subtitle: newSlide.subtitle!,
      description: newSlide.description || "",
      image: newSlide.image!,
      order: slides.length + 1,
      active: true,
    }

    setSlides([...slides, slide])
    setNewSlide({ title: "", subtitle: "", description: "", image: "" })

    toast({
      title: "موفق",
      description: "اسلاید جدید اضافه شد",
    })
  }

  const handleDeleteSlide = (id: string) => {
    setSlides(slides.filter((slide) => slide.id !== id))
    toast({
      title: "موفق",
      description: "اسلاید حذف شد",
    })
  }

  const handleToggleActive = (id: string) => {
    setSlides(slides.map((slide) => (slide.id === id ? { ...slide, active: !slide.active } : slide)))
  }

  const handleSave = () => {
    save("sliderData", slides, "تغییرات اسلایدر ذخیره شد", "خطا در ذخیره تغییرات")
  }

  return (
    <div className="space-y-6">
      {/* هدر */}
      <AdminPageHeader icon={ImageIcon} title="مدیریت اسلایدر" />

      {/* فرم اضافه کردن اسلاید جدید */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            اضافه کردن اسلاید جدید
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="newTitle">عنوان</Label>
              <Input
                id="newTitle"
                value={newSlide.title || ""}
                onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                placeholder="عنوان اسلاید"
              />
            </div>
            <div>
              <Label htmlFor="newSubtitle">زیرعنوان</Label>
              <Input
                id="newSubtitle"
                value={newSlide.subtitle || ""}
                onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                placeholder="زیرعنوان اسلاید"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="newDescription">توضیحات</Label>
              <Textarea
                id="newDescription"
                value={newSlide.description || ""}
                onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
                placeholder="توضیحات اسلاید"
                rows={2}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="newImage">URL تصویر</Label>
              <Input
                id="newImage"
                value={newSlide.image || ""}
                onChange={(e) => setNewSlide({ ...newSlide, image: e.target.value })}
                placeholder="آدرس تصویر اسلاید"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleAddSlide} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 ml-2" />
              اضافه کردن
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* لیست اسلایدها */}
      <div className="space-y-4">
        {slides.map((slide) => (
          <Card key={slide.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  {slide.image && (
                    <img
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{slide.title}</h3>
                  <p className="text-gray-600">{slide.subtitle}</p>
                  <p className="text-sm text-gray-500 mt-1">{slide.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={slide.active ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleToggleActive(slide.id)}
                  >
                    {slide.active ? "فعال" : "غیرفعال"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteSlide(slide.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* دکمه ذخیره */}
      <SaveButton onClick={handleSave} isLoading={isLoading} />
    </div>
  )
}
