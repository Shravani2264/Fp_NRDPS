"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { auth, database } from "@/utils/firebaseconfig" 
import { ref, push } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export default function SubmitTestimonial() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !service || !review) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    let imageUrl = "";

    try {
      if (image) {
        const storage = getStorage();
        const imageRef = storageRef(storage, `testimonials/${user.uid}-${Date.now()}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const testimonialRef = ref(database, "testimonials");
      await push(testimonialRef, {
        username: name,
        service,
        review,
        rating,
        userPhoto: imageUrl || "/placeholder.svg",
        timestamp: Date.now(),
      });

      alert("Testimonial submitted successfully!");
      router.push("/testimonials");
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert("Failed to submit testimonial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-6 bg-[#0b3c5a]">
      <div className="container mx-auto max-w-2xl bg-[#102330] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Submit a Testimonial</h1>
        <p className="text-gray-300 text-center mb-6">
          Share your experience with Raja Photo Studio. Your feedback is valuable!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#1c3b5f] text-white"
            required
          />
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="bg-[#1c3b5f] text-gray-400 text-sm p-2 rounded w-full"
            required
          >
            <option value="" disabled hidden>Select a service</option>
            <option value="Wedding Photography">Wedding Photography</option>
            <option value="Portrait Sessions">Portrait Sessions</option>
            <option value="Event Coverage">Event Coverage</option>
            <option value="Commercial Shoots">Commercial Shoots</option>
            <option value="Family Portraits">Family Portraits</option>
            <option value="Product Photography">Product Photography</option>
            <option value="Video Production">Video Production</option>
          </select>
          <Textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="bg-[#1c3b5f] text-white"
            required
          />

          {/* Star Rating Selection */}
          <div className="flex items-center gap-2">
            <p className="text-white">Rating:</p>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 cursor-pointer ${
                  i < rating ? "fill-[#ff6c4b] text-[#ff6c4b]" : "text-gray-400"
                }`}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>

          {/* File Upload for Profile Picture */}
          <div className="flex flex-col">
            <label className="text-white">Upload Your Photo (Optional):</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>

          <Button
            type="submit"
            className="bg-[#ff6c4b] hover:bg-[#e05a3b] text-white w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Testimonial"}
          </Button>
        </form>
      </div>
    </div>
  );
}
