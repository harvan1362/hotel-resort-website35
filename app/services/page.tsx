import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  const services = [
    {
      title: "اقامت و رزرو اتاق",
      description: "اتاق‌های مجهز با نمای دریا، امکانات کامل و خدمات درجه یک",
      features: ["اتاق‌های تک و دو تخته", "نمای دریا", "سرویس اتاق ۲۴ ساعته", "اینترنت رایگان"],
    },
    {
      title: "رستوران و کافی‌شاپ",
      description: "طعم‌های اصیل محلی و بین‌المللی در کنار منظره زیبای خلیج فارس",
      features: ["غذاهای محلی هرمزگان", "منوی بین‌المللی", "کافی‌شاپ", "فست‌فود"],
    },
    {
      title: "تفریحات ساحلی",
      description: "انواع تفریحات آبی و ساحلی برای تمام سنین",
      features: ["ورزش‌های آبی", "قایق‌سواری", "ماهیگیری", "والیبال ساحلی"],
    },
    {
      title: "تورهای گردشگری",
      description: "بازدید از جاذبه‌های طبیعی و تاریخی منطقه",
      features: ["جنگل حرا", "کوه‌های هرمز", "پل معلق", "جزایر نزدیک"],
    },
    {
      title: "سالن‌های مراسم",
      description: "برگزاری مراسم‌های خاص در محیطی زیبا و دلنشین",
      features: ["سالن عروسی", "سالن کنفرانس", "فضای باز", "تجهیزات صوتی و تصویری"],
    },
    {
      title: "خدمات رفاهی",
      description: "امکانات رفاهی و تفریحی برای اقامتی راحت و لذت‌بخش",
      features: ["استخر", "سونا و جکوزی", "باشگاه بدنسازی", "اتاق بازی کودکان"],
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">خدمات ما</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            مجتمع دریاکنار بندر مقام با ارائه خدمات متنوع و باکیفیت، تجربه‌ای فراموش‌نشدنی برای شما فراهم می‌کند.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
