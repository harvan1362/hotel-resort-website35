"use client"

import { useEffect } from "react"
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

const iconMap = {
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
}

const defaultServices: ServiceGroup[] = [
  {
    id: "1",
    title: "هتل",
    icon: "Building2",
    color: "#8b5cf6",
    href: "/rooms",
    active: true,
    order: 1,
  },
  {
    id: "2",
    title: "رستوران",
    icon: "UtensilsCrossed",
    color: "#f97316",
    href: "/services#restaurant",
    active: true,
    order: 2,
  },
  {
    id: "3",
    title: "کافه",
    icon: "Coffee",
    color: "#f59e0b",
    href: "/services#cafe",
    active: true,
    order: 3,
  },
  {
    id: "4",
    title: "فست‌فود",
    icon: "Zap",
    color: "#ef4444",
    href: "/services#fastfood",
    active: true,
    order: 4,
  },
  {
    id: "5",
    title: "کباب",
    icon: "ChefHat",
    color: "#22c55e",
    href: "/services#kebab",
    active: true,
    order: 5,
  },
  {
    id: "6",
    title: "جاذبه‌های گردشگری",
    icon: "MapPin",
    color: "#3b82f6",
    href: "/#attractions",
    active: true,
    order: 6,
  },
]

export function ServicesSection() {
  const [services, setServices, isLoaded] = useLocalStorage<ServiceGroup[]>("serviceGroups", defaultServices)

  useEffect(() => {
    const handleStorageUpdate = (event: CustomEvent) => {
      setServices(event.detail)
    }

    window.addEventListener(`localStorage-serviceGroups` as any, handleStorageUpdate)

    return () => {
      window.removeEventListener(`localStorage-serviceGroups` as any, handleStorageUpdate)
    }
  }, [setServices])

  if (!isLoaded) {
    return (
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-3 p-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-200 animate-pulse" />
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const activeServices = services.filter((service) => service.active).sort((a, b) => a.order - b.order)

  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Building2
  }

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {activeServices.map((service) => {
            const Icon = getIconComponent(service.icon)
            return (
              <a
                key={service.id}
                href={`/group/${service.id}`}
                className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 text-white"
                  style={{ backgroundColor: service.color }}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-gray-900 transition-colors">
                  {service.title}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
