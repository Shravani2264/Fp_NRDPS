"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { auth, database } from "../../utils/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

interface Testimonial {
  id: string;
  name: string;
  service: string;
  quote: string;
  image: string;
  rating: number;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Fetch testimonials from Firebase Realtime Database
  useEffect(() => {
    const testimonialsRef = ref(database, "testimonials");
    onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const testimonialList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTestimonials(testimonialList);
      }
    });
  }, []);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Client Testimonials</h1>
        <p className="text-gray-300 max-w-3xl mb-12">
          Don't just take our word for it. Here's what our clients have to say about their experience working with Raja
          Photo Studio.
        </p>

        {/* Display testimonials dynamically */}
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

        {/* Submit Testimonial Button (Only if Logged In) */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Share Your Experience</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Have you worked with us? We'd love to hear about your experience. Your feedback helps us improve and lets
            others know what to expect when working with Raja Photo Studio.
          </p>

          {user ? (
            <Button className="bg-[#ff6c4b] hover:bg-[#e05a3b] text-white" onClick={() => router.push("/submit-testimonial")}>
              Submit a Testimonial
            </Button>
          ) : (
            <Button className="bg-[#ff6c4b] hover:bg-[#e05a3b] text-white" onClick={() => router.push("/login")}>
              Login to Submit a Testimonial
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
