"use client";

import { useState } from "react";
import { ref, push } from "firebase/database";
import { database, auth } from "@/utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TestimonialForm() {
  const [user] = useAuthState(auth);
  const [review, setReview] = useState("");
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to submit a testimonial.");
      return;
    }

    setLoading(true);

    const testimonialRef = ref(database, "testimonials");
    const newTestimonial = {
      username: user.displayName || "Anonymous",
      service,
      review,
      userPhoto: user.photoURL || "",
      timestamp: Date.now(),
    };

    try {
      await push(testimonialRef, newTestimonial);
      setReview("");
      setService("");
      alert("Testimonial submitted successfully!");
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert("Failed to submit testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#0b3c5a] p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">Submit a Testimonial</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-white">Service Experienced</label>
          <Input
            type="text"
            placeholder="e.g., Wedding Photography"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="bg-[#102330] border-[#142129] text-white"
            required
          />
        </div>
        <div>
          <label className="text-white">Your Review</label>
          <Textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="bg-[#102330] border-[#142129] text-white"
            required
          />
        </div>
        <Button type="submit" className="w-full bg-[#ff6c4b] hover:bg-[#e05a3b]" disabled={loading}>
          {loading ? "Submitting..." : "Submit Testimonial"}
        </Button>
      </form>
    </div>
  );
}
