"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, Plus, Edit, Trash2 } from "lucide-react"

interface GroupContentItem {
  id: string
  title: string
  description: string
  price?: number
  image?: string
  category: string
  available: boolean
  order: number
}

interface GroupContent {
  groupId: string
  groupTitle: string
  items: GroupContentItem[]
}

interface GroupContentManagementProps {
  groupId: string
}

export function GroupContentManagement({ groupId }: GroupContentManagementProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [groupContent, setGroupContent] = useLocalStorage<GroupContent[]>("groupContents", [])
  const [serviceGroups] = useLocalStorage("serviceGroups", [])

  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<GroupContentItem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    available: true,
  })

  const currentGroup = serviceGroups.find((g: any) => g.id === groupId)
  const currentContent = groupContent.find((gc) => gc.groupId === groupId) || {
    groupId,
    groupTitle: currentGroup?.title || "",
    items: [],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast({
        title: "خطا",
        description: "عنوان آیتم الزامی است",
        variant: "destructive",
      })
      return
    }

    const newItem: GroupContentItem = {
      id: editingItem?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      price: formData.price ? Number.parseFloat(formData.price) : undefined,
      category: formData.category,
      available: formData.available,
      order: editingItem?.order || currentContent.items.length + 1,
    }

    const updatedContent = { ...currentContent }

    if (editingItem) {
      updatedContent.items = updatedContent.items.map((item) => (item.id === editingItem.id ? newItem : item))
    } else {
      updatedContent.items.push(newItem)
    }

    const updatedGroupContent = groupContent.filter((gc) => gc.groupId !== groupId)
    updatedGroupContent.push(updatedContent)

    setGroupContent(updatedGroupContent)

    toast({
      title: "موفق",
      description: editingItem ? "آیتم با موفقیت ویرایش شد" : "آیتم جدید اضافه شد",
    })

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      available: true,
    })
    setEditingItem(null)
    setShowForm(false)
  }

  const handleEdit = (item: GroupContentItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      price: item.price?.toString() || "",
      category: item.category,
      available: item.available,
    })
    setEditingItem(item)
    setShowForm(true)
  }

  const handleDelete = (itemId: string) => {
    if (confirm("آیا از حذف این آیتم اطمینان دارید؟")) {
      const updatedContent = { ...currentContent }
      updatedContent.items = updatedContent.items.filter((item) => item.id !== itemId)

      const updatedGroupContent = groupContent.filter((gc) => gc.groupId !== groupId)
      updatedGroupContent.push(updatedContent)

      setGroupContent(updatedGroupContent)

      toast({
        title: "موفق",
        description: "آیتم با موفقیت حذف شد",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/admin/groups")} className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            بازگشت
          </Button>
          <div>
            <h1 className="text-2xl font-bold">مدیریت محتوای {currentGroup?.title}</h1>
            <p className="text-gray-600">مدیریت آیتم‌ها و محتوای این گروه</p>
          </div>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          افزودن آیتم جدید
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? "ویرایش آیتم" : "افزودن آیتم جدید"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="نام آیتم"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">دسته‌بندی</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="دسته‌بندی آیتم"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">توضیحات</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="توضیحات آیتم"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">قیمت (تومان)</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="قیمت آیتم"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                />
                <label htmlFor="available" className="text-sm font-medium">
                  در دسترس
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">{editingItem ? "ویرایش" : "افزودن"}</Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  انصراف
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {currentContent.items.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">هنوز آیتمی اضافه نشده است</p>
            </CardContent>
          </Card>
        ) : (
          currentContent.items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.category && <Badge variant="secondary">{item.category}</Badge>}
                      <Badge variant={item.available ? "default" : "destructive"}>
                        {item.available ? "در دسترس" : "ناموجود"}
                      </Badge>
                    </div>
                    {item.description && <p className="text-gray-600 text-sm mb-2">{item.description}</p>}
                    {item.price && <p className="font-medium text-green-600">{item.price.toLocaleString()} تومان</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
