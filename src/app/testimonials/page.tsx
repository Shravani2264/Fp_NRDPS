"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { auth, database } from "@/utils/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

interface Testimonial {
  id: string;
  username: string;
  service: string;
  review: string;
  userPhoto: string;
  rating: number;
  timestamp: number;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Fetch testimonials from Firebase Realtime Database
  useEffect(() => {
    const testimonialsRef = ref(database, "testimonials");
    const unsubscribe = onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const testimonialList = Object.entries(data).map(([id, value]: [string, any]) => ({
          id,
          username: value.username || "Anonymous",
          service: value.service || "Service Not Specified",
          review: value.review || "No review provided.",
          userPhoto: value.userPhoto || "/placeholder.svg",
          rating: value.rating || 5, // Default rating 5 if missing
          timestamp: value.timestamp || 0,
        }));

        // Sort testimonials by timestamp (most recent first)
        testimonialList.sort((a, b) => b.timestamp - a.timestamp);
        setTestimonials(testimonialList);
      } else {
        setTestimonials([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen py-16 px-4 md:px-6 bg-[#03121c]">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
          Client Testimonials
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-center mb-12">
          Don't just take our word for it. Here's what our clients have to say about their experience working with
          Raja Photo Studio.
        </p>

        {/* Display testimonials dynamically */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-[#102330] border-none overflow-hidden shadow-lg">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-1/3">
                    <Image
                      src={testimonial.userPhoto}
                      alt={testimonial.username}
                      width={100}
                      height={100}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#ff6c4b]"
                    />
                  </div>
                  <div className="w-2/3">
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "fill-[#ff6c4b] text-[#ff6c4b]" : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-4">"{testimonial.review}"</p>
                    <div>
                      <p className="text-white font-medium">{testimonial.username}</p>
                      <p className="text-[#ff6c4b] text-sm">{testimonial.service}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-300">No testimonials yet. Be the first to share your experience!</p>
          )}
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
