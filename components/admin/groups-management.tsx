"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Menu, Plus, Trash2, Edit, Save, Eye, EyeOff, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLocalStorage } from "@/hooks/use-local-storage"
import {
  Building2,
  UtensilsCrossed,
  Coffee,
  Zap,
  ChefHat,
  MapPin,
  Utensils,
  Home,
  Car,
  Gamepad2,
  Music,
  Camera,
  Plane,
  Waves,
  TreePine,
  Mountain,
  Tent,
  Fish,
  Bike,
  Dumbbell,
  Sparkles,
} from "lucide-react"

interface ServiceGroup {
  id: string
  title: string
  icon: string
  color: string
  href: string
  active: boolean
  order: number
}

const availableIcons = [
  { name: "Building2", icon: Building2, label: "هتل" },
  { name: "UtensilsCrossed", icon: UtensilsCrossed, label: "رستوران" },
  { name: "Coffee", icon: Coffee, label: "کافه" },
  { name: "Zap", icon: Zap, label: "فست فود" },
  { name: "ChefHat", icon: ChefHat, label: "کباب" },
  { name: "Utensils", icon: Utensils, label: "تالار" },
  { name: "MapPin", icon: MapPin, label: "جاذبه گردشگری" },
  { name: "Home", icon: Home, label: "اقامت" },
  { name: "Car", icon: Car, label: "حمل و نقل" },
  { name: "Gamepad2", icon: Gamepad2, label: "تفریحات" },
  { name: "Music", icon: Music, label: "موسیقی" },
  { name: "Camera", icon: Camera, label: "عکاسی" },
  { name: "Plane", icon: Plane, label: "تور" },
  { name: "Waves", icon: Waves, label: "ورزش‌های آبی" },
  { name: "TreePine", icon: TreePine, label: "طبیعت‌گردی" },
  { name: "Mountain", icon: Mountain, label: "کوهنوردی" },
  { name: "Tent", icon: Tent, label: "کمپینگ" },
  { name: "Fish", icon: Fish, label: "ماهیگیری" },
  { name: "Bike", icon: Bike, label: "دوچرخه‌سواری" },
  { name: "Dumbbell", icon: Dumbbell, label: "باشگاه" },
  { name: "Sparkles", icon: Sparkles, label: "سالن زیبایی" },
]

