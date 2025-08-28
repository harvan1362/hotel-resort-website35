"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, FileText, Plus, Trash2, Edit, Save, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  image: string
  date: string
  category: string
  active: boolean
}

export function NewsManagement() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [news, setNews] = useState<NewsItem[]>([
    {
      id: "1",
      title: "افتتاح رسمی مجتمع تفریحی اقامتی دریاکنار",
      summary:
        "مجتمع تفریحی اقامتی دریاکنار با امکانات کامل و خدمات درجه یک رسماً افتتاح شد و آماده پذیرایی از مهمانان گرامی است.",
      content: "مجتمع تفریحی اقامتی دریاکنار در قلب طبیعت زیبای هرمزگان و در کنار خلیج فارس قرار گرفته است...",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/luxury-resort-opening.png",
      date: "1404/05/15",
      category: "رزرو اتاق",
      active: true,
    },
  ])

  const [newNews, setNewNews] = useState<Partial<NewsItem>>({
    title: "",
    summary: "",
    content: "",
    image: "",
    category: "",
  })

  const categories = ["رزرو اتاق", "فعالیت", "شعبه", "رویداد", "اطلاعیه"]

  const handleAddNews = () => {
    if (!newNews.title || !newNews.summary || !newNews.content) {
      toast({
        title: "خطا",
        description: "لطفاً تمام فیلدهای ضروری را پر کنید",
        variant: "destructive",
      })
      return
    }

    const newsItem: NewsItem = {
      id: Date.now().toString(),
      title: newNews.title!,
      summary: newNews.summary!,
      content: newNews.content!,
      image: newNews.image || "",
      category: newNews.category || "عمومی",
      date: new Date().toLocaleDateString("fa-IR"),
      active: true,
    }

    setNews([newsItem, ...news])
    setNewNews({ title: "", summary: "", content: "", image: "", category: "" })

    toast({
      title: "موفق",
      description: "خبر جدید اضافه شد",
    })
  }

  const handleDeleteNews = (id: string) => {
    setNews(news.filter((item) => item.id !== id))
    toast({
      title: "موفق",
      description: "خبر حذف شد",
    })
  }

  const handleToggleActive = (id: string) => {
    setNews(news.map((item) => (item.id === id ? { ...item, active: !item.active } : item)))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem("newsData", JSON.stringify(news))

      toast({
        title: "موفق",
        description: "تغییرات اخبار ذخیره شد",
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
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold">مدیریت اخبار</h1>
        </div>
      </div>

      {/* فرم اضافه کردن خبر جدید */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            اضافه کردن خبر جدید
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="newTitle">عنوان خبر</Label>
              <Input
                id="newTitle"
                value={newNews.title || ""}
                onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                placeholder="عنوان خبر را وارد کنید"
              />
            </div>
            <div>
              <Label htmlFor="newCategory">دسته‌بندی</Label>
              <select
                id="newCategory"
                value={newNews.category || ""}
                onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">انتخاب دسته‌بندی</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="newImage">URL تصویر</Label>
              <Input
                id="newImage"
                value={newNews.image || ""}
                onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
                placeholder="آدرس تصویر خبر"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="newSummary">خلاصه خبر</Label>
              <Textarea
                id="newSummary"
                value={newNews.summary || ""}
                onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })}
                placeholder="خلاصه‌ای از خبر بنویسید"
                rows={2}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="newContent">متن کامل خبر</Label>
              <Textarea
                id="newContent"
                value={newNews.content || ""}
                onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                placeholder="متن کامل خبر را بنویسید"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleAddNews} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 ml-2" />
              اضافه کردن
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* لیست اخبار */}
      <div className="space-y-4">
        {news.map((item) => (
          <Card key={item.id}>
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
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.summary}</p>
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
                  <Button variant="outline" size="sm" onClick={() => handleDeleteNews(item.id)}>
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
