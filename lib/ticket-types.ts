export interface Ticket {
  id: string
  title: string
  description: string
  category: "technical" | "reservation" | "complaint" | "suggestion" | "other"
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in-progress" | "resolved" | "closed"
  userId: string
  userName: string
  userEmail?: string
  assignedTo?: string
  attachments?: string[]
  createdAt: string
  updatedAt: string
  responses: TicketResponse[]
}

export interface TicketResponse {
  id: string
  ticketId: string
  message: string
  userId: string
  userName: string
  userRole: "user" | "admin"
  attachments?: string[]
  createdAt: string
}

export interface Message {
  id: string
  subject: string
  content: string
  senderId: string
  senderName: string
  receiverId: string
  receiverName: string
  isRead: boolean
  attachments?: string[]
  createdAt: string
  parentId?: string // برای پاسخ‌ها
}

export interface MessageThread {
  id: string
  subject: string
  participants: {
    id: string
    name: string
    role: string
  }[]
  lastMessage: Message
  unreadCount: number
  messages: Message[]
}
