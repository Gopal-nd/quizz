import Hero from "@/components/hero"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import SocialProof from "@/components/social-proof"
import Faq from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <SocialProof />
      <Faq />
      <Footer />
    </main>
  )
}

