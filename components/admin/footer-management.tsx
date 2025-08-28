"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface FooterLink {
  id: string
  title: string
  href: string
}

interface FooterSection {
  id: string
  title: string
  links: FooterLink[]
}

interface FooterData {
  sections: FooterSection[]
  companyDescription: string
  socialLinks: {
    facebook: string
    twitter: string
    instagram: string
  }
  copyright: string
}

export function FooterManagement() {
  const router = useRouter()
  const { toast } = useToast()
  const [footerData, setFooterData] = useState<FooterData>({
    sections: [
      {
        id: "attractions",
        title: "جاذبه‌ها",
        links: [
          { id: "1", title: "ساحل مکسر", href: "/attractions/maksar-beach" },
          { id: "2", title: "گردنه عشاق", href: "/attractions/oshagh-pass" },
          { id: "3", title: "جزیره مارو", href: "/attractions/maro-island" },
          { id: "4", title: "مشاهده کامل جاذبه‌ها", href: "/attractions" },
        ],
      },
      {
        id: "services",
        title: "خدمات",
        links: [
          { id: "1", title: "هتل و اقامت", href: "/group/hotel" },
          { id: "2", title: "رستوران", href: "/group/restaurant" },
          { id: "3", title: "کافی‌شاپ", href: "/group/cafe" },
          { id: "4", title: "تالار", href: "/group/hall" },
        ],
      },
    ],
    companyDescription: "تجربه‌ای فراموش‌نشدنی در کنار دریا",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
    copyright: "© 1404 مجتمع تفریحی اقامتی دریاکنار بندر مقام. تمامی حقوق محفوظ است.",
  })

  useEffect(() => {
    const savedFooter = localStorage.getItem("footerData")
    if (savedFooter) {
      setFooterData(JSON.parse(savedFooter))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("footerData", JSON.stringify(footerData))
    toast({
      title: "موفق",
      description: "اطلاعات فوتر با موفقیت ذخیره شد",
    })
  }

  const addSection = () => {
    const newSection: FooterSection = {
      id: Date.now().toString(),
      title: "بخش جدید",
      links: [],
    }
    setFooterData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }))
  }

  const updateSection = (sectionId: string, title: string) => {
    setFooterData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (section.id === sectionId ? { ...section, title } : section)),
    }))
  }

  const deleteSection = (sectionId: string) => {
    setFooterData((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== sectionId),
    }))
  }

  const addLink = (sectionId: string) => {
    const newLink: FooterLink = {
      id: Date.now().toString(),
      title: "لینک جدید",
      href: "#",
    }
    setFooterData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, links: [...section.links, newLink] } : section,
      ),
    }))
  }

  const updateLink = (sectionId: string, linkId: string, field: "title" | "href", value: string) => {
    setFooterData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              links: section.links.map((link) => (link.id === linkId ? { ...link, [field]: value } : link)),
            }
          : section,
      ),
    }))
  }

  const deleteLink = (sectionId: string, linkId: string) => {
    setFooterData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, links: section.links.filter((link) => link.id !== linkId) } : section,
      ),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">مدیریت فوتر</h1>
        </div>
        <Button onClick={handleSave}>ذخیره تغییرات</Button>
      </div>

      <div className="grid gap-6">
        {/* بخش‌های فوتر */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>بخش‌های فوتر</CardTitle>
              <Button onClick={addSection} size="sm">
                <Plus className="w-4 h-4 ml-1" />
                افزودن بخش
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {footerData.sections.map((section) => (
              <div key={section.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Input
                    value={section.title}
                    onChange={(e) => updateSection(section.id, e.target.value)}
                    placeholder="عنوان بخش"
                    className="flex-1"
                  />
                  <Button variant="destructive" size="icon" onClick={() => deleteSection(section.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>لینک‌ها</Label>
                    <Button variant="outline" size="sm" onClick={() => addLink(section.id)}>
                      <Plus className="w-3 h-3 ml-1" />
                      افزودن لینک
                    </Button>
                  </div>

                  {section.links.map((link) => (
                    <div key={link.id} className="flex items-center gap-2">
                      <Input
                        value={link.title}
                        onChange={(e) => updateLink(section.id, link.id, "title", e.target.value)}
                        placeholder="عنوان لینک"
                        className="flex-1"
                      />
                      <Input
                        value={link.href}
                        onChange={(e) => updateLink(section.id, link.id, "href", e.target.value)}
                        placeholder="آدرس لینک"
                        className="flex-1"
                      />
                      <Button variant="destructive" size="icon" onClick={() => deleteLink(section.id, link.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* اطلاعات شرکت */}
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات شرکت</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>توضیحات شرکت</Label>
              <Textarea
                value={footerData.companyDescription}
                onChange={(e) => setFooterData((prev) => ({ ...prev, companyDescription: e.target.value }))}
                placeholder="توضیحات کوتاه درباره شرکت"
              />
            </div>

            <div>
              <Label>متن کپی‌رایت</Label>
              <Input
                value={footerData.copyright}
                onChange={(e) => setFooterData((prev) => ({ ...prev, copyright: e.target.value }))}
                placeholder="متن کپی‌رایت"
              />
            </div>
          </CardContent>
        </Card>

        {/* شبکه‌های اجتماعی */}
        <Card>
          <CardHeader>
            <CardTitle>شبکه‌های اجتماعی</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>فیس‌بوک</Label>
              <Input
                value={footerData.socialLinks.facebook}
                onChange={(e) =>
                  setFooterData((prev) => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, facebook: e.target.value },
                  }))
                }
                placeholder="لینک فیس‌بوک"
              />
            </div>

            <div>
              <Label>توییتر</Label>
              <Input
                value={footerData.socialLinks.twitter}
                onChange={(e) =>
                  setFooterData((prev) => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, twitter: e.target.value },
                  }))
                }
                placeholder="لینک توییتر"
              />
            </div>

            <div>
              <Label>اینستاگرام</Label>
              <Input
                value={footerData.socialLinks.instagram}
                onChange={(e) =>
                  setFooterData((prev) => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, instagram: e.target.value },
                  }))
                }
                placeholder="لینک اینستاگرام"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
