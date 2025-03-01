import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Leaf, Sun, Sprout, ShoppingBag, Bug, BookOpen, ChevronRight , Wheat, Brain} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { ModeToggle } from "@/components/ThemeToggle"

import { getAuthSession } from "@/lib/auth"
import Hero from "@/components/hero"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import Faq from "@/components/faq"


export default async function LandingPage() {
const session =await getAuthSession()
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto ">
      <header className="px-4 lg:px-6 h-14 flex items-center  border-b py-4">
        <Link className="flex items-center justify-center" href="/">
          <span className="text-2xl font-bold text-primary flex gap-1 items-center"><Brain /> Quizz</span>
        </Link>
        <div className="ml-auto flex item-center gap-4 ">
        <ModeToggle />
        {session?.user ?
        <Link href={'/dashboard'}>
          <Button >Dashboard</Button>
        </Link>:
        <Link href={'/login'}>
          <Button >Login</Button>
        </Link>
        }
        </div>
      </header>
      <main className="flex-1">
 
      <Hero />
      <Features />
      <HowItWorks />
      <Faq />
      {/* <Footer /> */}
   
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2025 Quizz. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}