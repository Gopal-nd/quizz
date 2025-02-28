import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Quiz App</h3>
            <p className="text-slate-400 mb-4">
              Engaging quizzes to challenge and expand your mind across various subjects.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook className="w-5 h-5" />} />
              <SocialIcon icon={<Twitter className="w-5 h-5" />} />
              <SocialIcon icon={<Instagram className="w-5 h-5" />} />
              <SocialIcon icon={<Youtube className="w-5 h-5" />} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="#" label="Home" />
              <FooterLink href="#features" label="Features" />
              <FooterLink href="#how-it-works" label="How It Works" />
              <FooterLink href="#testimonials" label="Testimonials" />
              <FooterLink href="#faq" label="FAQ" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Topics</h3>
            <ul className="space-y-2">
              <FooterLink href="#" label="Physics" />
              <FooterLink href="#" label="Biology" />
              <FooterLink href="#" label="History" />
              <FooterLink href="#" label="Chemistry" />
              <FooterLink href="#" label="View All Topics" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                <span className="text-slate-300">support@quizapp.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <span className="text-slate-300">123 Quiz Street, Knowledge City, QZ 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Quiz App. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ icon }) {
  return (
    <a
      href="#"
      className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, label }) {
  return (
    <li>
      <Link href={href} className="text-slate-300 hover:text-white transition-colors">
        {label}
      </Link>
    </li>
  )
}

