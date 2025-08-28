import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 mb-16">
          <h1 className="text-4xl font-bold text-center mb-8">تماس با ما</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            برای رزرو اتاق، دریافت اطلاعات بیشتر یا هر گونه سوال، با ما در تماس باشید.
          </p>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
