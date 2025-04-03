import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">About Us</h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Founded in 2005, Raja Photo Studio has been capturing life's most precious moments for over 15 years.
                What started as a small passion project has grown into one of the region's most respected photography
                studios.
              </p>
              <p>
                Our journey began when our founder, Raja Kapoor, decided to turn his lifelong passion for photography
                into a professional venture. With just a camera and a vision, he established a small studio that quickly
                gained recognition for its unique style and exceptional quality.
              </p>
              <p>
                Over the years, we've expanded our team, enhanced our equipment, and refined our techniques, but our
                core mission remains unchanged: to capture authentic moments that tell your unique story.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Image
              src="/aboutus.jpg?height=500&width=500"
              alt="Studio photo"
              width={500}
              height={500}
              className="object-cover rounded-md"
            />
            
          </div>
        </div>

        <div className="bg-[#9dbaa0]/20 p-8 rounded-md mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Our Philosophy</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              At Raja Photo Studio, we believe that photography is more than just taking pictures – it's about creating
              lasting memories and telling your unique story through our lens. We approach each project with creativity,
              technical expertise, and a deep commitment to capturing authentic moments.
            </p>
            <p>
              We understand that every client is unique, which is why we take the time to understand your vision and
              preferences. Whether you're looking for traditional elegance or contemporary flair, we tailor our approach
              to match your style and exceed your expectations.
            </p>
            <p>
              Our commitment to excellence extends beyond the shoot itself. We meticulously edit and enhance each image
              to ensure it reflects the beauty and emotion of the moment while maintaining a natural and timeless
              quality.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-8">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              name: "Raja Kapoor",
              role: "Founder & Lead Photographer",
              bio: "With over 20 years of experience, Raja specializes in wedding and portrait photography. His unique vision and technical expertise have earned him numerous awards.",
              image: "/service2.jpeg", // Correct path (remove /public)
            },            
            {
              name: "Priya Sharma",
              role: "Senior Photographer",
              bio: "Priya brings a fresh and contemporary perspective to our team. Her background in fine arts influences her distinctive style and creative approach.",
              image: "/placeholder.svg?height=400&width=300",
            },
            {
              name: "Arjun Mehta",
              role: "Videographer",
              bio: "Arjun leads our video production team, creating cinematic stories that complement our photography. His attention to detail ensures seamless integration.",
              image: "/placeholder.svg?height=400&width=300",
            },
          ].map((member, index) => (
            <div key={index} className="bg-[#0b3c5a] rounded-md overflow-hidden">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={300}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-[#ff6c4b] mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0b3c5a] p-8 rounded-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Whether you're planning a wedding, need professional portraits, or require commercial photography, we're
            here to bring your vision to life.
          </p>
          <Button className="bg-[#ff6c4b] hover:bg-[#e05a3b] text-white">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

