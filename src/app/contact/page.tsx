"use client";

// import { useState } from "react";
// import type React from "react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";


export default function ContactPage() {
  // ✅ Add state for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle dropdown (Select) changes
  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

  // ✅ Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form or show success message
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-gray-300 max-w-3xl mb-12">
          Have a question or ready to book a session? Get in touch with us using the form below or through our contact information.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* ✅ Contact Information Section */}
          <div>
            <div className="space-y-8 mb-8">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0b3c5a] flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[#ff6c4b]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Our Location</h3>
                  <p className="text-gray-300 mt-1">123 Photography Lane, Creative City, 56789</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0b3c5a] flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-[#ff6c4b]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Phone Numbers</h3>
                  <p className="text-gray-300 mt-1">Main: +1 (555) 123-4567</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0b3c5a] flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-[#ff6c4b]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Email Addresses</h3>
                  <p className="text-gray-300 mt-1">info@rajaphotostudio.com</p>
                </div>
              </div>

              {/* ✅ Fixed Business Hours Section */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0b3c5a] flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-[#ff6c4b]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Business Hours</h3>
                  <p className="text-gray-300 mt-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Contact Form Section */}
          <div className="bg-[#0b3c5a] p-8 rounded-md">
            <h2 className="text-2xl font-bold text-white mb-6">Send Us A Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="bg-[#102330] text-white"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="bg-[#102330] text-white"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="bg-[#102330] text-white"
                />
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <Label htmlFor="service">Service Interested In</Label>
                <Select value={formData.service} onValueChange={handleServiceChange}>
                  <SelectTrigger className="bg-[#102330] text-white">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding Photography</SelectItem>
                    <SelectItem value="portrait">Portrait Sessions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project"
                  className="bg-[#102330] text-white min-h-[150px]"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-[#ff6c4b] text-white">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
