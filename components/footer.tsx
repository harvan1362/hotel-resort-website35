"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

interface CompanyInfo {
  companyName: string
  ownerName: string
  managerName: string
  slogan: string
  phone: string
  landline: string
  address: string
  registrationCode: string
  economicCode: string
  logo: string
  icon: string
}

const footerSections = [
  {
    title: "خدمات",
    links: [
      { label: "هتل و اقامت", href: "/rooms" },
      { label: "رستوران", href: "/restaurant" },
      { label: "کافی‌شاپ", href: "/cafe" },
      { label: "کبابی", href: "/kebab" },
      { label: "تالار", href: "/hall" },
    ],
  },
  {
    title: "جاذبه‌ها",
    links: [
      { label: "ساحل مکسر", href: "/attractions/beach" },
      { label: "گردنه عشاق", href: "/attractions/valley" },
      { label: "جزیره مارو", href: "/attractions/island" },
      { label: "تنگه بوچیر", href: "/attractions/strait" },
      { label: "تنگه شوتاریکو", href: "/attractions/shotariko" },
      { label: "مشاهده کامل جاذبه‌ها", href: "/attractions" },
    ],
  },
]

export function Footer() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: "مجتمع تفریحی اقامتی دریاکنار",
    ownerName: "",
    managerName: "",
    slogan: "تجربه‌ای فراموش‌نشدنی در کنار دریا",
    phone: "",
    landline: "",
    address: "",
    registrationCode: "",
    economicCode: "",
    logo: "",
    icon: "",
  })

  useEffect(() => {
    const savedCompanyInfo = localStorage.getItem("companyInfo")
    if (savedCompanyInfo) {
      try {
        const parsedInfo = JSON.parse(savedCompanyInfo)
        setCompanyInfo(parsedInfo)
      } catch (error) {
        console.error("Error parsing company info:", error)
      }
    }
  }, [])

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* لوگو و توضیحات */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center overflow-hidden">
                {companyInfo.icon ? (
                  <img
                    src={companyInfo.icon || "/placeholder.svg"}
                    alt="آیکون"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-white font-bold text-xl">د</span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-xl">{companyInfo.companyName}</h3>
                <p className="text-gray-400">دریاکنار</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {companyInfo.slogan ||
                "تجربه‌ای فراموش‌نشدنی در قلب خلیج فارس با خدمات کامل مقتدری، رستوران و جاذبه‌های گردشگری منحصر‌به‌فرد"}
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* بخش‌های منو */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; ۱۴۰۴ {companyInfo.companyName}. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
}
