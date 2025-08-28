"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Ticket,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Calendar,
  Send,
  Paperclip,
} from "lucide-react"
import type { Ticket as TicketType, TicketResponse } from "@/lib/ticket-types"

// Mock data
const mockTickets: TicketType[] = [
  {
    id: "1",
    title: "مشکل در رزرو اتاق",
    description: "سلام، من نمی‌توانم اتاق مورد نظرم را رزرو کنم. لطفاً کمک کنید.",
    category: "reservation",
    priority: "high",
    status: "open",
    userId: "user1",
    userName: "احمد محمدی",
    userEmail: "ahmad@example.com",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    responses: [],
  },
  {
    id: "2",
    title: "پیشنهاد بهبود سایت",
    description: "سلام، پیشنهاد می‌کنم که بخش نظرات کاربران را بهبود دهید.",
    category: "suggestion",
    priority: "medium",
    status: "in-progress",
    userId: "user2",
    userName: "فاطمه احمدی",
    userEmail: "fateme@example.com",
    assignedTo: "admin",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
    responses: [
      {
        id: "resp1",
        ticketId: "2",
        message: "سلام، ممنون از پیشنهادتان. در حال بررسی هستیم.",
        userId: "admin",
        userName: "مدیر سیستم",
        userRole: "admin",
        createdAt: "2024-01-15T09:15:00Z",
      },
    ],
  },
  {
    id: "3",
    title: "شکایت از خدمات",
    description: "متأسفانه از کیفیت خدمات رستوران راضی نبودم.",
    category: "complaint",
    priority: "urgent",
    status: "resolved",
    userId: "user3",
    userName: "علی رضایی",
    userEmail: "ali@example.com",
    assignedTo: "admin",
    createdAt: "2024-01-13T16:45:00Z",
    updatedAt: "2024-01-14T11:30:00Z",
    responses: [
      {
        id: "resp2",
        ticketId: "3",
        message: "سلام آقای رضایی، متأسفیم از این موضوع. لطفاً جزئیات بیشتری ارائه دهید.",
        userId: "admin",
        userName: "مدیر سیستم",
        userRole: "admin",
        createdAt: "2024-01-13T18:00:00Z",
      },
      {
        id: "resp3",
        ticketId: "3",
        message: "مشکل حل شد و با مدیر رستوران صحبت کردیم. ممنون از صبرتان.",
        userId: "admin",
        userName: "مدیر سیستم",
        userRole: "admin",
        createdAt: "2024-01-14T11:30:00Z",
      },
    ],
  },
]

const categories = [
  { value: "technical", label: "فنی", color: "bg-blue-100 text-blue-800" },
  { value: "reservation", label: "رزرو", color: "bg-green-100 text-green-800" },
  { value: "complaint", label: "شکایت", color: "bg-red-100 text-red-800" },
  { value: "suggestion", label: "پیشنهاد", color: "bg-purple-100 text-purple-800" },
  { value: "other", label: "سایر", color: "bg-gray-100 text-gray-800" },
]

const priorities = [
  { value: "low", label: "کم", color: "bg-gray-100 text-gray-800" },
  { value: "medium", label: "متوسط", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "بالا", color: "bg-orange-100 text-orange-800" },
  { value: "urgent", label: "فوری", color: "bg-red-100 text-red-800" },
]

