"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft, X, Home } from "lucide-react"
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
      "مجتمع تفریحی اقامتی دریاکنار با امکانات کامل و خدمات درجه یک رسماً افتتاح شد و آماده پذیرایی از مهمانان گرامی است.",
    excerpt: "مجتمع تفریحی اقامتی دریاکنار با امکانات کامل و خدمات درجه یک رسماً افتتاح شد.",
    image: "/luxury-resort-opening.png",
    date: "1404/5/15",
    category: "رزرو اتاق",
    readTime: "3 دقیقه",
    active: true,
  },
  {
    id: "2",
    title: "برنامه‌های ویژه تابستان در دریاکنار",
    content:
      "با فرا رسیدن فصل تابستان، مجموعه‌ای از برنامه‌های تفریحی و ورزشی ویژه برای مهمانان عزیز در نظر گرفته شده است.",
    excerpt: "برنامه‌های تفریحی و ورزشی ویژه تابستان برای مهمانان عزیز.",
    image: "/summer-activities.png",
    date: "1404/4/20",
    category: "برنامه‌ها",
    readTime: "2 دقیقه",
    active: true,
  },
  {
    id: "3",
    title: "تخفیف‌های ویژه برای رزرو زودهنگام",
    content: "مهمانان عزیز می‌توانند با رزرو زودهنگام از تخفیف‌های ویژه و پیشنهادات جذاب بهره‌مند شوند.",
    excerpt: "تخفیف‌های ویژه برای رزرو زودهنگام و پیشنهادات جذاب.",
    image: "/early-booking-discount.png",
    date: "1404/4/10",
    category: "تخفیف‌ها",
    readTime: "1 دقیقه",
    active: true,
  },
  {
    id: "4",
    title: "افتتاح رستوران جدید با منوی محلی",
    content: "رستوران جدید مجموعه با منوی غنی از غذاهای محلی و دریایی افتتاح شد و آماده ارائه خدمات به مهمانان است.",
    excerpt: "افتتاح رستوران جدید با منوی غنی از غذاهای محلی و دریایی.",
    image: "/new-restaurant-opening.png",
    date: "1404/3/25",
    category: "رستوران",
    readTime: "2 دقیقه",
    active: true,
  },
  {
    id: "5",
    title: "تور گردشگری جزایر خلیج فارس",
    content: "تورهای گردشگری به جزایر زیبای خلیج فارس با قایق‌های مجهز و راهنمای مجرب برگزار می‌شود.",
    excerpt: "تورهای گردشگری به جزایر زیبای خلیج فارس با قایق‌های مجهز.",
    image: "/island-tour.png",
    date: "1404/3/15",
    category: "تور",
    readTime: "4 دقیقه",
    active: true,
  },
]

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(defaultNews)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  useEffect(() => {
    const savedNews = localStorage.getItem("newsData")
    if (savedNews) {
      const parsedNews: NewsItem[] = JSON.parse(savedNews)
      setNews(parsedNews.filter((item) => item.active))
    }
  }, [])

  const handleReadMore = (newsItem: NewsItem) => {
    setSelectedNews(newsItem)
  }

  const closeModal = () => {
    setSelectedNews(null)
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 ml-2" />
                بازگشت به خانه
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 font-serif">تمام اخبار و برنامه‌ها</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
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
      </div>

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
