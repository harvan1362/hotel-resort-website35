"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Settings, Plus, Trash2, Edit, Save, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface Service {
  id: string
  title: string
  description: string
  price: string
  category: string
  image: string
  features: string[]
  active: boolean
}

interface ServiceGroup {
  id: string
  title: string
  icon: string
  color: string
  href: string
  active: boolean
  order: number
}

export function ServicesManagement() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeGroups, setActiveGroups] = useState<ServiceGroup[]>([])

  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      title: "اقامت VIP",
      description: "اتاق‌های لوکس با نمای دریا و امکانات کامل",
      price: "۵۰۰,۰۰۰ تومان/شب",
      category: "هتل",
      image: "",
      features: ["نمای دریا", "سرویس 24 ساعته", "صبحانه رایگان"],
      active: true,
    },
    {
      id: "2",
      title: "رستوران دریایی",
      description: "غذاهای دریایی تازه با طعم بی‌نظیر",
      price: "از ۵۰,۰۰۰ تومان",
      category: "رستوران",
      image: "",
      features: ["غذای دریایی", "منوی متنوع", "محیط دنج"],
      active: true,
    },
  ])

  const [newService, setNewService] = useState<Partial<Service>>({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    features: [],
  })

  const [newFeature, setNewFeature] = useState("")

  // بارگذاری گروه‌های فعال از localStorage
  useEffect(() => {
    const savedGroups = localStorage.getItem("serviceGroups")
    if (savedGroups) {
      const groups: ServiceGroup[] = JSON.parse(savedGroups)
      setActiveGroups(groups.filter((group) => group.active))
    } else {
      // گروه‌های پیش‌فرض
      setActiveGroups([
        { id: "1", title: "هتل", icon: "Building2", color: "#8b5cf6", href: "/rooms", active: true, order: 1 },
        {
          id: "2",
          title: "رستوران",
          icon: "UtensilsCrossed",
          color: "#f97316",
          href: "/services#restaurant",
          active: true,
          order: 2,
        },
        { id: "3", title: "کافه", icon: "Coffee", color: "#f59e0b", href: "/services#cafe", active: true, order: 3 },
      ])
    }
  }, [])

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setNewService({
        ...newService,
        features: [...(newService.features || []), newFeature.trim()],
      })
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...(newService.features || [])]
    updatedFeatures.splice(index, 1)
    setNewService({ ...newService, features: updatedFeatures })
  }

  const handleAddService = () => {
    if (!newService.title || !newService.description || !newService.price || !newService.category) {
      toast({
        title: "خطا",
        description: "لطفاً تمام فیلدهای ضروری را پر کنید",
        variant: "destructive",
      })
      return
    }

    const service: Service = {
      id: Date.now().toString(),
      title: newService.title!,
      description: newService.description!,
      price: newService.price!,
      category: newService.category!,
      image: newService.image || "",
      features: newService.features || [],
      active: true,
    }

    setServices([...services, service])
    setNewService({ title: "", description: "", price: "", category: "", image: "", features: [] })

    toast({
      title: "موفق",
      description: "خدمت جدید اضافه شد",
    })
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter((item) => item.id !== id))
    toast({
      title: "موفق",
      description: "خدمت حذف شد",
    })
  }

  const handleToggleActive = (id: string) => {
    setServices(services.map((item) => (item.id === id ? { ...item, active: !item.active } : item)))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem("servicesData", JSON.stringify(services))

      toast({
        title: "موفق",
        description: "تغییرات خدمات ذخیره شد",
      })
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در ذخیره تغییرات",
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
          <Settings className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold">مدیریت خدمات</h1>
        </div>
      </div>

      {/* فرم اضافه کردن خدمت جدید */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            اضافه کردن خدمت جدید
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="newTitle">عنوان خدمت</Label>
              <Input
                id="newTitle"
                value={newService.title || ""}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                placeholder="نام خدمت"
              />
            </div>
            <div>
              <Label htmlFor="newPrice">قیمت</Label>
              <Input
                id="newPrice"
                value={newService.price || ""}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                placeholder="۵۰۰,۰۰۰ تومان"
              />
            </div>
            <div>
              <Label>دسته‌بندی</Label>
              <Select
                value={newService.category}
                onValueChange={(value) => setNewService({ ...newService, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {activeGroups.map((group) => (
                    <SelectItem key={group.id} value={group.title}>
                      {group.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="newImage">URL تصویر</Label>
              <Input
                id="newImage"
                value={newService.image || ""}
                onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                placeholder="آدرس تصویر خدمت"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="newDescription">توضیحات</Label>
              <Textarea
                id="newDescription"
                value={newService.description || ""}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="توضیحات کامل خدمت"
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <Label>ویژگی‌ها</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="ویژگی جدید"
                  onKeyPress={(e) => e.key === "Enter" && handleAddFeature()}
                />
                <Button type="button" onClick={handleAddFeature} variant="outline">
                  افزودن
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(newService.features || []).map((feature, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleAddService} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 ml-2" />
              اضافه کردن
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* لیست خدمات */}
      <div className="space-y-4">
        {services.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  {item.image && (
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{item.category}</span>
                    <span className="text-green-600 font-medium text-sm flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {item.price}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.features.map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={item.active ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleToggleActive(item.id)}
                    className={item.active ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {item.active ? "فعال" : "غیرفعال"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteService(item.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* دکمه ذخیره */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 ml-2" />
          {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </div>
    </div>
  )
}