const statuses = [
  { value: "open", label: "باز", color: "bg-blue-100 text-blue-800", icon: Clock },
  { value: "in-progress", label: "در حال بررسی", color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
  { value: "resolved", label: "حل شده", color: "bg-green-100 text-green-800", icon: CheckCircle },
  { value: "closed", label: "بسته", color: "bg-gray-100 text-gray-800", icon: XCircle },
]

export function TicketsManagement() {
  const [tickets, setTickets] = useState<TicketType[]>(mockTickets)
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null)
  const [responseMessage, setResponseMessage] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredTickets = filterStatus === "all" ? tickets : tickets.filter((ticket) => ticket.status === filterStatus)

  const handleStatusChange = (ticketId: string, newStatus: TicketType["status"]) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() } : ticket,
      ),
    )
  }

  const handleSendResponse = (ticketId: string) => {
    if (!responseMessage.trim()) return

    const newResponse: TicketResponse = {
      id: Date.now().toString(),
      ticketId,
      message: responseMessage,
      userId: "admin",
      userName: "مدیر سیستم",
      userRole: "admin",
      createdAt: new Date().toISOString(),
    }

    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              responses: [...ticket.responses, newResponse],
              status: "in-progress",
              updatedAt: new Date().toISOString(),
            }
          : ticket,
      ),
    )

    setResponseMessage("")
  }

  const getBadge = (value: string, type: "category" | "priority" | "status") => {
    let config
    switch (type) {
      case "category":
        config = categories.find((c) => c.value === value)
        break
      case "priority":
        config = priorities.find((p) => p.value === value)
        break
      case "status":
        config = statuses.find((s) => s.value === value)
        break
    }

    return (
      <Badge className={config?.color}>
        {type === "status" && config && <config.icon className="w-3 h-3 ml-1" />}
        {config?.label}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTicketStats = () => {
    return {
      total: tickets.length,
      open: tickets.filter((t) => t.status === "open").length,
      inProgress: tickets.filter((t) => t.status === "in-progress").length,
      resolved: tickets.filter((t) => t.status === "resolved").length,
    }
  }

  const stats = getTicketStats()

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">مدیریت تیکت‌ها</h1>
        <p className="text-gray-600">مشاهده و پاسخ به تیکت‌های کاربران</p>
      </div>

      {/* آمار سریع */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">کل تیکت‌ها</p>
                <p className="text-xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">باز</p>
                <p className="text-xl font-bold">{stats.open}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">در حال بررسی</p>
                <p className="text-xl font-bold">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">حل شده</p>
                <p className="text-xl font-bold">{stats.resolved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* فیلتر */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">فیلتر بر اساس وضعیت:</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* جدول تیکت‌ها */}
      <Card>
        <CardHeader>
          <CardTitle>لیست تیکت‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>عنوان</TableHead>
                <TableHead>کاربر</TableHead>
                <TableHead>دسته‌بندی</TableHead>
                <TableHead>اولویت</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>تاریخ ایجاد</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {ticket.userName}
                    </div>
                  </TableCell>
                  <TableCell>{getBadge(ticket.category, "category")}</TableCell>
                  <TableCell>{getBadge(ticket.priority, "priority")}</TableCell>
                  <TableCell>{getBadge(ticket.status, "status")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      {formatDate(ticket.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedTicket(ticket)}
                          className="bg-transparent"
                        >
                          <MessageSquare className="w-3 h-3 ml-1" />
                          مشاهده
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>جزئیات تیکت</DialogTitle>
                        </DialogHeader>
                        {selectedTicket && (
                          <div className="space-y-6">
                            {/* اطلاعات تیکت */}
                            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                              <div>
                                <label className="text-sm font-medium text-gray-600">عنوان</label>
                                <p className="text-lg font-medium">{selectedTicket.title}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">کاربر</label>
                                <p className="text-lg">{selectedTicket.userName}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">دسته‌بندی</label>
                                <div className="mt-1">{getBadge(selectedTicket.category, "category")}</div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">اولویت</label>
                                <div className="mt-1">{getBadge(selectedTicket.priority, "priority")}</div>
                              </div>
                            </div>

                            {/* توضیحات */}
                            <div>
                              <label className="text-sm font-medium text-gray-600">توضیحات</label>
                              <p className="mt-2 p-4 bg-gray-50 rounded-lg">{selectedTicket.description}</p>
                            </div>

                            {/* تغییر وضعیت */}
                            <div className="flex items-center gap-4">
                              <label className="text-sm font-medium text-gray-600">تغییر وضعیت:</label>
                              <Select
                                value={selectedTicket.status}
                                onValueChange={(value: TicketType["status"]) =>
                                  handleStatusChange(selectedTicket.id, value)
                                }
                              >
                                <SelectTrigger className="w-48">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {statuses.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                      {status.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* پاسخ‌ها */}
                            <div>
                              <h3 className="text-lg font-medium mb-4">پاسخ‌ها</h3>
                              <div className="space-y-4 max-h-60 overflow-y-auto">
                                {selectedTicket.responses.map((response) => (
                                  <div
                                    key={response.id}
                                    className={`p-4 rounded-lg ${
                                      response.userRole === "admin"
                                        ? "bg-blue-50 border-r-4 border-blue-500"
                                        : "bg-gray-50 border-r-4 border-gray-300"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-medium">{response.userName}</span>
                                      <span className="text-sm text-gray-500">{formatDate(response.createdAt)}</span>
                                    </div>
                                    <p>{response.message}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* ارسال پاسخ */}
                            <div>
                              <label className="text-sm font-medium text-gray-600">پاسخ جدید</label>
                              <Textarea
                                value={responseMessage}
                                onChange={(e) => setResponseMessage(e.target.value)}
                                placeholder="پاسخ خود را بنویسید..."
                                rows={4}
                                className="mt-2"
                              />
                              <div className="flex gap-2 mt-4">
                                <Button
                                  onClick={() => handleSendResponse(selectedTicket.id)}
                                  disabled={!responseMessage.trim()}
                                >
                                  <Send className="w-4 h-4 ml-2" />
                                  ارسال پاسخ
                                </Button>
                                <Button variant="outline" className="bg-transparent">
                                  <Paperclip className="w-4 h-4 ml-2" />
                                  پیوست
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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
