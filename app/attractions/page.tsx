"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, X, Home } from "lucide-react"
import Link from "next/link"

interface Attraction {
  id: string
  title: string
  description: string
  image: string
  rating: number
  reviews: number
  distance: string
  category: string
  active: boolean
}

const defaultAttractions = [
  {
    id: "1",
    title: "کوه‌های هرمز",
    description: "کوه‌های رنگارنگ با منظره‌ای دیدنی از خلیج فارس و جزایر اطراف",
    image: "/hormuz-mountains-gulf.png",
    rating: 5,
    reviews: 12,
    distance: "۵ کیلومتر",
    category: "جاذبه گردشگری",
    active: true,
  },
  {
    id: "2",
    title: "ساحل طلایی بندر مقام",
    description: "ساحل زیبا با شن‌های طلایی و آب‌های فیروزه‌ای، مناسب برای شنا و ماهیگیری",
    image: "/tropical-beach-paradise.png",
    rating: 5,
    reviews: 12,
    distance: "۵ کیلومتر",
    category: "جاذبه گردشگری",
    active: true,
  },
  {
    id: "3",
    title: "جنگل حرا بندر مقام",
    description: "جنگل منحصر به فرد ماندرو با تنوع زیستی بی‌نظیر و مناظر خیره‌کننده",
    image: "/diverse-mangrove-vista.png",
    rating: 5,
    reviews: 12,
    distance: "۵ کیلومتر",
    category: "جاذبه گردشگری",
    active: true,
  },
  {
    id: "4",
    title: "پل معلق بندر مقام",
    description: "پل زیبا و تاریخی که نمای فوق‌العاده‌ای از دریا و فارس ارائه می‌دهد",
    image: "/placeholder-z85cv.png",
    rating: 5,
    reviews: 12,
    distance: "۵ کیلومتر",
    category: "جاذبه گردشگری",
    active: true,
  },
  {
    id: "5",
    title: "ساحل مکسر",
    description: "ساحل زیبا با صخره‌های شگفت‌انگیز که در اثر فرسایش امواج به اشکال گوناگون درآمده‌اند",
    image: "/maksar-beach-rocks.png",
    rating: 5,
    reviews: 15,
    distance: "۲۰ کیلومتر",
    category: "ساحل",
    active: true,
  },
  {
    id: "6",
    title: "گردنه عشاق",
    description: "گردنه رمانتیک با چشم‌اندازهای خیره‌کننده از کوه‌ها، دریا و طبیعت بکر",
    image: "/gardaneh-oshagh-romantic.png",
    rating: 4,
    reviews: 8,
    distance: "۳۵ کیلومتر",
    category: "کوهستان",
    active: true,
  },
]

export default function AttractionsPage() {
  const [attractions, setAttractions] = useState<Attraction[]>(defaultAttractions)
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null)

  useEffect(() => {
    const savedAttractions = localStorage.getItem("attractionsData")
    if (savedAttractions) {
      const parsedAttractions: Attraction[] = JSON.parse(savedAttractions)
      setAttractions(parsedAttractions.filter((attraction) => attraction.active))
    }
  }, [])

  const handleViewDetails = (attraction: Attraction) => {
    setSelectedAttraction(attraction)
  }

  const closeModal = () => {
    setSelectedAttraction(null)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 ml-2" />
                بازگشت به خانه
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 font-serif">تمام جاذبه‌های منطقه</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {attractions.map((attraction) => (
              <Card key={attraction.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={attraction.image || "/placeholder.svg"}
                    alt={attraction.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">
                    {attraction.category}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{attraction.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{attraction.description}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(attraction.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({attraction.reviews} نظر)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{attraction.distance}</span>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleViewDetails(attraction)}
                    >
                      مشاهده جزئیات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {selectedAttraction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 font-serif">{selectedAttraction.title}</h2>
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <img
                src={selectedAttraction.image || "/placeholder.svg"}
                alt={selectedAttraction.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <div className="mb-4">
                <Badge className="bg-green-500 hover:bg-green-600 mb-3">{selectedAttraction.category}</Badge>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(selectedAttraction.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-600">({selectedAttraction.reviews} نظر)</span>
                  <span className="text-gray-500">• {selectedAttraction.distance}</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{selectedAttraction.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
