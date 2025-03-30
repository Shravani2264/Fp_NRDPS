import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah & John Thompson",
      service: "Wedding Photography",
      quote:
        "Raja Photo Studio captured our wedding day perfectly. The team was professional, creative, and made us feel comfortable throughout the day. The photos exceeded our expectations and truly captured the emotions and joy of our special day.",
      image: "/placeholder.svg?height=300&width=200",
      rating: 5,
    },
    {
      id: 2,
      name: "The Williams Family",
      service: "Family Portraits",
      quote:
        "The family portrait session was amazing! The photographers were great with our kids and the final images were stunning. We'll definitely be coming back for more sessions in the future.",
      image: "/placeholder.svg?height=300&width=200",
      rating: 5,
    },
    {
      id: 3,
      name: "Acme Corporation",
      service: "Commercial Photography",
      quote:
        "We hired Raja Photo Studio for our product catalog and corporate headshots. The quality of work was exceptional, and they delivered everything on time and within budget. Their attention to detail really made our products shine.",
      image: "/placeholder.svg?height=300&width=200",
      rating: 5,
    },
    {
      id: 4,
      name: "Priya Patel",
      service: "Portrait Session",
      quote:
        "I needed professional headshots for my new business venture, and Raja Photo Studio delivered beyond my expectations. They made me feel comfortable and confident, and the results were perfect for my branding.",
      image: "/placeholder.svg?height=300&width=200",
      rating: 4,
    },
    {
      id: 5,
      name: "Luxury Homes Real Estate",
      service: "Real Estate Photography",
      quote:
        "The quality of the real estate photography provided by Raja Photo Studio has significantly improved our property listings. Their eye for detail and ability to showcase spaces in the best light has helped us close sales faster.",
      image: "/placeholder.svg?height=300&width=200",
      rating: 5,
    },
    {
      id: 6,
      name: "Maya & Raj Sharma",
      service: "Wedding Videography",
      quote:
        "The wedding film created by Raja Photo Studio brought tears to our eyes. They captured moments we didn't even realize happened and wove them into a beautiful story. We'll treasure this forever.",
      image: "/placeholder.svg?height=300&width=200",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Client Testimonials</h1>
        <p className="text-gray-300 max-w-3xl mb-12">
          Don't just take our word for it. Here's what our clients have to say about their experience working with Raja
          Photo Studio.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-[#0b3c5a] border-none overflow-hidden">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-1/3">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={200}
                      height={300}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="w-2/3">
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "fill-[#ff6c4b] text-[#ff6c4b]" : "text-gray-400"}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="text-white font-medium">{testimonial.name}</p>
                      <p className="text-[#ff6c4b] text-sm">{testimonial.service}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-[#9dbaa0]/20 p-8 rounded-md mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">What Our Clients Love About Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff6c4b] flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Passion for Photography</h3>
              <p className="text-gray-300">
                Our genuine love for photography shines through in every project, creating images that are both
                technically excellent and emotionally resonant.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff6c4b] flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Reliability & Professionalism</h3>
              <p className="text-gray-300">
                We're known for our punctuality, preparation, and professionalism. Our clients trust us to deliver
                exceptional results, every time.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff6c4b] flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Personal Connection</h3>
              <p className="text-gray-300">
                We take the time to understand your vision and build a relationship that allows us to capture authentic
                moments that tell your unique story.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Share Your Experience</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Have you worked with us? We'd love to hear about your experience. Your feedback helps us improve and lets
            others know what to expect when working with Raja Photo Studio.
          </p>
          <Button className="bg-[#ff6c4b] hover:bg-[#e05a3b] text-white">Submit a Testimonial</Button>
        </div>
      </div>
    </div>
  )
}

