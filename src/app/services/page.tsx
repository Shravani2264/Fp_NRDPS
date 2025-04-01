import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  const services = [
    {
      title: "Wedding Photography",
      description:
        "Our comprehensive wedding photography service captures every moment of your special day, from getting ready to the last dance. We blend candid shots with posed portraits to tell the complete story of your celebration.",
      features: [
        "Pre-wedding consultation",
        "Full-day coverage",
        "Second photographer option",
        "Online gallery",
        "Custom wedding album",
      ],
      image: "/service2.jpeg?height=400&width=600",
    },
    {
      title: "Portrait Sessions",
      description:
        "Our portrait sessions are designed to capture your personality and create images that reflect who you are. Whether it's for individuals, families, or corporate headshots, we ensure a comfortable and enjoyable experience.",
      features: [
        "Studio or location options",
        "Wardrobe consultation",
        "Multiple outfit changes",
        "Retouched digital images",
        "Print packages available",
      ],
      image: "/service3.jpeg?height=500&width=500",
    },
    {
      title: "Event Coverage",
      description:
        "From corporate gatherings to birthday celebrations, our event photography service ensures all key moments are captured with minimal intrusion. We document the atmosphere, interactions, and special moments throughout your event.",
      features: [
        "Flexible hourly coverage",
        "Quick turnaround time",
        "Candid and group photos",
        "Event highlight slideshow",
        "Corporate branding options",
      ],
      image: "/service4.jpg?height=400&width=600",
    },
    {
      title: "Commercial Shoots",
      description:
        "Our commercial photography services help businesses showcase their products, services, and brand identity. We work closely with you to understand your marketing goals and create images that align with your brand vision.",
      features: [
        "Product photography",
        "Architectural/real estate",
        "Food and beverage",
        "Corporate portraits",
        "Social media content packages",
      ],
      image: "/service1.jpeg?height=400&width=600",
    },
    
    {
      title: "Video Production",
      description:
        "Our video production services complement our photography, offering cinematic storytelling for weddings, events, and commercial projects. We create compelling visual narratives that engage and inspire.",
      features: [
        "4K filming",
        "Drone footage",
        "Professional editing",
        "Custom music options",
        "Short and long format options",
      ],
      image: "/service5.jpg?height=400&width=600",
    },
  ]

  return (
    <div className="min-h-screen py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h1>
        <p className="text-gray-300 max-w-3xl mb-12">
          At Raja Photo Studio, we offer a comprehensive range of photography and videography services to meet all your
          visual storytelling needs. Each service is customized to your specific requirements, ensuring results that
          exceed your expectations.
        </p>

        <div className="space-y-16">
          {services.map((service, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
              <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                <h2 className="text-2xl font-bold text-white mb-4">{service.title}</h2>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <h3 className="text-lg font-semibold text-[#ff6c4b] mb-3">What's Included:</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-1">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <Button className="bg-[#ff6c4b] hover:bg-[#e05a3b] text-white">Book This Service</Button>
              </div>
              <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="w-full rounded-md object-cover h-[300px]"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#0b3c5a] p-8 rounded-md">
          <h2 className="text-2xl font-bold text-white mb-4">Custom Packages</h2>
          <p className="text-gray-300 mb-6">
            Can't find exactly what you're looking for? We offer custom packages tailored to your specific needs.
            Contact us to discuss your project requirements and we'll create a personalized solution for you.
          </p>
          <Button asChild className="bg-[#ff6c4b] hover:bg-[#e05a3b] text-white">
            <Link href="/contact">Contact Us for Custom Packages</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

