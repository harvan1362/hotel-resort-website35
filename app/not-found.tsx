import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">۴۰۴</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">صفحه مورد نظر یافت نشد</h2>
            <p className="text-gray-600 mb-8">
              متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است منتقل شده باشد.
            </p>
          </div>

          <div className="space-y-4">
            <Button asChild size="lg">
              <Link href="/">بازگشت به صفحه اصلی</Link>
            </Button>

            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/about">درباره ما</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">تماس با ما</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
