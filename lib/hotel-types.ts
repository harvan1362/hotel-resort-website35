export interface Room {
  id: string
  number: string
  type: "single" | "double" | "suite" | "family"
  capacity: number
  price: number
  status: "available" | "occupied" | "maintenance" | "reserved"
  amenities: string[]
  description: string
  images: string[]
  createdAt: string
  updatedAt: string
}

export interface Reservation {
  id: string
  roomId: string
  guestName: string
  guestPhone: string
  guestEmail?: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "pending" | "confirmed" | "checked-in" | "checked-out" | "cancelled"
  specialRequests?: string
  createdAt: string
  updatedAt: string
}

export interface CompanyInfo {
  id: string
  name: string
  description: string
  logo: string
  address: string
  phone: string[]
  email: string
  website: string
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
}

export interface SliderItem {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  buttonText?: string
  buttonLink?: string
  order: number
  isActive: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  image: string
  price?: number
  isActive: boolean
  category: string
}

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  publishedAt: string
  isPublished: boolean
}

export interface Attraction {
  id: string
  title: string
  description: string
  image: string
  rating: number
  reviews: number
  distance: string
  category: string
  isActive: boolean
}
