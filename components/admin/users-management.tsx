"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Users, Plus, Edit, Trash2, Save, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  username: string
  email: string
  phone: string
  type: "staff" | "customer" | "instant"
  role?: "admin" | "manager" | "employee"
  status: "active" | "inactive" | "pending"
  permissions: string[]
  createdAt: string
}

const staffRoles = [
  { value: "admin", label: "مدیر سیستم" },
  { value: "manager", label: "مدیر هتل" },
  { value: "employee", label: "کارمند" },
]

const permissions = [
  { value: "users", label: "مدیریت کاربران" },
  { value: "content", label: "مدیریت محتوا" },
  { value: "hotel", label: "نرم‌افزار هتل" },
  { value: "tickets", label: "مدیریت تیکت‌ها" },
  { value: "messages", label: "مدیریت پیام‌ها" },
  { value: "reports", label: "گزارش‌گیری" },
]

export function UsersManagement() {
  const router = useRouter()
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("pending")

  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    username: "",
    email: "",
    phone: "",
    type: "customer",
    role: "employee",
    permissions: [],
  })

  // بارگذاری کاربران از localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem("users")
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    } else {
      // کاربران پیش‌فرض
      const defaultUsers: User[] = [
        {
          id: "1",
          name: "مدیر سیستم",
          username: "admin",
          email: "admin@hotel.com",
          phone: "09123456789",
          type: "staff",
          role: "admin",
          status: "active",
          permissions: ["users", "content", "hotel", "tickets", "messages", "reports"],
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "مدیر هتل",
          username: "manager",
          email: "manager@hotel.com",
          phone: "09123456788",
          type: "staff",
          role: "manager",
          status: "active",
          permissions: ["hotel", "tickets", "messages", "reports"],
          createdAt: new Date().toISOString(),
        },
      ]
      setUsers(defaultUsers)
      localStorage.setItem("users", JSON.stringify(defaultUsers))
    }
  }, [])

  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  }

  const handleAddUser = () => {
    if (!newUser.name || !newUser.username || !newUser.email) {
      toast({
        title: "خطا",
        description: "لطفاً فیلدهای ضروری را پر کنید",
        variant: "destructive",
      })
      return
    }

    const user: User = {
      id: Date.now().toString(),
      name: newUser.name!,
      username: newUser.username!,
      email: newUser.email!,
      phone: newUser.phone || "",
      type: newUser.type!,
      role: newUser.type === "staff" ? newUser.role : undefined,
      status: newUser.type === "instant" ? "active" : "pending",
      permissions: newUser.type === "staff" ? newUser.permissions || [] : [],
      createdAt: new Date().toISOString(),
    }

    const updatedUsers = [...users, user]
    saveUsers(updatedUsers)

    setNewUser({
      name: "",
      username: "",
      email: "",
      phone: "",
      type: "customer",
      role: "employee",
      permissions: [],
    })
    setShowAddForm(false)

    toast({
      title: "موفق",
      description: "کاربر جدید اضافه شد",
    })
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setNewUser({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      type: user.type,
      role: user.role,
      permissions: user.permissions,
    })
    setShowAddForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleUpdateUser = () => {
    if (!editingUser || !newUser.name || !newUser.username || !newUser.email) {
      toast({
        title: "خطا",
        description: "لطفاً فیلدهای ضروری را پر کنید",
        variant: "destructive",
      })
      return
    }

    const updatedUsers = users.map((user) =>
      user.id === editingUser.id
        ? {
            ...user,
            name: newUser.name!,
            username: newUser.username!,
            email: newUser.email!,
            phone: newUser.phone || "",
            type: newUser.type!,
            role: newUser.type === "staff" ? newUser.role : undefined,
            permissions: newUser.type === "staff" ? newUser.permissions || [] : [],
          }
        : user,
    )

    saveUsers(updatedUsers)

    setEditingUser(null)
    setNewUser({
      name: "",
      username: "",
      email: "",
      phone: "",
      type: "customer",
      role: "employee",
      permissions: [],
    })
    setShowAddForm(false)

    toast({
      title: "موفق",
      description: "کاربر ویرایش شد",
    })
  }

  const handleDeleteUser = (id: string) => {
    if (window.confirm("آیا از حذف این کاربر اطمینان دارید؟")) {
      const updatedUsers = users.filter((user) => user.id !== id)
      saveUsers(updatedUsers)

      toast({
        title: "موفق",
        description: "کاربر حذف شد",
      })
    }
  }

  const handleToggleStatus = (id: string) => {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? { ...user, status: user.status === "active" ? "inactive" : ("active" as "active" | "inactive") }
        : user,
    )
    saveUsers(updatedUsers)

    toast({
      title: "موفق",
      description: "وضعیت کاربر تغییر کرد",
    })
  }

  const handleApproveUser = (id: string) => {
    const updatedUsers = users.map((user) => (user.id === id ? { ...user, status: "active" as const } : user))
    saveUsers(updatedUsers)

    toast({
      title: "موفق",
      description: "کاربر تایید شد",
    })
  }

  const cancelForm = () => {
    setShowAddForm(false)
    setEditingUser(null)
    setNewUser({
      name: "",
      username: "",
      email: "",
      phone: "",
      type: "customer",
      role: "employee",
      permissions: [],
    })
  }

  const pendingUsers = users.filter((user) => user.status === "pending")
  const staffUsers = users.filter((user) => user.type === "staff")
  const customerUsers = users.filter((user) => user.type === "customer" || user.type === "instant")

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowRight className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold">مدیریت کاربران</h1>
        </div>
      </div>

      {/* دکمه افزودن کاربر */}
      {!showAddForm && (
        <div className="flex justify-end">
          <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 ml-2" />
            افزودن کاربر جدید
          </Button>
        </div>
      )}

      {/* فرم اضافه/ویرایش کردن کاربر */}
      {showAddForm && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {editingUser ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {editingUser ? "ویرایش کاربر" : "اضافه کردن کاربر جدید"}
            </CardTitle>
            {editingUser && <p className="text-sm text-blue-600">در حال ویرایش کاربر: {editingUser.name}</p>}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">نام و نام خانوادگی *</Label>
                <Input
                  id="name"
                  value={newUser.name || ""}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="نام کامل کاربر"
                />
              </div>
              <div>
                <Label htmlFor="username">نام کاربری *</Label>
                <Input
                  id="username"
                  value={newUser.username || ""}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  placeholder="نام کاربری"
                />
              </div>
              <div>
                <Label htmlFor="email">ایمیل *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email || ""}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">شماره تماس</Label>
                <Input
                  id="phone"
                  value={newUser.phone || ""}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                />
              </div>
              <div>
                <Label>نوع کاربر</Label>
                <Select
                  value={newUser.type}
                  onValueChange={(value: "staff" | "customer" | "instant") => setNewUser({ ...newUser, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="نوع کاربر را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">کارکنان</SelectItem>
                    <SelectItem value="customer">کاربران سیستم (شرکا)</SelectItem>
                    <SelectItem value="instant">کاربران فوری</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newUser.type === "staff" && (
                <div>
                  <Label>سطح دسترسی</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value: "admin" | "manager" | "employee") => setNewUser({ ...newUser, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="سطح دسترسی را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffRoles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {newUser.type === "staff" && (
              <div className="mt-4">
                <Label>مجوزهای دسترسی</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {permissions.map((permission) => (
                    <label key={permission.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newUser.permissions?.includes(permission.value) || false}
                        onChange={(e) => {
                          const currentPermissions = newUser.permissions || []
                          if (e.target.checked) {
                            setNewUser({ ...newUser, permissions: [...currentPermissions, permission.value] })
                          } else {
                            setNewUser({
                              ...newUser,
                              permissions: currentPermissions.filter((p) => p !== permission.value),
                            })
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{permission.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={cancelForm}>
                انصراف
              </Button>
              <Button
                onClick={editingUser ? handleUpdateUser : handleAddUser}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 ml-2" />
                {editingUser ? "ویرایش" : "اضافه کردن"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* تب‌های مدیریت کاربران */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">در انتظار تایید ({pendingUsers.length})</TabsTrigger>
          <TabsTrigger value="staff">کارکنان ({staffUsers.length})</TabsTrigger>
          <TabsTrigger value="customers">کاربران ({customerUsers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingUsers.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">هیچ کاربری در انتظار تایید نیست</CardContent>
            </Card>
          ) : (
            pendingUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">{user.name}</h3>
                      <p className="text-sm text-gray-600">
                        @{user.username} • {user.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        نوع: {user.type === "customer" ? "کاربر سیستم" : "کاربر فوری"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApproveUser(user.id)}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        تایید
                      </Button>
                      <Button variant="outline" onClick={() => handleDeleteUser(user.id)} size="sm">
                        رد
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          {staffUsers.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">{user.name}</h3>
                    <p className="text-sm text-gray-600">
                      @{user.username} • {user.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      سطح: {staffRoles.find((r) => r.value === user.role)?.label} • مجوزها: {user.permissions.length}{" "}
                      مورد
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={user.status === "active" ? "default" : "outline"}
                      onClick={() => handleToggleStatus(user.id)}
                      size="sm"
                      className={user.status === "active" ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {user.status === "active" ? (
                        <Eye className="w-4 h-4 ml-1" />
                      ) : (
                        <EyeOff className="w-4 h-4 ml-1" />
                      )}
                      {user.status === "active" ? "فعال" : "غیرفعال"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          {customerUsers.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">{user.name}</h3>
                    <p className="text-sm text-gray-600">
                      @{user.username} • {user.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      نوع: {user.type === "instant" ? "کاربر فوری" : "کاربر سیستم"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={user.status === "active" ? "default" : "outline"}
                      onClick={() => handleToggleStatus(user.id)}
                      size="sm"
                      className={user.status === "active" ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {user.status === "active" ? (
                        <Eye className="w-4 h-4 ml-1" />
                      ) : (
                        <EyeOff className="w-4 h-4 ml-1" />
                      )}
                      {user.status === "active" ? "فعال" : "غیرفعال"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