export function GroupsManagement() {
  const router = useRouter()
  const { toast } = useToast()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingGroup, setEditingGroup] = useState<ServiceGroup | null>(null)

  const [groups, setGroups] = useLocalStorage<ServiceGroup[]>("serviceGroups", [
    {
      id: "1",
      title: "هتل",
      icon: "Building2",
      color: "#8b5cf6",
      href: "/group/1",
      active: true,
      order: 1,
    },
    {
      id: "2",
      title: "رستوران",
      icon: "UtensilsCrossed",
      color: "#f97316",
      href: "/group/2",
      active: true,
      order: 2,
    },
    {
      id: "3",
      title: "کافه",
      icon: "Coffee",
      color: "#f59e0b",
      href: "/group/3",
      active: true,
      order: 3,
    },
    {
      id: "4",
      title: "فست‌فود",
      icon: "Zap",
      color: "#ef4444",
      href: "/group/4",
      active: true,
      order: 4,
    },
    {
      id: "5",
      title: "کباب",
      icon: "ChefHat",
      color: "#22c55e",
      href: "/group/5",
      active: true,
      order: 5,
    },
    {
      id: "6",
      title: "جاذبه‌های گردشگری",
      icon: "MapPin",
      color: "#3b82f6",
      href: "/group/6",
      active: true,
      order: 6,
    },
  ])

  const [newGroup, setNewGroup] = useState<Partial<ServiceGroup>>({
    title: "",
    icon: "Building2",
    color: "#8b5cf6",
    href: "/group/",
  })

  const handleAddGroup = () => {
    if (!newGroup.title || !newGroup.href) {
      toast({
        title: "خطا",
        description: "لطفاً عنوان و لینک گروه را وارد کنید",
        variant: "destructive",
      })
      return
    }

    const group: ServiceGroup = {
      id: Date.now().toString(),
      title: newGroup.title!,
      icon: newGroup.icon!,
      color: newGroup.color!,
      href: `/group/${Date.now()}`,
      active: true,
      order: groups.length + 1,
    }

    setGroups([...groups, group])

    setNewGroup({ title: "", icon: "Building2", color: "#8b5cf6", href: "/group/" })
    setShowAddForm(false)

    toast({
      title: "موفق",
      description: "گروه جدید اضافه شد",
    })
  }

  const handleEditGroup = (group: ServiceGroup) => {
    setEditingGroup(group)
    setNewGroup({
      title: group.title,
      icon: group.icon,
      color: group.color,
      href: group.href,
    })
    setShowAddForm(true)
  }

  const handleUpdateGroup = () => {
    if (!editingGroup || !newGroup.title || !newGroup.href) {
      toast({
        title: "خطا",
        description: "لطفاً عنوان و لینک گروه را وارد کنید",
        variant: "destructive",
      })
      return
    }

    setGroups(
      groups.map((group) =>
        group.id === editingGroup.id
          ? { ...group, title: newGroup.title!, icon: newGroup.icon!, color: newGroup.color!, href: newGroup.href! }
          : group,
      ),
    )

    setEditingGroup(null)
    setNewGroup({ title: "", icon: "Building2", color: "#8b5cf6", href: "/group/" })
    setShowAddForm(false)

    toast({
      title: "موفق",
      description: "گروه ویرایش شد",
    })
  }

  const handleDeleteGroup = (id: string) => {
    if (window.confirm("آیا از حذف این گروه اطمینان دارید؟")) {
      setGroups(groups.filter((group) => group.id !== id))

      toast({
        title: "موفق",
        description: "گروه حذف شد",
      })
    }
  }

  const handleToggleActive = (id: string) => {
    setGroups(groups.map((group) => (group.id === id ? { ...group, active: !group.active } : group)))

    const updatedGroup = groups.find((g) => g.id === id)
    toast({
      title: "موفق",
      description: `گروه ${!updatedGroup?.active ? "فعال" : "غیرفعال"} شد`,
    })
  }

  const getIconComponent = (iconName: string) => {
    const iconData = availableIcons.find((icon) => icon.name === iconName)
    return iconData ? iconData.icon : Building2
  }

  const cancelForm = () => {
    setShowAddForm(false)
    setEditingGroup(null)
    setNewGroup({ title: "", icon: "Building2", color: "#8b5cf6", href: "/group/" })
  }

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowRight className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Menu className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold">مدیریت گروه‌ها</h1>
        </div>
      </div>

      {/* دکمه افزودن گروه */}
      {!showAddForm && (
        <div className="flex justify-end">
          <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 ml-2" />
            افزودن گروه جدید
          </Button>
        </div>
      )}

      {/* فرم اضافه/ویرایش کردن گروه */}
      {showAddForm && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              {editingGroup ? "ویرایش گروه" : "اضافه کردن گروه جدید"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newTitle">عنوان گروه</Label>
                <Input
                  id="newTitle"
                  value={newGroup.title || ""}
                  onChange={(e) => setNewGroup({ ...newGroup, title: e.target.value })}
                  placeholder="نام گروه خدماتی"
                />
              </div>
              <div>
                <Label htmlFor="newHref">لینک</Label>
                <Input
                  id="newHref"
                  value={newGroup.href || ""}
                  onChange={(e) => setNewGroup({ ...newGroup, href: e.target.value })}
                  placeholder="/services#example"
                />
              </div>
              <div>
                <Label>انتخاب آیکون</Label>
                <Select value={newGroup.icon} onValueChange={(value) => setNewGroup({ ...newGroup, icon: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="آیکون را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableIcons.map((iconData) => {
                      const IconComponent = iconData.icon
                      return (
                        <SelectItem key={iconData.name} value={iconData.name}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4" />
                            <span>{iconData.label}</span>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="colorPicker">انتخاب رنگ</Label>
                <div className="flex items-center gap-2">
                  <input
                    id="colorPicker"
                    type="color"
                    value={newGroup.color}
                    onChange={(e) => setNewGroup({ ...newGroup, color: e.target.value })}
                    className="w-12 h-10 border rounded cursor-pointer"
                  />
                  <Input
                    value={newGroup.color}
                    onChange={(e) => setNewGroup({ ...newGroup, color: e.target.value })}
                    placeholder="#8b5cf6"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* پیش‌نمایش */}
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <Label className="text-sm text-gray-600 mb-2 block">پیش‌نمایش:</Label>
              <div className="flex items-center gap-3 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                  style={{ backgroundColor: newGroup.color }}
                >
                  {(() => {
                    const IconComponent = getIconComponent(newGroup.icon || "Building2")
                    return <IconComponent className="w-8 h-8" />
                  })()}
                </div>
                <span className="text-sm font-medium text-gray-700">{newGroup.title || "نام گروه"}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={cancelForm}>
                انصراف
              </Button>
              <Button
                onClick={editingGroup ? handleUpdateGroup : handleAddGroup}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 ml-2" />
                {editingGroup ? "ویرایش" : "اضافه کردن"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* لیست گروه‌ها */}
      <div className="space-y-4">
        {groups
          .sort((a, b) => a.order - b.order)
          .map((group) => {
            const IconComponent = getIconComponent(group.icon)
            return (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                      style={{ backgroundColor: group.color }}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{group.title}</h3>
                      <p className="text-gray-600 text-sm">لینک: {group.href}</p>
                      <p className="text-xs text-gray-500">ترتیب: {group.order}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={group.active ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleToggleActive(group.id)}
                        className={group.active ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {group.active ? <Eye className="w-4 h-4 ml-1" /> : <EyeOff className="w-4 h-4 ml-1" />}
                        {group.active ? "فعال" : "غیرفعال"}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditGroup(group)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteGroup(group.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/group-content/${group.id}`)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600"
                      >
                        <Settings className="w-4 h-4 ml-1" />
                        مدیریت محتوا
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
      </div>
    </div>
  )
}
