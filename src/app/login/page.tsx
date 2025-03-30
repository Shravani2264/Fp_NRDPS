"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize the router

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulating authentication success
    console.log("Login attempt with:", { email, password });

    // Redirect to the home page after login
    router.push("/home_after_login");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#ff6c4b] h-32 rounded-t-md flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Camera className="h-10 w-10 text-white" />
            <h1 className="text-2xl font-bold text-white mt-2">Raja Photo Studio</h1>
          </div>
        </div>
        <div className="bg-[#0b3c5a] p-8 rounded-b-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#102330] border-[#142129] text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#102330] border-[#142129] text-white"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#ff6c4b] hover:bg-[#e05a3b] text-white">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#ff6c4b] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
