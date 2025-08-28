"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, X, ChevronLeft, ChevronRight } from "lucide-react"
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
    description: "پلی زیبا و تاریخی که نمای فوق‌العاده‌ای از خلیج فارس ارائه می‌دهد",
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
    description: "یکی از زیباترین سواحل منطقه هرمزگان با صخره‌های شگفت‌انگیز و مناظر خاص",
    image: "/maksar-beach-rocks.png",
    rating: 5,
    reviews: 8,
    distance: "۱۵ کیلومتر",
    category: "ساحل",
    active: true,
  },
  {
    id: "6",
    title: "گردنه عشاق",
    description: "مقصدی محبوب با مناظر طبیعی جذاب و چشم‌اندازهای رمانتیک از کوه‌ها و دریا",
    image: "/gardaneh-oshagh-romantic.png",
    rating: 4,
    reviews: 15,
    distance: "۲۰ کیلومتر",
    category: "کوهستان",
    active: true,
  },
  {
    id: "7",
    title: "ساحل نایبند",
    description: "پارک ملی نای‌بند با تنوع گیاهی و جانوری، مشهور به دلفین‌ها و لاک‌پشت‌های دریایی",
    image: "/nayband-marine-park.png",
    rating: 5,
    reviews: 20,
    distance: "۳۰ کیلومتر",
    category: "پارک ملی",
    active: true,
  },
  {
    id: "8",
    title: "غار نمکی بستک",
    description: "غار طبیعی زیبا با تشکیلات نمکی منحصر به فرد و معماری طبیعی شگفت‌انگیز",
    image: "/bastak-salt-cave.png",
    rating: 4,
    reviews: 10,
    distance: "۴۵ کیلومتر",
    category: "غار",
    active: true,
  },
  {
    id: "9",
    title: "تنگه بوجیر",
    description: "جاذبه طبیعی زیبا با چشم‌اندازهای بکر، صخره‌های بلند و آبشار قندیل‌های زیبا",
    image: "/bojir-canyon-waterfall.png",
    rating: 5,
    reviews: 12,
    distance: "۲۵ کیلومتر",
    category: "تنگه",
    active: true,
  },
  {
    id: "10",
    title: "تنگه شوتاریکو",
    description: "دره‌ای زیبا با صخره‌های بلند و مناظر طبیعی خیره‌کننده در قلب کوه‌های هرمزگان",
    image: "/shotariko-canyon.png",
    rating: 4,
    reviews: 8,
    distance: "۳۵ کیلومتر",
    category: "تنگه",
    active: true,
  },
  {
    id: "11",
    title: "آب دبه",
    description: "چشمه طبیعی زیبا با آب شیرین و مناظر سرسبز در میان کوه‌های منطقه",
    image: "/ab-dobeh-spring.png",
    rating: 4,
    reviews: 6,
    distance: "۴۰ کیلومتر",
    category: "چشمه",
    active: true,
  },
  {
    id: "12",
    title: "ساحل تبن",
    description: "ساحل آرام و زیبا با شن‌های نرم و آب‌های صاف، مناسب برای استراحت و تفریح",
    image: "/taban-beach-calm.png",
    rating: 4,
    reviews: 9,
    distance: "۱۸ کیلومتر",
    category: "ساحل",
    active: true,
  },
]

export function AttractionsSection() {
  const [attractions, setAttractions] = useState<Attraction[]>(defaultAttractions)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null)

  useEffect(() => {
    console.log("[v0] Checking localStorage for attractions...")
    const savedAttractions = localStorage.getItem("attractionsData")
    console.log("[v0] Saved attractions from localStorage:", savedAttractions)

    if (savedAttractions) {
      try {
        const parsedAttractions: Attraction[] = JSON.parse(savedAttractions)
        const activeAttractions = parsedAttractions.filter((attraction) => attraction.active)
        console.log("[v0] Active attractions found:", activeAttractions.length)
        setAttractions(activeAttractions)
      } catch (error) {
        console.log("[v0] Error parsing attractions from localStorage:", error)
        setAttractions(defaultAttractions)
      }
    } else {
      console.log("[v0] No saved attractions found, using default attractions")
      setAttractions(defaultAttractions)
    }
  }, [])

  useEffect(() => {
    if (attractions.length > 4) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 4
          return nextIndex >= attractions.length ? 0 : nextIndex
        })
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [attractions.length])

  const displayedAttractions =
    attractions.length > 4
      ? attractions
          .slice(currentIndex, currentIndex + 4)
          .concat(
            currentIndex + 4 > attractions.length ? attractions.slice(0, currentIndex + 4 - attractions.length) : [],
          )
      : attractions

  const handleViewDetails = (attraction: Attraction) => {
    setSelectedAttraction(attraction)
  }

  const closeModal = () => {
    setSelectedAttraction(null)
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 4
      return nextIndex >= attractions.length ? 0 : nextIndex
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const prevIdx = prevIndex - 4
      return prevIdx < 0 ? Math.max(0, attractions.length - 4) : prevIdx
    })
  }

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">جاذبه‌های منطقه</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">کشف زیبایی‌های بندر مقام و هرمزگان</p>
          </div>

          <div className="relative">
            {attractions.length > 4 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-transparent"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-transparent"
                  onClick={nextSlide}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedAttractions.map((attraction) => (
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

          <div className="text-center mt-12">
            <Link href="/attractions">
              <Button variant="outline" size="lg">
                مشاهده تمام جاذبه‌ها ({attractions.length} جاذبه)
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
