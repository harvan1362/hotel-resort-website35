"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "مجتمع تفریحی اقامتی دریاکنار",
    subtitle: "تجربه‌ای فراموش‌نشدنی در کنار دریا",
    description: "لذت اقامت در قلب طبیعت ساحلی هرمزگان با امکانات رفاهی کامل و خدمات درجه یک",
    image: "/luxury-resort-sunset.png",
  },
  {
    id: 2,
    title: "اقامت لوکس در کنار خلیج فارس",
    subtitle: "آرامش و زیبایی در یک مکان",
    description: "اتاق‌های مجهز با نمای دریا، رستوران‌های متنوع و امکانات تفریحی بی‌نظیر",
    image: "/tropical-hotel-pool.png",
  },
  {
    id: 3,
    title: "خدمات کامل تفریحی و اقامتی",
    subtitle: "همه چیز در یک مکان",
    description: "از اقامت راحت تا غذاهای خوشمزه و جاذبه‌های گردشگری منحصر به فرد",
    image: "/seaside-restaurant-romance.png",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">{slide.title}</h1>
              <p className="text-xl md:text-2xl mb-6 opacity-90">{slide.subtitle}</p>
              <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">{slide.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  مشاهده اتاق‌ها
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                >
                  رزرو کنید
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* کنترل‌های اسلایدر */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* نشانگرهای اسلایدر */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  )
}
