"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Upload, User, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { database } from "@/utils/firebaseConfig";
// ...[imports stay the same]
import { ref, onValue, remove } from "firebase/database"; // Make sure `remove` is imported


export default function AdminPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  interface Testimonial {
    id: string;
    username: string;
    review: string;
    service: string;
    rating: number;
    userPhoto: string;
    timestamp: number;
  }

  interface Contact {
    id: string;
    name: string;
    email: string;
    message: string;
    date: string;
  }

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Fetch data from Firebase
  useEffect(() => {
    const testimonialsRef = ref(database, "testimonials");
    const contactsRef = ref(database, "contacts");

    // Fetch Testimonials
    const unsubscribeTestimonials = onValue(testimonialsRef, (snapshot) => {

      const data = snapshot.val();
      if (data) {
        const parsed = Object.entries(data).map(([id, value]: [string, any]) => ({
          id,
          username: value.username || "Anonymous",
          service: value.service || "Service Not Specified",
          review: value.review || "No review provided.",
          userPhoto: value.userPhoto || "/placeholder.svg",
          rating: value.rating || 5, // Default rating 5 if missing
          timestamp: value.timestamp || 0,
        }));

        // Sort testimonials by timestamp (most recent first)
        parsed.sort((a, b) => b.timestamp - a.timestamp);
        setTestimonials(parsed);
      } else {
        setTestimonials([]);
      }
    });

    // Fetch Contacts
    const unsubscribeContacts = onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.entries(data).map(([id, value]: [string, any]) => ({
          id,
          name: value.name,
          email: value.email,
          message: value.message,
          date: value.date,
        }));
        setContacts(parsed.reverse());
      } else {
        setContacts([]);
      }
    });

    return () => {
      unsubscribeTestimonials();
      unsubscribeContacts();
    };
  }, []);

  const handleDeleteTestimonial = async (id: string) => {
    try {
      await remove(ref(database, `testimonials/${id}`));
      alert("Testimonial deleted successfully.");
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Failed to delete testimonial.");
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await remove(ref(database, `contacts/${id}`));
      alert("Contact submission deleted successfully.");
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact submission.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Image uploaded successfully!");
      setFile(null);
      setPreview(null);
    } catch (error) {
      alert("Upload failed. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#03121c]">
      <img src="/logo.png" alt="Logo" className="absolute top-5 left-5 w-40 h-15" />
      <Button
        onClick={handleLogout}
        className="absolute top-5 right-5 bg-[#ff6c4b] hover:bg-[#e05a3b] text-white px-4 py-2 rounded-md"
      >
        Logout
      </Button>

      <div className="container mx-auto pt-24 px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

        {/* Image Upload Section */}
        <Card className="mb-8 bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Upload className="mr-2" size={20} />
              Upload Images
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-[#ff6c4b] transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <div className="flex flex-col items-center justify-center py-4">
                      <Upload className="text-slate-400 mb-2" size={40} />
                      <p className="text-slate-300">Click to upload or drag and drop</p>
                      <p className="text-slate-400 text-sm mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                    </div>
                  </label>
                </div>
                <Button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="mt-4 bg-[#ff6c4b] hover:bg-[#e05a3b] text-white w-full py-2"
                >
                  {uploading ? "Uploading..." : "Upload Image"}
                </Button>
              </div>
              {preview && (
                <div className="flex-1">
                  <div className="bg-slate-700 rounded-lg p-2 h-full">
                    <p className="text-slate-300 mb-2">Preview:</p>
                    <div className="relative h-48 w-full">
                      <img
                        src={preview}
                        alt="Preview"
                        className="rounded object-contain w-full h-full"
                      />
                    </div>
                    <p className="text-slate-400 text-sm mt-2 truncate">{file?.name}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Testimonials */}
        <Card className="mb-8 bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <User className="mr-2" size={20} />
              Latest Testimonials
            </h2>
            <div className="space-y-4">
              {testimonials.map((testimonial) => (

                <div key={testimonial.id} className="bg-slate-700 rounded-lg p-4 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4"> {/* Added space-x-4 for spacing */}
                      {/* User Profile Image */}
                      <img
                        src={testimonial.userPhoto || "/default-pfp.png"}
                        alt={testimonial.username}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#ff6c4b]"
                      />
                      {/* Username and Review */}
                      <div>
                        <h3 className="font-medium text-white">{testimonial.username}</h3>
                        <p className="text-slate-300 mt-1">"{testimonial.review}"</p>
                        <p className="text-slate-400 text-sm mt-1 italic">{testimonial.service}</p>
                      </div>
                    </div>
                    {/* Rating */}
                    <div className="flex space-x-1 mt-8">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${i < testimonial.rating ? "text-yellow-400" : "text-slate-600"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs mt-2">
                    {new Date(testimonial.timestamp).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="absolute mt-2 top-2 right-4 text-red-500 hover:text-red-700 hover:bg-red-200 text-sm rounded-md px-2 py-1 border-2 border-red-500"
                  >

                    Delete
                  </button>

                </div>


              ))}

            </div>
            <Button className="mt-4 bg-slate-700 hover:bg-slate-600 text-white">
              View All Testimonials
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </CardContent>
        </Card>

        {/* Contact Form Submissions */}
        <Card className="mb-8 bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <MessageSquare className="mr-2" size={20} />
              Contact Form Submissions
            </h2>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="bg-slate-700 rounded-lg p-4 relative">
                  <h3 className="font-medium text-white">{contact.name}</h3>
                  <p className="text-slate-400 text-sm">{contact.email}</p>
                  <p className="text-slate-300 mt-2">{contact.message}</p>
                  <p className="text-slate-500 text-xs mt-2">{contact.date}</p>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="absolute right-4 top-4 bottom-4 my-auto text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
