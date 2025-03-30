import Link from "next/link"
import { Camera, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#02080d] py-8 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Camera className="h-6 w-6 text-[#ff6c4b]" />
              <span className="text-xl font-bold text-white">Raja Photo Studio</span>
            </div>
            <p className="text-gray-400 text-sm">
              Capturing life's precious moments with creativity and passion since 2005.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-gray-400 hover:text-[#ff6c4b]">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#ff6c4b]">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#ff6c4b]">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#ff6c4b]">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/" className="text-gray-400 hover:text-[#ff6c4b] text-sm">
                Home
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-[#ff6c4b] text-sm">
                About
              </Link>
              <Link href="/services" className="text-gray-400 hover:text-[#ff6c4b] text-sm">
                Services
              </Link>
              <Link href="/gallery" className="text-gray-400 hover:text-[#ff6c4b] text-sm">
                Gallery
              </Link>
              <Link href="/videos" className="text-gray-400 hover:text-[#ff6c4b] text-sm">
                Videos
              </Link>
              <Link href="/testimonials" className="text-gray-400 hover:text-[#ff6c4b] text-sm">
                Testimonials
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-[#ff6c4b] text-sm">
                Contact
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#ff6c4b] text-sm">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Working Hours</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-gray-400">Sunday: Closed</p>
            </div>
          </div>
        </div>
        <div className="border-t border-[#142129] mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Raja Photo Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

