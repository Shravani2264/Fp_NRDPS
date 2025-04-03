import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play } from "lucide-react"
import Link from "next/link"

export default function VideosPage() {
  const videos = [
    {
      id: 1,
      title: "Sarah & John's Wedding Highlights",
      description: "A beautiful summer wedding at Lakeside Gardens",
      duration: "3:45",
      thumbnail: "/video1.jpg?height=400&width=600",
      category: "Wedding",
    },
    {
      id: 2,
      title: "Corporate Brand Film - Acme Inc.",
      description: "Showcasing company culture and values",
      duration: "2:30",
      thumbnail: "/video2.jpg?height=400&width=600",
      category: "Commercial",
    },
    {
      id: 3,
      title: "Annual Charity Gala",
      description: "Highlights from the fundraising event",
      duration: "4:15",
      thumbnail: "/video3.jpg?height=400&width=600",
      category: "Event",
    },
    {
      id: 4,
      title: "Summer Fashion Collection",
      description: "Promotional video for designer's new line",
      duration: "1:45",
      thumbnail: "/video4.jpg?height=400&width=600",
      category: "Fashion",
    },
    {
      id: 5,
      title: "Luxury Real Estate Tour",
      description: "Virtual walkthrough of beachfront property",
      duration: "5:20",
      thumbnail: "/video5.jpg?height=400&width=600",
      category: "Real Estate",
    },
    {
      id: 6,
      title: "25th Anniversary Celebration",
      description: "Silver jubilee highlights for the Patels",
      duration: "3:10",
      thumbnail: "/video6.jpg?height=400&width=600",
      category: "Event",
    },
    {
      id: 7,
      title: "Product Launch - Tech Innovations",
      description: "New product line announcement",
      duration: "2:50",
      thumbnail: "/video7.jpg?height=400&width=600",
      category: "Commercial",
    },
    {
      id: 8,
      title: "Maya & Raj's Wedding Film",
      description: "Traditional ceremony with modern touches",
      duration: "6:30",
      thumbnail: "/video8.jpg?height=400&width=600",
      category: "Wedding",
    },
  ]

  return (
    <div className="min-h-screen py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Videos</h1>
        <p className="text-gray-300 max-w-3xl mb-12">
          Explore our video portfolio showcasing weddings, events, commercial projects, and more. Our cinematic approach
          to videography creates compelling visual stories that capture the essence of each occasion.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {videos.map((video) => (
            <Card key={video.id} className="bg-[#0b3c5a] border-none overflow-hidden">
              <div className="relative group">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#ff6c4b]/80 flex items-center justify-center group-hover:bg-[#ff6c4b] transition-colors">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 rounded text-white text-xs">
                  {video.duration}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{video.title}</h3>
                  <span className="text-xs bg-[#ff6c4b] text-white px-2 py-1 rounded">{video.category}</span>
                </div>
                <p className="text-gray-300 text-sm mb-4">{video.description}</p>
                <Button className="w-full bg-[#102330] hover:bg-[#1a3a4d] text-white">Watch Video</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-[#0b3c5a] p-8 rounded-md">
          <h2 className="text-2xl font-bold text-white mb-4">Our Video Services</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-[#102330] p-6 rounded-md">
              <h3 className="text-lg font-semibold text-white mb-3">Wedding Films</h3>
              <p className="text-gray-300 text-sm">
                Cinematic wedding films that tell your unique love story. From highlight reels to full-day coverage, we
                capture all the emotions and moments.
              </p>
            </div>
            <div className="bg-[#102330] p-6 rounded-md">
              <h3 className="text-lg font-semibold text-white mb-3">Commercial Videos</h3>
              <p className="text-gray-300 text-sm">
                Professional videos for businesses, including brand films, product showcases, testimonials, and
                promotional content for digital marketing.
              </p>
            </div>
            <div className="bg-[#102330] p-6 rounded-md">
              <h3 className="text-lg font-semibold text-white mb-3">Event Documentation</h3>
              <p className="text-gray-300 text-sm">
                Comprehensive event coverage that captures the atmosphere, key moments, and highlights of your special
                occasion or corporate gathering.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button className="bg-[#ff6c4b] hover:bg-[#e05a3b] text-white"><Link href="/contact">Inquire About Video Services</Link></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

