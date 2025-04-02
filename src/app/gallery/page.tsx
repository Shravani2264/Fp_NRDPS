"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const categories = [
    { id: "all", label: "All" },
    { id: "wedding", label: "Wedding" },
    { id: "portrait", label: "Portrait" },
    { id: "event", label: "Event" },
    { id: "commercial", label: "Commercial" },
    { id: "fashion", label: "Fashion" },
  ]

  const galleryImages = [
    { id: 1, src: "/summer wedding.jpg?height=400&width=600", category: "wedding", title: "Summer Wedding" },
    { id: 2, src: "/beach ceremony.jpg?height=400&width=600", category: "wedding", title: "Beach Ceremony" },
    { id: 3, src: "/Family Portrait.jpg?height=400&width=600", category: "portrait", title: "Family Portrait" },
    { id: 4, src: "/corporate headshot.jpg?height=400&width=600", category: "portrait", title: "Corporate Headshot" },
    { id: 5, src: "/corporate Gala.jpg?height=400&width=600", category: "event", title: "Corporate Gala" },
    { id: 6, src: "/birthday.jpg?height=400&width=600", category: "event", title: "Birthday Celebration" },
    { id: 7, src: "/product showcase.jpeg?height=400&width=600", category: "commercial", title: "Product Showcase" },
    { id: 8, src: "/real estate.jpg?height=400&width=600", category: "commercial", title: "Real Estate" },
    { id: 9, src: "/editoral shoot.jpg?height=400&width=600", category: "fashion", title: "Editorial Shoot" },
    { id: 10, src: "/traditional shoot.jpg?height=400&width=600", category: "wedding", title: "Traditional Ceremony" },
    { id: 11, src: "/artistic porti.jpg?height=400&width=600", category: "portrait", title: "Artistic Portrait" },
  ]

  return (
    <div className="min-h-screen py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Gallery</h1>
        <p className="text-gray-300 max-w-3xl mb-12">
          Browse through our portfolio of work across various photography styles and categories. Each image represents
          our commitment to quality, creativity, and capturing authentic moments.
        </p>

        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="bg-[#0b3c5a] p-1 mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-[#ff6c4b] data-[state=active]:text-white"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages
                  .filter((img) => category.id === "all" || img.category === category.id)
                  .map((image) => (
                    <div
                      key={image.id}
                      className="relative group cursor-pointer overflow-hidden rounded-md"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.title}
                        width={600}
                        height={400}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-white font-medium">{image.title}</h3>
                          <p className="text-gray-300 text-sm capitalize">{image.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Image Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <Button
                variant="ghost"
                className="absolute top-2 right-2 text-white z-10 rounded-full w-8 h-8 p-0"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </Button>
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Gallery image"
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Want to See More?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            We have many more examples of our work that we'd be happy to share based on your specific interests and
            needs.
          </p>
          <Button className="bg-[#ff6c4b] hover:bg-[#e05a3b] text-white">Request Custom Portfolio</Button>
        </div>
      </div>
    </div>
  )
}

