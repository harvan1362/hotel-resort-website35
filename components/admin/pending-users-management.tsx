"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, Eye, UserCheck, Clock, Phone, Mail, Plus, Edit, Trash2, UserCog } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { User } from "@/lib/types"

// Mock data for pending users
const mockPendingUsers: User[] = [
  {
    id: "pending-1",
    username: "hotel_manager_1",
    fullName: "محمد رضایی",
    phone: "09123456789",
    email: "m.rezaei@example.com",
    role: "system",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "pending-2",
    username: "restaurant_partner",
    fullName: "فاطمه احمدی",
    phone: "09987654321",
    email: "f.ahmadi@example.com",
    role: "system",
    status: "pending",
    createdAt: "2024-01-14T14:20:00Z",
  },
]

interface Staff {
  id: string
  username: string
  fullName: string
  phone: string
  email: string
  role: "admin" | "manager" | "staff"
  department: string
  accessLevel: string
  active: boolean
  createdAt: string
}

const mockStaff: Staff[] = [
  {
    id: "staff-1",
    username: "admin",
    fullName: "مدیر سیستم",
    phone: "09123456789",
    email: "admin@example.com",
    role: "admin",
    department: "مدیریت",
    accessLevel: "کامل",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "staff-2",
    username: "manager",
    fullName: "مدیر هتل",
    phone: "09987654321",
    email: "manager@example.com",
    role: "manager",
    department: "هتل",
    accessLevel: "محدود",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export function PendingUsersManagement() {
  const { toast } = useToast()
  const [pendingUsers, setPendingUsers] = useState<User[]>(mockPendingUsers)
  const [staff, setStaff] = useState<Staff[]>(mockStaff)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showAddStaff, setShowAddStaff] = useState(false)
  const [newStaff, setNewStaff] = useState<Partial<Staff>>({
    username: "",
    fullName: "",
    phone: "",
    email: "",
    role: "staff",
    department: "",
    accessLevel: "محدود",
  })

  const handleApprove = (userId: string) => {
    setPendingUsers((users) => users.filter((user) => user.id !== userId))
    toast({
      title: "موفق",
      description: "کاربر با موفقیت تایید شد",
    })
  }

  const handleReject = (userId: string) => {
    setPendingUsers((users) => users.filter((user) => user.id !== userId))
    toast({
      title: "موفق",
      description: "درخواست کاربر رد شد",
    })
  }

  const handleAddStaff = () => {
    if (!newStaff.username || !newStaff.fullName || !newStaff.phone) {
      toast({
        title: "خطا",
        description: "لطفاً فیلدهای ضروری را پر کنید",
        variant: "destructive",
      })
      return
    }

    const staffMember: Staff = {
      id: Date.now().toString(),
      username: newStaff.username!,
      fullName: newStaff.fullName!,
      phone: newStaff.phone!,
      email: newStaff.email || "",
      role: newStaff.role as "admin" | "manager" | "staff",
      department: newStaff.department || "",
      accessLevel: newStaff.accessLevel || "محدود",
      active: true,
      createdAt: new Date().toISOString(),
    }

    setStaff([...staff, staffMember])
    setNewStaff({
      username: "",
      fullName: "",
      phone: "",
      email: "",
      role: "staff",
      department: "",
      accessLevel: "محدود",
    })
    setShowAddStaff(false)

    toast({
      title: "موفق",
      description: "کارمند جدید اضافه شد",
    })
  }

  const handleToggleStaffActive = (id: string) => {
    setStaff(staff.map((s) => (s.id === id ? { ...s, active: !s.active } : s)))
  }

  const handleDeleteStaff = (id: string) => {
    setStaff(staff.filter((s) => s.id !== id))
    toast({
      title: "موفق",
      description: "کارمند حذف شد",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fa-IR")
  }

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours} ساعت پیش`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} روز پیش`
    }
  }

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مدیریت کاربران</h1>
          <p className="text-gray-600">مدیریت کاربران سیستم و کارکنان</p>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            کاربران در انتظار ({pendingUsers.length})
          </TabsTrigger>
          <TabsTrigger value="staff" className="flex items-center gap-2">
            <UserCog className="w-4 h-4" />
            کارکنان ({staff.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          {/* آمار سریع */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">در انتظار تایید</p>
                    <p className="text-xl font-bold">{pendingUsers.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">تایید شده امروز</p>
                    <p className="text-xl font-bold">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <X className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">رد شده امروز</p>
                    <p className="text-xl font-bold">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* جدول کاربران در انتظار */}
          <Card>
            <CardHeader>
              <CardTitle>لیست کاربران در انتظار تایید</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingUsers.length === 0 ? (
                <div className="text-center py-8">
                  <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ کاربری در انتظار تایید نیست</h3>
                  <p className="text-gray-600">تمام درخواست‌ها بررسی شده‌اند</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نام کامل</TableHead>
                      <TableHead>نام کاربری</TableHead>
                      <TableHead>شماره تماس</TableHead>
                      <TableHead>ایمیل</TableHead>
                      <TableHead>تاریخ درخواست</TableHead>
                      <TableHead>مدت انتظار</TableHead>
                      <TableHead>عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.fullName}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            {user.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.email ? (
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-gray-400" />
                              {user.email}
                            </div>
                          ) : (
                            <span className="text-gray-400">ندارد</span>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            {getTimeSince(user.createdAt)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedUser(user)}
                                  className="bg-transparent"
                                >
                                  <Eye className="w-3 h-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>جزئیات کاربر</DialogTitle>
                                </DialogHeader>
                                {selectedUser && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">نام کامل</label>
                                        <p className="text-lg">{selectedUser.fullName}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">نام کاربری</label>
                                        <p className="text-lg">{selectedUser.username}</p>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">شماره تماس</label>
                                        <p className="text-lg">{selectedUser.phone}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">ایمیل</label>
                                        <p className="text-lg">{selectedUser.email || "ندارد"}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">تاریخ درخواست</label>
                                      <p className="text-lg">{formatDate(selectedUser.createdAt)}</p>
                                    </div>
                                    <div className="flex gap-2 pt-4">
                                      <Button
                                        onClick={() => {
                                          handleApprove(selectedUser.id)
                                          setSelectedUser(null)
                                        }}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <Check className="w-4 h-4 ml-2" />
                                        تایید
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() => {
                                          handleReject(selectedUser.id)
                                          setSelectedUser(null)
                                        }}
                                        className="bg-transparent text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                                      >
                                        <X className="w-4 h-4 ml-2" />
                                        رد
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(user.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(user.id)}
                              className="bg-transparent text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          {/* دکمه افزودن کارمند */}
          <div className="flex justify-end">
            <Button onClick={() => setShowAddStaff(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 ml-2" />
              افزودن کارمند جدید
            </Button>
          </div>

          {/* فرم افزودن کارمند */}
          {showAddStaff && (
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  افزودن کارمند جدید
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="staffUsername">نام کاربری</Label>
                    <Input
                      id="staffUsername"
                      value={newStaff.username || ""}
                      onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value })}
                      placeholder="نام کاربری"
                    />
                  </div>
                  <div>
                    <Label htmlFor="staffFullName">نام کامل</Label>
                    <Input
                      id="staffFullName"
                      value={newStaff.fullName || ""}
                      onChange={(e) => setNewStaff({ ...newStaff, fullName: e.target.value })}
                      placeholder="نام و نام خانوادگی"
                    />
                  </div>
                  <div>
                    <Label htmlFor="staffPhone">شماره تماس</Label>
                    <Input
                      id="staffPhone"
                      value={newStaff.phone || ""}
                      onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                      placeholder="09123456789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="staffEmail">ایمیل</Label>
                    <Input
                      id="staffEmail"
                      value={newStaff.email || ""}
                      onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <Label>نقش</Label>
                    <Select
                      value={newStaff.role}
                      onValueChange={(value) => setNewStaff({ ...newStaff, role: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="نقش را انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">مدیر سیستم</SelectItem>
                        <SelectItem value="manager">مدیر هتل</SelectItem>
                        <SelectItem value="staff">کارمند</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="staffDepartment">بخش</Label>
                    <Input
                      id="staffDepartment"
                      value={newStaff.department || ""}
                      onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                      placeholder="نام بخش"
                    />
                  </div>
                  <div>
                    <Label>سطح دسترسی</Label>
                    <Select
                      value={newStaff.accessLevel}
                      onValueChange={(value) => setNewStaff({ ...newStaff, accessLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="سطح دسترسی" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="کامل">کامل</SelectItem>
                        <SelectItem value="محدود">محدود</SelectItem>
                        <SelectItem value="فقط خواندنی">فقط خواندنی</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowAddStaff(false)}>
                    انصراف
                  </Button>
                  <Button onClick={handleAddStaff} className="bg-green-600 hover:bg-green-700">
                    افزودن کارمند
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* جدول کارکنان */}
          <Card>
            <CardHeader>
              <CardTitle>لیست کارکنان</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>نام کامل</TableHead>
                    <TableHead>نام کاربری</TableHead>
                    <TableHead>نقش</TableHead>
                    <TableHead>بخش</TableHead>
                    <TableHead>سطح دسترسی</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.fullName}</TableCell>
                      <TableCell>{member.username}</TableCell>
                      <TableCell>
                        <Badge variant={member.role === "admin" ? "default" : "secondary"}>
                          {member.role === "admin" ? "مدیر سیستم" : member.role === "manager" ? "مدیر هتل" : "کارمند"}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>
                        <Badge variant={member.accessLevel === "کامل" ? "default" : "outline"}>
                          {member.accessLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={member.active ? "default" : "secondary"}
                          className={member.active ? "bg-green-600" : ""}
                        >
                          {member.active ? "فعال" : "غیرفعال"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleToggleStaffActive(member.id)}>
                            {member.active ? "غیرفعال" : "فعال"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          {member.role !== "admin" && (
                            <Button variant="outline" size="sm" onClick={() => handleDeleteStaff(member.id)}>
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
