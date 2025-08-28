"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Phone, MapPin, Plus, Trash2, Edit, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface ContactCard {
  id: string
  title: string
  value: string
  description: string
  order: number
}

interface ContactInfo {
  address: string
  phone1: string
  phone2: string
  workingHours: string
  quickMessageTitle: string
  quickMessageDescription: string
  cards: ContactCard[]
}

export function ContactInfoManagement() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showAddCard, setShowAddCard] = useState(false)
  const [editingCard, setEditingCard] = useState<ContactCard | null>(null)

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: "هرمزگان، شهرستان، بندر مقام، خیابان ساحلی",
    phone1: "۰۹۱۷۳۸۱۵۴۸۲",
    phone2: "۰۷۶۴۲۴۷۰۰۰۶",
    workingHours: "همه روزه 24 ساعته",
    quickMessageTitle: "پیام سریع",
    quickMessageDescription: "برای دریافت اطلاعات تکمیلی و رزرو سریع، پیام خود را ارسال کنید",
    cards: [
      {
        id: "1",
        title: "خط ثابت",
        value: "۰۷۶۴۲۴۷۰۰۰۶",
        description: "پاسخگویی 24 ساعته",
        order: 1,
      },
      {
        id: "2",
        title: "کافی‌شاپ و فست‌فود",
        value: "۰۹۰۳۰۰۶۹۳۳۵",
        description: "سفارش غذا و نوشیدنی",
        order: 2,
      },
      {
        id: "3",
        title: "رستوران و کبابی",
        value: "۰۹۰۳۰۰۶۹۳۳۶",
        description: "رزرو میز رستوران",
        order: 3,
      },
      {
        id: "4",
        title: "رزرواسیون هتل",
        value: "۰۹۱۵۸۴۰۳۱۳۰",
        description: "رزرو اتاق و اقامت",
        order: 4,
      },
    ],
  })

  const [newCard, setNewCard] = useState<Partial<ContactCard>>({
    title: "",
    value: "",
    description: "",
  })

  // بارگذاری داده‌ها از localStorage
  useEffect(() => {
    const savedContactInfo = localStorage.getItem("contactInfo")
    if (savedContactInfo) {
      setContactInfo(JSON.parse(savedContactInfo))
    }
  }, [])

  const handleSave = () => {
    setIsLoading(true)
    localStorage.setItem("contactInfo", JSON.stringify(contactInfo))

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "موفق",
        description: "اطلاعات تماس ذخیره شد",
      })
    }, 500)
  }

  const handleAddCard = () => {
    if (!newCard.title || !newCard.value || !newCard.description) {
      toast({
        title: "خطا",
        description: "لطفاً تمام فیلدها را پر کنید",
        variant: "destructive",
      })
      return
    }

    const card: ContactCard = {
      id: Date.now().toString(),
      title: newCard.title!,
      value: newCard.value!,
      description: newCard.description!,
      order: contactInfo.cards.length + 1,
    }

    const updatedContactInfo = {
      ...contactInfo,
      cards: [...contactInfo.cards, card],
    }

    setContactInfo(updatedContactInfo)
    localStorage.setItem("contactInfo", JSON.stringify(updatedContactInfo))

    setNewCard({ title: "", value: "", description: "" })
    setShowAddCard(false)

    toast({
      title: "موفق",
      description: "کارت تماس جدید اضافه شد",
    })
  }

  const handleEditCard = (card: ContactCard) => {
    setEditingCard(card)
    setNewCard({
      title: card.title,
      value: card.value,
      description: card.description,
    })
    setShowAddCard(true)
  }

  const handleUpdateCard = () => {
    if (!editingCard || !newCard.title || !newCard.value || !newCard.description) {
      toast({
        title: "خطا",
        description: "لطفاً تمام فیلدها را پر کنید",
        variant: "destructive",
      })
      return
    }

    const updatedContactInfo = {
      ...contactInfo,
      cards: contactInfo.cards.map((card) =>
        card.id === editingCard.id
          ? { ...card, title: newCard.title!, value: newCard.value!, description: newCard.description! }
          : card,
      ),
    }

    setContactInfo(updatedContactInfo)
    localStorage.setItem("contactInfo", JSON.stringify(updatedContactInfo))

    setEditingCard(null)
    setNewCard({ title: "", value: "", description: "" })
    setShowAddCard(false)

    toast({
      title: "موفق",
      description: "کارت تماس ویرایش شد",
    })
  }

  const handleDeleteCard = (id: string) => {
    if (window.confirm("آیا از حذف این کارت تماس اطمینان دارید؟")) {
      const updatedContactInfo = {
        ...contactInfo,
        cards: contactInfo.cards.filter((card) => card.id !== id),
      }

      setContactInfo(updatedContactInfo)
      localStorage.setItem("contactInfo", JSON.stringify(updatedContactInfo))

      toast({
        title: "موفق",
        description: "کارت تماس حذف شد",
      })
    }
  }

  const cancelForm = () => {
    setShowAddCard(false)
    setEditingCard(null)
    setNewCard({ title: "", value: "", description: "" })
  }

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowRight className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Phone className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold">مدیریت اطلاعات تماس</h1>
        </div>
      </div>

      {/* اطلاعات اصلی */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            اطلاعات اصلی تماس
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address">آدرس</Label>
              <Textarea
                id="address"
                value={contactInfo.address}
                onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                placeholder="آدرس کامل مجموعه"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="workingHours">ساعات کاری</Label>
              <Input
                id="workingHours"
                value={contactInfo.workingHours}
                onChange={(e) => setContactInfo({ ...contactInfo, workingHours: e.target.value })}
                placeholder="ساعات کاری"
              />
            </div>
            <div>
              <Label htmlFor="phone1">شماره تماس اول</Label>
              <Input
                id="phone1"
                value={contactInfo.phone1}
                onChange={(e) => setContactInfo({ ...contactInfo, phone1: e.target.value })}
                placeholder="شماره تماس اصلی"
              />
            </div>
            <div>
              <Label htmlFor="phone2">شماره تماس دوم</Label>
              <Input
                id="phone2"
                value={contactInfo.phone2}
                onChange={(e) => setContactInfo({ ...contactInfo, phone2: e.target.value })}
                placeholder="شماره تماس دوم"
              />
            </div>
            <div>
              <Label htmlFor="quickMessageTitle">عنوان پیام سریع</Label>
              <Input
                id="quickMessageTitle"
                value={contactInfo.quickMessageTitle}
                onChange={(e) => setContactInfo({ ...contactInfo, quickMessageTitle: e.target.value })}
                placeholder="عنوان بخش پیام سریع"
              />
            </div>
            <div>
              <Label htmlFor="quickMessageDescription">توضیحات پیام سریع</Label>
              <Textarea
                id="quickMessageDescription"
                value={contactInfo.quickMessageDescription}
                onChange={(e) => setContactInfo({ ...contactInfo, quickMessageDescription: e.target.value })}
                placeholder="توضیحات بخش پیام سریع"
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* کارت‌های تماس */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              کارت‌های تماس
            </CardTitle>
            {!showAddCard && (
              <Button onClick={() => setShowAddCard(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 ml-2" />
                افزودن کارت جدید
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* فرم اضافه/ویرایش کارت */}
          {showAddCard && (
            <Card className="border-2 border-blue-200 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  {editingCard ? "ویرایش کارت تماس" : "اضافه کردن کارت تماس جدید"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cardTitle">عنوان</Label>
                    <Input
                      id="cardTitle"
                      value={newCard.title || ""}
                      onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                      placeholder="عنوان کارت"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardValue">شماره تماس</Label>
                    <Input
                      id="cardValue"
                      value={newCard.value || ""}
                      onChange={(e) => setNewCard({ ...newCard, value: e.target.value })}
                      placeholder="شماره تماس"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardDescription">توضیحات</Label>
                    <Input
                      id="cardDescription"
                      value={newCard.description || ""}
                      onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                      placeholder="توضیحات کارت"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={cancelForm}>
                    انصراف
                  </Button>
                  <Button
                    onClick={editingCard ? handleUpdateCard : handleAddCard}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 ml-2" />
                    {editingCard ? "ویرایش" : "اضافه کردن"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* لیست کارت‌ها */}
          <div className="space-y-4">
            {contactInfo.cards
              .sort((a, b) => a.order - b.order)
              .map((card) => (
                <Card key={card.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Phone className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{card.title}</h3>
                        <p className="text-xl font-bold text-blue-600">{card.value}</p>
                        <p className="text-gray-600 text-sm">{card.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditCard(card)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteCard(card.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
  )
}
