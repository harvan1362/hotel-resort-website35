"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquare, Send, Search, User, Mail, MailOpen, Reply, Plus } from "lucide-react"
import type { Message, MessageThread } from "@/lib/ticket-types"

// Mock data
const mockMessages: Message[] = [
  {
    id: "1",
    subject: "درخواست اطلاعات رزرو",
    content: "سلام، لطفاً اطلاعات رزرو اتاق 205 را برای من ارسال کنید.",
    senderId: "user1",
    senderName: "احمد محمدی",
    receiverId: "admin",
    receiverName: "مدیر سیستم",
    isRead: false,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    subject: "تشکر از خدمات",
    content: "سلام، می‌خواستم از خدمات عالی شما تشکر کنم. اقامت بسیار لذت‌بخشی داشتیم.",
    senderId: "user2",
    senderName: "فاطمه احمدی",
    receiverId: "admin",
    receiverName: "مدیر سیستم",
    isRead: true,
    createdAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    subject: "پاسخ: درخواست اطلاعات رزرو",
    content: "سلام آقای محمدی، اطلاعات رزرو شما در پیوست ارسال شده است.",
    senderId: "admin",
    senderName: "مدیر سیستم",
    receiverId: "user1",
    receiverName: "احمد محمدی",
    isRead: true,
    createdAt: "2024-01-15T11:15:00Z",
    parentId: "1",
  },
]

const mockThreads: MessageThread[] = [
  {
    id: "thread1",
    subject: "درخواست اطلاعات رزرو",
    participants: [
      { id: "user1", name: "احمد محمدی", role: "user" },
      { id: "admin", name: "مدیر سیستم", role: "admin" },
    ],
    lastMessage: mockMessages[2],
    unreadCount: 0,
    messages: [mockMessages[0], mockMessages[2]],
  },
  {
    id: "thread2",
    subject: "تشکر از خدمات",
    participants: [
      { id: "user2", name: "فاطمه احمدی", role: "user" },
      { id: "admin", name: "مدیر سیستم", role: "admin" },
    ],
    lastMessage: mockMessages[1],
    unreadCount: 0,
    messages: [mockMessages[1]],
  },
]

export function MessagesManagement() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [threads, setThreads] = useState<MessageThread[]>(mockThreads)
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [newMessage, setNewMessage] = useState({
    subject: "",
    content: "",
    receiverId: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const unreadCount = messages.filter((m) => !m.isRead && m.receiverId === "admin").length

  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedThread) return

    const newReply: Message = {
      id: Date.now().toString(),
      subject: `پاسخ: ${selectedThread.subject}`,
      content: replyMessage,
      senderId: "admin",
      senderName: "مدیر سیستم",
      receiverId: selectedThread.participants.find((p) => p.role === "user")?.id || "",
      receiverName: selectedThread.participants.find((p) => p.role === "user")?.name || "",
      isRead: false,
      createdAt: new Date().toISOString(),
      parentId: selectedThread.messages[0].id,
    }

    setMessages([...messages, newReply])

    // Update thread
    const updatedThread = {
      ...selectedThread,
      lastMessage: newReply,
      messages: [...selectedThread.messages, newReply],
    }

    setThreads(threads.map((t) => (t.id === selectedThread.id ? updatedThread : t)))
    setSelectedThread(updatedThread)
    setReplyMessage("")
  }

  const handleSendNewMessage = () => {
    if (!newMessage.subject.trim() || !newMessage.content.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      subject: newMessage.subject,
      content: newMessage.content,
      senderId: "admin",
      senderName: "مدیر سیستم",
      receiverId: newMessage.receiverId,
      receiverName: "کاربر", // در پروژه واقعی از API دریافت می‌شود
      isRead: false,
      createdAt: new Date().toISOString(),
    }

    setMessages([...messages, message])
    setNewMessage({ subject: "", content: "", receiverId: "" })
  }

  const markAsRead = (messageId: string) => {
    setMessages(messages.map((m) => (m.id === messageId ? { ...m, isRead: true } : m)))
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

  const filteredThreads = threads.filter(
    (thread) =>
      thread.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.participants.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">صندوق پیام‌ها</h1>
          <p className="text-gray-600">مدیریت پیام‌های دریافتی و ارسالی</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              پیام جدید
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ارسال پیام جدید</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">گیرنده</label>
                <Input
                  value={newMessage.receiverId}
                  onChange={(e) => setNewMessage({ ...newMessage, receiverId: e.target.value })}
                  placeholder="شناسه کاربر"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">موضوع</label>
                <Input
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  placeholder="موضوع پیام"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">متن پیام</label>
                <Textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  placeholder="متن پیام خود را بنویسید..."
                  rows={4}
                />
              </div>
              <Button onClick={handleSendNewMessage} className="w-full">
                <Send className="w-4 h-4 ml-2" />
                ارسال پیام
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* آمار سریع */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">کل پیام‌ها</p>
                <p className="text-xl font-bold">{messages.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">خوانده نشده</p>
                <p className="text-xl font-bold">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MailOpen className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">خوانده شده</p>
                <p className="text-xl font-bold">{messages.length - unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">مکالمات فعال</p>
                <p className="text-xl font-bold">{threads.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* لیست مکالمات */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>مکالمات</CardTitle>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="جستجو در پیام‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {filteredThreads.map((thread) => (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                    selectedThread?.id === thread.id ? "bg-blue-50 border-r-4 border-blue-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{thread.subject}</h4>
                        {thread.unreadCount > 0 && (
                          <Badge className="bg-red-100 text-red-800 text-xs">{thread.unreadCount}</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {thread.participants.find((p) => p.role === "user")?.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{thread.lastMessage.content}</p>
                    </div>
                    <span className="text-xs text-gray-400">{formatDate(thread.lastMessage.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* جزئیات مکالمه */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{selectedThread ? selectedThread.subject : "مکالمه‌ای انتخاب نشده"}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedThread ? (
              <div className="space-y-4">
                {/* پیام‌ها */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {selectedThread.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-lg ${
                        message.senderId === "admin"
                          ? "bg-blue-50 border-r-4 border-blue-500 mr-8"
                          : "bg-gray-50 border-r-4 border-gray-300 ml-8"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-sm">{message.senderName}</span>
                          {!message.isRead && message.receiverId === "admin" && (
                            <Badge className="bg-red-100 text-red-800 text-xs">جدید</Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{formatDate(message.createdAt)}</span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))}
                </div>

                {/* فرم پاسخ */}
                <div className="border-t pt-4">
                  <label className="text-sm font-medium text-gray-600">پاسخ</label>
                  <Textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="پاسخ خود را بنویسید..."
                    rows={3}
                    className="mt-2"
                  />
                  <Button onClick={handleSendReply} disabled={!replyMessage.trim()} className="mt-2">
                    <Reply className="w-4 h-4 ml-2" />
                    ارسال پاسخ
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">مکالمه‌ای انتخاب کنید</h3>
                <p className="text-gray-600">برای مشاهده پیام‌ها، یکی از مکالمات را انتخاب کنید</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
