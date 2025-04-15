"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Upload, User, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  interface Testimonial {
    id: number;
    name: string;
    message: string;
    date: string;
    rating: number;
  }
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  interface Contact {
    id: number;
    name: string;
    email: string;
    message: string;
    date: string;
  }
  const [contacts, setContacts] = useState<Contact[]>([])

  // Mock data - replace with actual API calls in production
  useEffect(() => {
    // Fetch testimonials
    setTestimonials([
      { id: 1, name: "John Doe", message: "Great service, highly recommended!", date: "2025-04-14", rating: 5 },
      { id: 2, name: "Jane Smith", message: "ExcelSlent customer support!", date: "2025-04-13", rating: 4 },
      { id: 3, name: "Mark Johnson", message: "The product exceeded my expectations.", date: "2025-04-12", rating: 5 },
    ])

    // Fetch contacts
    setContacts([
      { id: 1, name: "Robert Brown", email: "robert@example.com", message: "I'd like to schedule a demo", date: "2025-04-15" },
      { id: 2, name: "Sarah Wilson", email: "sarah@example.com", message: "Question about pricing", date: "2025-04-14" },
      { id: 3, name: "Michael Davis", email: "michael@example.com", message: "Need technical support", date: "2025-04-13" },
    ])
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    
    setUploading(true)
    
    // Simulate API call for image upload
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      alert("Image uploaded successfully!")
      setFile(null)
      setPreview(null)
    } catch (error) {
      alert("Upload failed. Please try again.")
      console.error("Upload error:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing authentication tokens)
    window.location.href = "/"; // Redirect to the login page after logout
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#03121c' }}>
      <img
        src="logo.png"
        alt="Logo"
        className="absolute top-5 left-5 w-40 h-15"
      />
      <Button onClick={handleLogout}
        className="absolute top-5 right-5 bg-[#ff6c4b] hover:bg-[#e05a3b] text-white px-4 py-2 rounded-md">
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
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center cursor-pointer hover:border-[#ff6c4b] transition-colors">
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
        
        {/* Recent Testimonials Section */}
        <Card className="mb-8 bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <User className="mr-2" size={20} />
              Latest Testimonials
            </h2>
            
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-slate-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{testimonial.name}</h3>
                      <p className="text-slate-300 mt-1">{testimonial.message}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-slate-600'}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mt-2">{testimonial.date}</p>
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
              Recent Contact Submissions
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-slate-300">
                <thead className="text-sm text-slate-400 uppercase bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3 rounded-tr-lg">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact, index) => (
                    <tr key={contact.id} className={`border-b border-slate-700 ${index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-750'}`}>
                      <td className="px-4 py-3">{contact.name}</td>
                      <td className="px-4 py-3">{contact.email}</td>
                      <td className="px-4 py-3 truncate max-w-xs">{contact.message}</td>
                      <td className="px-4 py-3">{contact.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <Button className="mt-4 bg-slate-700 hover:bg-slate-600 text-white">
              View All Contact Submissions
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}