"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Eye, Bed, Users, DollarSign } from "lucide-react"
import type { Room } from "@/lib/hotel-types"

// Mock data
const mockRooms: Room[] = [
  {
    id: "1",
    number: "101",
    type: "single",
    capacity: 1,
    price: 1500000,
    status: "available",
    amenities: ["WiFi", "تلویزیون", "یخچال", "کولر"],
    description: "اتاق تک نفره با نمای دریا",
    images: ["/room-single.jpg"],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    number: "102",
    type: "double",
    capacity: 2,
    price: 2500000,
    status: "occupied",
    amenities: ["WiFi", "تلویزیون", "یخچال", "کولر", "بالکن"],
    description: "اتاق دو نفره با امکانات کامل",
    images: ["/room-double.jpg"],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "3",
    number: "201",
    type: "suite",
    capacity: 4,
    price: 4500000,
    status: "maintenance",
    amenities: ["WiFi", "تلویزیون", "یخچال", "کولر", "بالکن", "جکوزی"],
    description: "سوئیت لوکس با نمای دریا",
    images: ["/room-suite.jpg"],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
]

const roomTypes = [
  { value: "single", label: "تک نفره" },
  { value: "double", label: "دو نفره" },
  { value: "suite", label: "سوئیت" },
  { value: "family", label: "خانوادگی" },
]

const roomStatuses = [
  { value: "available", label: "آزاد", color: "bg-green-100 text-green-800" },
  { value: "occupied", label: "اشغال", color: "bg-red-100 text-red-800" },
  { value: "maintenance", label: "تعمیر", color: "bg-yellow-100 text-yellow-800" },
  { value: "reserved", label: "رزرو", color: "bg-blue-100 text-blue-800" },
]

export function RoomsManagement() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [formData, setFormData] = useState({
    number: "",
    type: "single" as Room["type"],
    capacity: 1,
    price: 0,
    status: "available" as Room["status"],
    amenities: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const roomData: Room = {
      id: editingRoom?.id || Date.now().toString(),
      number: formData.number,
      type: formData.type,
      capacity: formData.capacity,
      price: formData.price,
      status: formData.status,
      amenities: formData.amenities.split(",").map((a) => a.trim()),
      description: formData.description,
      images: [],
      createdAt: editingRoom?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (editingRoom) {
      setRooms(rooms.map((room) => (room.id === editingRoom.id ? roomData : room)))
    } else {
      setRooms([...rooms, roomData])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      number: "",
      type: "single",
      capacity: 1,
      price: 0,
      status: "available",
      amenities: "",
      description: "",
    })
    setEditingRoom(null)
    setIsAddDialogOpen(false)
  }

  const handleEdit = (room: Room) => {
    setEditingRoom(room)
    setFormData({
      number: room.number,
      type: room.type,
      capacity: room.capacity,
      price: room.price,
      status: room.status,
      amenities: room.amenities.join(", "),
      description: room.description,
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (roomId: string) => {
    setRooms(rooms.filter((room) => room.id !== roomId))
  }

  const getStatusBadge = (status: Room["status"]) => {
    const statusConfig = roomStatuses.find((s) => s.value === status)
    return <Badge className={statusConfig?.color}>{statusConfig?.label}</Badge>
  }

  const getRoomTypeLabel = (type: Room["type"]) => {
    return roomTypes.find((t) => t.value === type)?.label || type
  }

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مدیریت اتاق‌ها</h1>
          <p className="text-gray-600">مدیریت اتاق‌های مجتمع اقامتی</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              اتاق جدید
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingRoom ? "ویرایش اتاق" : "افزودن اتاق جدید"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="number">شماره اتاق</Label>
                  <Input
                    id="number"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">نوع اتاق</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: Room["type"]) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacity">ظرفیت</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">قیمت (تومان)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">وضعیت</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Room["status"]) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amenities">امکانات (با کاما جدا کنید)</Label>
                <Input
                  id="amenities"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  placeholder="WiFi, تلویزیون, یخچال"
                />
              </div>

              <div>
                <Label htmlFor="description">توضیحات</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit">{editingRoom ? "ویرایش" : "افزودن"}</Button>
                <Button type="button" variant="outline" onClick={resetForm} className="bg-transparent">
                  انصراف
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* آمار سریع */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">کل اتاق‌ها</p>
                <p className="text-xl font-bold">{rooms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">آزاد</p>
                <p className="text-xl font-bold">{rooms.filter((r) => r.status === "available").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">اشغال</p>
                <p className="text-xl font-bold">{rooms.filter((r) => r.status === "occupied").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">متوسط قیمت</p>
                <p className="text-xl font-bold">
                  {Math.round(rooms.reduce((sum, room) => sum + room.price, 0) / rooms.length / 1000)}K
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* جدول اتاق‌ها */}
      <Card>
        <CardHeader>
          <CardTitle>لیست اتاق‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>شماره</TableHead>
                <TableHead>نوع</TableHead>
                <TableHead>ظرفیت</TableHead>
                <TableHead>قیمت</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.number}</TableCell>
                  <TableCell>{getRoomTypeLabel(room.type)}</TableCell>
                  <TableCell>{room.capacity} نفر</TableCell>
                  <TableCell>{room.price.toLocaleString()} تومان</TableCell>
                  <TableCell>{getStatusBadge(room.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(room)} className="bg-transparent">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(room.id)}
                        className="bg-transparent text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
