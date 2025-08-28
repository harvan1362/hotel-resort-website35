"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MapPin, Clock } from "lucide-react"
import { useState, useEffect } from "react"

interface ContactCard {
  id: string
  title: string
  value: string
  description: string
  order: number
}

interface ContactInfo {
  address: string
  phone1: string
  phone2: string
  workingHours: string
  quickMessageTitle: string
  quickMessageDescription: string
  cards: ContactCard[]
}

export function ContactSection() {
  const [contactData, setContactData] = useState<ContactInfo | null>(null)

  useEffect(() => {
    const savedContactInfo = localStorage.getItem("contactInfo")
    if (savedContactInfo) {
      setContactData(JSON.parse(savedContactInfo))
    }
  }, [])

  const contactInfo = contactData?.cards || [
    {
      id: "1",
      title: "خط ثابت",
      value: "۰۷۶۴۲۴۷۰۰۰۶",
      description: "پاسخگویی 24 ساعته",
      order: 1,
    },
    {
      id: "2",
      title: "کافی‌شاپ و فست‌فود",
      value: "۰۹۰۳۰۰۶۹۳۳۵",
      description: "سفارش غذا و نوشیدنی",
      order: 2,
    },
    {
      id: "3",
      title: "رستوران و کبابی",
      value: "۰۹۰۳۰۰۶۹۳۳۶",
      description: "رزرو میز رستوران",
      order: 3,
    },
    {
      id: "4",
      title: "رزرواسیون هتل",
      value: "۰۹۱۵۸۴۰۳۱۳۰",
      description: "رزرو اتاق و اقامت",
      order: 4,
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">آماده پذیرایی از شما هستیم</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            برای رزرواسیون اتاق، سفارش غذا یا کسب اطلاعات بیشتر با ما تماس بگیرید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info: ContactCard, index: number) => (
            <Card
              key={info.id || index}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                <p className="text-2xl font-bold mb-2">{info.value}</p>
                <p className="text-sm opacity-80">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                اطلاعات تماس
              </h3>
              <div className="space-y-3">
                <p className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <span>{contactData?.address || "هرمزگان، شهرستان، بندر مقام، خیابان ساحلی"}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>{contactData?.phone1 || "۰۹۱۷۳۸۱۵۴۸۲"}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>{contactData?.phone2 || "۰۷۶۴۲۴۷۰۰۰۶"}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{contactData?.workingHours || "همه روزه 24 ساعته"}</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">{contactData?.quickMessageTitle || "پیام سریع"}</h3>
              <p className="mb-4 opacity-90">
                {contactData?.quickMessageDescription ||
                  "برای دریافت اطلاعات تکمیلی و رزرو سریع، پیام خود را ارسال کنید"}
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full">
                ارسال پیام
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
