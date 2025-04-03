"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import type { User } from "firebase/auth"
import { auth } from "@/utils/firebaseconfig" 
import router from "next/router"

export function MainNav() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      // You can add a redirect here if needed
      window.location.href = "/"
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

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
        {loading ? (
            // Show a loading state while checking authentication
            <div className="animate-pulse bg-gray-300 h-9 w-20 rounded"></div>
          ) : user ? (
            // User is logged in - show logout button and maybe user info
            <>
              <span className="hidden sm:inline-block text-white self-center mr-2">
                {user.displayName || user.email}
              </span>
              <Button 
                onClick={handleLogout} 
                className="bg-[#ff6c4b] hover:bg-[#e05a3b] text-white"
              >
                Logout
              </Button>
            </>
          ) : (
            // User is not logged in - show login and signup buttons
            <>
              <Button asChild variant="ghost" className="text-white hover:text-[#ff6c4b] hover:bg-transparent">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-[#ff6c4b] hover:bg-[#e05a3b] text-white">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

