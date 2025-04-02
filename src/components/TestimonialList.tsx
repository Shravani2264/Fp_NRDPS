"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/utils/firebaseConfig";

export default function TestimonialList() {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const testimonialRef = ref(database, "testimonials");
    
    const unsubscribe = onValue(testimonialRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const testimonialArray = Object.entries(data).map(([id, value]) => ({
          id, ...value,
        }));
        // Sort by timestamp (most recent first)
        testimonialArray.sort((a, b) => b.timestamp - a.timestamp);
        setTestimonials(testimonialArray);
      } else {
        setTestimonials([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-[#0b3c5a] mb-6">Testimonials</h2>
      {testimonials.length > 0 ? (
        testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
            <div className="flex items-center space-x-4">
              {testimonial.userPhoto ? (
                <img src={testimonial.userPhoto} alt={testimonial.username} className="w-12 h-12 rounded-full" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-700 font-bold">{testimonial.username.charAt(0)}</span>
                </div>
              )}
              <div>
                <h3 className="font-bold text-lg">{testimonial.username}</h3>
                <p className="text-sm text-gray-600">{testimonial.service}</p>
              </div>
            </div>
            <p className="mt-2 text-gray-800">{testimonial.review}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No testimonials yet.</p>
      )}
    </div>
  );
}
