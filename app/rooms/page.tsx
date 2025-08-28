import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function RoomsPage() {
  const rooms = [
    {
      title: "اتاق تک نفره استاندارد",
      description: "اتاق راحت و مجهز برای یک نفر با نمای دریا",
      price: "۱,۵۰۰,۰۰۰",
      features: ["تخت یک نفره", "نمای دریا", "حمام اختصاصی", "تلویزیون", "یخچال کوچک"],
      image: "/hotel-single-bed-sea-view.png",
    },
    {
      title: "اتاق دو نفره استاندارد",
      description: "اتاق دنج برای دو نفر با امکانات کامل",
      price: "۲,۰۰۰,۰۰۰",
      features: ["تخت دو نفره", "نمای دریا", "حمام اختصاصی", "تلویزیون", "میز کار", "بالکن"],
      image: "/hotel-room-sea-view.png",
    },
    {
      title: "سوئیت خانوادگی",
      description: "فضای وسیع برای خانواده با اتاق جداگانه",
      price: "۳,۵۰۰,۰۰۰",
      features: ["دو اتاق خواب", "نشیمن جداگانه", "آشپزخانه کوچک", "دو حمام", "تراس بزرگ"],
      image: "/family-suite-hotel-room.png",
    },
    {
      title: "ویلای لوکس",
      description: "اقامت لوکس با امکانات ویژه و حریم خصوصی",
      price: "۵,۰۰۰,۰۰۰",
      features: ["سه اتاق خواب", "استخر اختصاصی", "باغ خصوصی", "آشپزخانه کامل", "پارکینگ"],
      image: "/placeholder-lt1ae.png",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">اتاق‌ها و اقامتگاه‌ها</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            انواع اتاق‌ها و اقامتگاه‌های مجهز با نمای دریا و امکانات کامل برای اقامتی راحت و لذت‌بخش.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {rooms.map((room, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <img src={room.image || "/placeholder.svg"} alt={room.title} className="w-full h-full object-cover" />
                  <Badge className="absolute top-4 right-4 bg-blue-600">{room.price} تومان / شب</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{room.title}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">امکانات:</h4>
                      <ul className="grid grid-cols-2 gap-1 text-sm">
                        {room.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full">رزرو اتاق</Button>
                  </div>
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
