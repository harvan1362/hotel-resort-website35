"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface NewsItem {
  id: string
  title: string
  content: string
  excerpt: string
  image: string
  date: string
  category: string
  readTime: string
  active: boolean
}

const defaultNews = [
  {
    id: "1",
    title: "افتتاح رسمی مجتمع تفریحی اقامتی دریاکنار",
    content:
      "مجتمع تفریحی اقامتی دریاکنار با امکانات کامل و خدمات درجه یک رسماً افتتاح شد و آماده پذیرایی از مهمانان گرامی است. این مجتمع با بهره‌گیری از جدیدترین تکنولوژی‌ها و استانداردهای بین‌المللی طراحی شده است.",
    excerpt:
      "مجتمع تفریحی اقامتی دریاکنار با امکانات کامل و خدمات درجه یک رسماً افتتاح شد و آماده پذیرایی از مهمانان گرامی است.",
    image: "/luxury-resort-opening.png",
    date: "1404/5/15",
    category: "رزرو اتاق",
    readTime: "3 دقیقه",
    active: true,
  },
  {
    id: "2",
    title: "برنامه‌های ویژه تابستان در دریاکنار",
    content: "برنامه‌های تفریحی و ورزش‌های آبی ویژه فصل تابستان در مجتمع دریاکنار برگزار می‌شود.",
    excerpt: "برنامه‌های تفریحی و ورزش‌های آبی ویژه فصل تابستان در مجتمع دریاکنار برگزار می‌شود.",
    image: "/beach-resort-water-sports.png",
    date: "1404/5/16",
    category: "ضمیمه",
    readTime: "5 دقیقه",
    active: true,
  },
  {
    id: "3",
    title: "رستوران دریاکنار با منوی جدید",
    content: "رستوران مجتمع دریاکنار با منوی جدید غذاهای محلی جنوب و دریایی آماده خدمت‌رسانی است.",
    excerpt: "رستوران مجتمع دریاکنار با منوی جدید غذاهای محلی جنوب و دریایی آماده خدمت‌رسانی است.",
    image: "/iranian-seafood-restaurant.png",
    date: "1404/5/17",
    category: "رزرو میز",
    readTime: "4 دقیقه",
    active: true,
  },
]

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>(defaultNews)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  useEffect(() => {
    const savedNews = localStorage.getItem("newsData")
    if (savedNews) {
      const parsedNews: NewsItem[] = JSON.parse(savedNews)
      setNews(parsedNews.filter((item) => item.active))
    }
  }, [])

  useEffect(() => {
    if (news.length >= 3) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 3) % news.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [news.length])

  const displayedNews = news
    .slice(currentIndex, currentIndex + 3)
    .concat(news.slice(0, Math.max(0, currentIndex + 3 - news.length)))

  const handleReadMore = (newsItem: NewsItem) => {
    setSelectedNews(newsItem)
  }

  const closeModal = () => {
    setSelectedNews(null)
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % news.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + news.length) % news.length)
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">اخبار و برنامه‌ها</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">آخرین اخبار و رویدادهای مجتمع دریاکنار</p>
          </div>

          <div className="relative">
            {news.length >= 3 && (
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedNews.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                    <Badge className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700">جدید</Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                      <span>{item.readTime}</span>
                    </div>

                    <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2">{item.title}</h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{item.category}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => handleReadMore(item)}
                      >
                        <span>ادامه مطلب</span>
                        <ArrowLeft className="w-4 h-4 mr-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/news">
              <Button variant="outline" size="lg">
                مشاهده تمام اخبار ({news.length} خبر)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 font-serif">{selectedNews.title}</h2>
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedNews.date}</span>
                </div>
                <Badge variant="secondary">{selectedNews.category}</Badge>
                <span>{selectedNews.readTime}</span>
              </div>

              <img
                src={selectedNews.image || "/placeholder.svg"}
                alt={selectedNews.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{selectedNews.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
