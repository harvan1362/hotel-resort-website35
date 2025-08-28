import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { NewsSection } from "@/components/news-section"
import { AttractionsSection } from "@/components/attractions-section"
import { LoginGuideSection } from "@/components/login-guide-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <NewsSection />
        <AttractionsSection />
        <LoginGuideSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
