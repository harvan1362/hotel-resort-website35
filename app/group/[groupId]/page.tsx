"use client"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface PageProps {
  params: {
    groupId: string
  }
}

export default function GroupPage({ params }: PageProps) {
  const [serviceGroups] = useLocalStorage("serviceGroups", [])
  const [groupContent] = useLocalStorage("groupContents", [])

  const currentGroup = serviceGroups.find((g: any) => g.id === params.groupId)
  const currentContent = groupContent.find((gc: any) => gc.groupId === params.groupId)

  if (!currentGroup) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">گروه یافت نشد</h1>
            <Button onClick={() => window.history.back()}>
              <ArrowRight className="w-4 h-4 ml-2" />
              بازگشت
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => window.history.back()} className="mb-4">
            <ArrowRight className="w-4 h-4 ml-2" />
            بازگشت
          </Button>
          <h1 className="text-3xl font-bold mb-2">{currentGroup.title}</h1>
          <p className="text-gray-600">مشاهده محصولات و خدمات {currentGroup.title}</p>
        </div>

        {currentContent && currentContent.items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentContent.items
              .filter((item: any) => item.available)
              .map((item: any) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      {item.category && <Badge variant="secondary">{item.category}</Badge>}
                    </div>

                    {item.description && <p className="text-gray-600 mb-4">{item.description}</p>}

                    {item.price && (
                      <div className="text-xl font-bold text-green-600">{item.price.toLocaleString()} تومان</div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">محتوایی موجود نیست</h3>
              <p className="text-gray-600">هنوز محتوایی برای این گروه اضافه نشده است</p>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  )
}
