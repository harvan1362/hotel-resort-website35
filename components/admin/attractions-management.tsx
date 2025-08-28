"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, MapPin, Plus, Trash2, Edit, Save, Star, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface Attraction {
  id: string
  title: string
  description: string
  image: string
  image2?: string
  image3?: string
  rating: number
  distance: string
  category: string
  active: boolean
}

export function AttractionsManagement() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [attractions, setAttractions] = useState<Attraction[]>([
    {
      id: "1",
      title: "کوه‌های هرمز",
      description: "کوه‌های رنگارنگ با منظره‌ای دیدنی از خلیج فارس و جزایر اطراف",
      image: "/hormuz-mountains-gulf.png",
      rating: 5,
      distance: "5 کیلومتر",
      category: "جاذبه گردشگری",
      active: true,
    },
    {
      id: "2",
      title: "ساحل طلایی بندر مقام",
      description: "ساحل زیبا با شن‌های طلایی و آب‌های فیروزه‌ای، مناسب برای شنا و ماهیگیری",
      image: "/tropical-beach-paradise.png",
      rating: 5,
      distance: "12 نظر",
      category: "جاذبه گردشگری",
      active: true,
    },
    {
      id: "3",
      title: "ساحل مکسر",
      description:
        "یکی از زیباترین سواحل هرمزگان با صخره‌های شگفت‌انگیز که در اثر فرسایش امواج به اشکال گوناگون درآمده‌اند",
      image: "/maksar-beach-rocks.png",
      rating: 5,
      distance: "15 کیلومتر",
      category: "ساحل",
      active: true,
    },
    {
      id: "4",
      title: "گردنه عشاق",
      description: "عاشقانه‌ترین جاده ساحلی ایران با مناظر طبیعی جذاب و چشم‌اندازهای رمانتیک از کوه‌ها و دریا",
      image: "/gardaneh-oshagh-romantic.png",
      rating: 5,
      distance: "25 کیلومتر",
      category: "کوهستان",
      active: true,
    },
    {
      id: "5",
      title: "ساحل نایبند",
      description: "پارک ملی نای‌بند با تنوع گیاهی و جانوری، مشهور به دلفین‌ها و لاک‌پشت‌های دریایی",
      image: "/nayband-marine-park.png",
      rating: 5,
      distance: "30 کیلومتر",
      category: "طبیعی",
      active: true,
    },
    {
      id: "6",
      title: "غار نمکی بستک",
      description: "غار طبیعی با تشکیلات نمکی منحصر به فرد و قندیل‌های زیبای کریستالی",
      image: "/bastak-salt-cave.png",
      rating: 4,
      distance: "40 کیلومتر",
      category: "طبیعی",
      active: true,
    },
    {
      id: "7",
      title: "تنگه بوجیر",
      description: "جاذبه طبیعی زیبا با چشم‌اندازهای بکر، صخره‌های بلند، آبشار و قندیل‌های شگفت‌انگیز",
      image: "/bojir-canyon-waterfall.png",
      rating: 5,
      distance: "35 کیلومتر",
      category: "طبیعی",
      active: true,
    },
    {
      id: "8",
      title: "تنگه شوتاریکو",
      description: "دره‌ای باشکوه با دیواره‌های صخره‌ای مرتفع و مناظر طبیعی خیره‌کننده",
      image: "/shotariko-canyon.png",
      rating: 4,
      distance: "45 کیلومتر",
      category: "کوهستان",
      active: true,
    },
    {
      id: "9",
      title: "آب دبه",
      description: "چشمه طبیعی با آب شیرین و محیطی دلنشین در میان طبیعت بکر منطقه",
      image: "/ab-dobeh-spring.png",
      rating: 4,
      distance: "20 کیلومتر",
      category: "طبیعی",
      active: true,
    },
    {
      id: "10",
      title: "ساحل تبن",
      description: "ساحل بکر و آرام با شن‌های نرم و آب‌های صاف، مناسب برای استراحت و تفریح",
      image: "/taban-beach-calm.png",
      rating: 4,
      distance: "18 کیلومتر",
      category: "ساحل",
      active: true,
    },
    {
      id: "11",
      title: "پنجره خلیج فارس",
      description: "تشکیل صخره‌ای طبیعی به شکل پنجره که نمایی بی‌نظیر از خلیج فارس ارائه می‌دهد",
      image: "/persian-gulf-window.png",
      rating: 5,
      distance: "22 کیلومتر",
      category: "طبیعی",
      active: true,
    },
    {
      id: "12",
      title: "جزیره مارو",
      description: "جزیره‌ای زیبا در خلیج فارس با طبیعت دست‌نخورده و مناظر دریایی خیره‌کننده",
      image: "/maro-island-pristine.png",
      rating: 5,
      distance: "50 کیلومتر",
      category: "جاذبه گردشگری",
      active: true,
    },
    {
      id: "13",
      title: "جزیره لاوان",
      description: "جزیره صنعتی و گردشگری با امکانات مدرن و مناظر زیبای دریایی",
      image: "/lavan-island-modern.png",
      rating: 4,
      distance: "60 کیلومتر",
      category: "جاذبه گردشگری",
      active: true,
    },
    {
      id: "14",
      title: "جزیره هرمز",
      description: "جزیره رنگین کمان با خاک‌های رنگارنگ، قلعه پرتغالی و فرهنگ محلی غنی",
      image: "/hormuz-island-colorful.png",
      rating: 5,
      distance: "70 کیلومتر",
      category: "تاریخی",
      active: true,
    },
  ])

  const [newAttraction, setNewAttraction] = useState<Partial<Attraction>>({
    title: "",
    description: "",
    image: "",
    image2: "",
    image3: "",
    rating: 5,
    distance: "",
    category: "جاذبه گردشگری",
  })

  const categories = ["جاذبه گردشگری", "ساحل", "کوهستان", "تاریخی", "طبیعی", "تفریحی"]

  const handleAddAttraction = () => {
    if (!newAttraction.title || !newAttraction.description) {
      toast({
        title: "خطا",
        description: "لطفاً عنوان و توضیحات را وارد کنید",
        variant: "destructive",
      })
      return
    }

    const attraction: Attraction = {
      id: Date.now().toString(),
      title: newAttraction.title!,
      description: newAttraction.description!,
      image: newAttraction.image || "",
      image2: newAttraction.image2 || "",
      image3: newAttraction.image3 || "",
      rating: newAttraction.rating || 5,
      distance: newAttraction.distance || "",
      category: newAttraction.category || "جاذبه گردشگری",
      active: true,
    }

    setAttractions([...attractions, attraction])
    setNewAttraction({
      title: "",
      description: "",
      image: "",
      image2: "",
      image3: "",
      rating: 5,
      distance: "",
      category: "جاذبه گردشگری",
    })

    toast({
      title: "موفق",
      description: "جاذبه جدید اضافه شد",
    })
  }

  const handleRemoveImage = (imageType: "image" | "image2" | "image3") => {
    setNewAttraction({ ...newAttraction, [imageType]: "" })
  }

  const handleDeleteAttraction = (id: string) => {
    if (confirm("آیا از حذف این جاذبه اطمینان دارید؟")) {
      setAttractions(attractions.filter((item) => item.id !== id))
      toast({
        title: "موفق",
        description: "جاذبه حذف شد",
      })
    }
  }

  const handleToggleActive = (id: string) => {
    setAttractions(attractions.map((item) => (item.id === id ? { ...item, active: !item.active } : item)))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem("attractionsData", JSON.stringify(attractions))

      toast({
        title: "موفق",
        description: "تغییرات جاذبه‌ها ذخیره شد",
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
          <MapPin className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold">مدیریت جاذبه‌ها</h1>
        </div>
      </div>

      {/* فرم اضافه کردن جاذبه جدید */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            اضافه کردن جاذبه جدید
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="newTitle">عنوان جاذبه</Label>
              <Input
                id="newTitle"
                value={newAttraction.title || ""}
                onChange={(e) => setNewAttraction({ ...newAttraction, title: e.target.value })}
                placeholder="نام جاذبه گردشگری"
              />
            </div>
            <div>
              <Label htmlFor="newCategory">دسته‌بندی</Label>
              <select
                id="newCategory"
                value={newAttraction.category || ""}
                onChange={(e) => setNewAttraction({ ...newAttraction, category: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="newDistance">فاصله/اطلاعات</Label>
              <Input
                id="newDistance"
                value={newAttraction.distance || ""}
                onChange={(e) => setNewAttraction({ ...newAttraction, distance: e.target.value })}
                placeholder="5 کیلومتر یا 12 نظر"
              />
            </div>
            <div>
              <Label htmlFor="newRating">امتیاز</Label>
              <select
                id="newRating"
                value={newAttraction.rating || 5}
                onChange={(e) => setNewAttraction({ ...newAttraction, rating: Number(e.target.value) })}
                className="w-full p-2 border rounded-md"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} ستاره
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <Label>تصاویر جاذبه (حداکثر 3 عکس)</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {/* عکس اصلی */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600">عکس اصلی</Label>
                  <div className="relative">
                    <Input
                      value={newAttraction.image || ""}
                      onChange={(e) => setNewAttraction({ ...newAttraction, image: e.target.value })}
                      placeholder="آدرس عکس اصلی"
                    />
                    {newAttraction.image && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 -translate-y-1/2"
                        onClick={() => handleRemoveImage("image")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {newAttraction.image && (
                    <div className="w-full h-20 bg-gray-100 rounded border overflow-hidden">
                      <img
                        src={newAttraction.image || "/placeholder.svg"}
                        alt="پیش‌نمایش"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* عکس دوم */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600">عکس دوم (اختیاری)</Label>
                  <div className="relative">
                    <Input
                      value={newAttraction.image2 || ""}
                      onChange={(e) => setNewAttraction({ ...newAttraction, image2: e.target.value })}
                      placeholder="آدرس عکس دوم"
                    />
                    {newAttraction.image2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 -translate-y-1/2"
                        onClick={() => handleRemoveImage("image2")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {newAttraction.image2 && (
                    <div className="w-full h-20 bg-gray-100 rounded border overflow-hidden">
                      <img
                        src={newAttraction.image2 || "/placeholder.svg"}
                        alt="پیش‌نمایش"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* عکس سوم */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600">عکس سوم (اختیاری)</Label>
                  <div className="relative">
                    <Input
                      value={newAttraction.image3 || ""}
                      onChange={(e) => setNewAttraction({ ...newAttraction, image3: e.target.value })}
                      placeholder="آدرس عکس سوم"
                    />
                    {newAttraction.image3 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 -translate-y-1/2"
                        onClick={() => handleRemoveImage("image3")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {newAttraction.image3 && (
                    <div className="w-full h-20 bg-gray-100 rounded border overflow-hidden">
                      <img
                        src={newAttraction.image3 || "/placeholder.svg"}
                        alt="پیش‌نمایش"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="newDescription">توضیحات</Label>
              <Textarea
                id="newDescription"
                value={newAttraction.description || ""}
                onChange={(e) => setNewAttraction({ ...newAttraction, description: e.target.value })}
                placeholder="توضیحات کامل جاذبه گردشگری"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleAddAttraction} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 ml-2" />
              اضافه کردن
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* لیست جاذبه‌ها */}
      <div className="space-y-4">
        {attractions.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex gap-2 flex-shrink-0">
                  <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    {item.image && (
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  {item.image2 && (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={item.image2 || "/placeholder.svg"}
                        alt={`${item.title} - عکس 2`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {item.image3 && (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={item.image3 || "/placeholder.svg"}
                        alt={`${item.title} - عکس 3`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{item.category}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{item.distance}</span>
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={item.active ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleToggleActive(item.id)}
                  >
                    {item.active ? "فعال" : "غیرفعال"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteAttraction(item.id)}>
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
