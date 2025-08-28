export interface User {
  id: string
  username: string
  fullName: string
  phone: string
  email?: string
  role: "admin" | "instant" | "system"
  status: "active" | "pending" | "suspended"
  createdAt: string
  lastLogin?: string
}

export interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: RegisterData) => Promise<boolean>
  isLoading: boolean
}

export interface RegisterData {
  username: string
  fullName: string
  phone: string
  email?: string
  password: string
  role: "instant" | "system"
}

export interface LoginCredentials {
  username: string
  password: string
}
