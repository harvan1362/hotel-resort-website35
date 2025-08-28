"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Plus, Edit, Trash2, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserGroup {
  id: string
  name: string
  description: string
  permissions: string[]
  color: string
}

const defaultPermissions = [
  "مدیریت کاربران",
  "مدیریت محتوا",
  "مدیریت هتل",
  "مشاهده گزارش‌ها",
  "مدیریت تیکت‌ها",
  "مدیریت پیام‌ها",
]

export function UserGroupsManagement() {
  const [groups, setGroups] = useState<UserGroup[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingGroup, setEditingGroup] = useState<UserGroup | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
    color: "#3b82f6",
  })
  const { toast } = useToast()

  useEffect(() => {
    const savedGroups = localStorage.getItem("userGroups")
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups))
    } else {
      // گروه‌های پیش‌فرض
      const defaultGroups: UserGroup[] = [
        {
          id: "1",
          name: "مدیر کل",
          description: "دسترسی کامل به تمام بخش‌ها",
          permissions: defaultPermissions,
          color: "#ef4444",
        },
        {
          id: "2",
          name: "مدیر هتل",
          description: "مدیریت هتل و رزروها",
          permissions: ["مدیریت هتل", "مشاهده گزارش‌ها"],
          color: "#10b981",
        },
      ]
      setGroups(defaultGroups)
      localStorage.setItem("userGroups", JSON.stringify(defaultGroups))
    }
  }, [])

  const saveGroups = (newGroups: UserGroup[]) => {
    setGroups(newGroups)
    localStorage.setItem("userGroups", JSON.stringify(newGroups))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast({
        title: "خطا",
        description: "نام گروه الزامی است",
        variant: "destructive",
      })
      return
    }

    if (editingGroup) {
      const updatedGroups = groups.map((group) => (group.id === editingGroup.id ? { ...group, ...formData } : group))
      saveGroups(updatedGroups)
      toast({
        title: "موفق",
        description: "گروه با موفقیت ویرایش شد",
      })
    } else {
      const newGroup: UserGroup = {
        id: Date.now().toString(),
        ...formData,
      }
      saveGroups([...groups, newGroup])
      toast({
        title: "موفق",
        description: "گروه جدید با موفقیت اضافه شد",
      })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      permissions: [],
      color: "#3b82f6",
    })
    setShowForm(false)
    setEditingGroup(null)
  }

  const handleEdit = (group: UserGroup) => {
    setEditingGroup(group)
    setFormData({
      name: group.name,
      description: group.description,
      permissions: group.permissions,
      color: group.color,
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("آیا از حذف این گروه اطمینان دارید؟")) {
      const updatedGroups = groups.filter((group) => group.id !== id)
      saveGroups(updatedGroups)
      toast({
        title: "موفق",
        description: "گروه با موفقیت حذف شد",
      })
    }
  }

  const togglePermission = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">مدیریت گروه‌های دسترسی</h1>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          افزودن گروه جدید
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingGroup ? "ویرایش گروه" : "افزودن گروه جدید"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">نام گروه</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="نام گروه را وارد کنید"
                  />
                </div>
                <div>
                  <Label htmlFor="color">رنگ گروه</Label>
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">توضیحات</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="توضیحات گروه را وارد کنید"
                />
              </div>

              <div>
                <Label>دسترسی‌ها</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {defaultPermissions.map((permission) => (
                    <label key={permission} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={() => togglePermission(permission)}
                        className="rounded"
                      />
                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="gap-2">
                  <Save className="w-4 h-4" />
                  {editingGroup ? "ویرایش" : "افزودن"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="gap-2 bg-transparent">
                  <X className="w-4 h-4" />
                  انصراف
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: group.color }} />
                  <div>
                    <h3 className="font-semibold">{group.name}</h3>
                    <p className="text-sm text-gray-600">{group.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(group)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(group.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {group.permissions.map((permission) => (
                  <Badge key={permission} variant="secondary" className="text-xs">
                    {permission}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
