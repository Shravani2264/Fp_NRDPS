"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function MainNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/videos", label: "Videos" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="container mx-auto py-4 px-4 md:px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
        <Link href="/" >
          <Image 
              src="/logo.png"  // Update with the correct image path
              alt="Raja Photo Studio Logo"
              width={150}  // Adjust size as needed
              height={50} 
              className="h-auto w-auto" // Ensures proper scaling
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-white hover:text-[#ff6c4b] text-sm transition-colors",
                pathname === item.href && "text-[#ff6c4b]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-2">
          <p></p>
        </div>
      </div>
    </header>
  )
}