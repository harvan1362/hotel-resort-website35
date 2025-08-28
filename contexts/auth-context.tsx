"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, AuthContextType, RegisterData } from "@/lib/types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock API functions - در پروژه واقعی با بک‌اند Flask/SQLite جایگزین می‌شود
const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    fullName: "مدیر سیستم",
    phone: "09123456789",
    email: "admin@daryakanar.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-15",
  },
  {
    id: "2",
    username: "manager",
    fullName: "مدیر هتل",
    phone: "09123456788",
    email: "manager@daryakanar.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-14",
  },
]

const mockLogin = async (username: string, password: string): Promise<User | null> => {
  // شبیه‌سازی تاخیر شبکه
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((u) => u.username === username)
  if (user && password === "123456") {
    return { ...user, lastLogin: new Date().toISOString() }
  }
  return null
}

const mockRegister = async (userData: RegisterData): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newUser: User = {
    id: Date.now().toString(),
    username: userData.username,
    fullName: userData.fullName,
    phone: userData.phone,
    email: userData.email,
    role: userData.role,
    status: userData.role === "instant" ? "active" : "pending",
    createdAt: new Date().toISOString(),
  }

  mockUsers.push(newUser)
  return newUser
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // بررسی وجود کاربر در localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const loggedInUser = await mockLogin(username, password)
      if (loggedInUser) {
        setUser(loggedInUser)
        localStorage.setItem("user", JSON.stringify(loggedInUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)
    try {
      const newUser = await mockRegister(userData)
      if (userData.role === "instant") {
        // کاربران فوری بلافاصله وارد می‌شوند
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
      }
      return true
    } catch (error) {
      console.error("Register error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
