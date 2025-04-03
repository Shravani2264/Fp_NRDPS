"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/utils/firebaseconfig"
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();

  // Function to handle email/password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Google login successful");
      router.push("/");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen " style={{ backgroundColor: '#03121c' }}>            <img 
        src="logo.png" 
        alt="Logo" 
        className="absolute top-5 left-5 w-43 h-20" 
     />
      <div className="w-full max-w-md">
      <div className="bg-[#0b3c5a] p-8 rounded-b-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label className ="text-white" htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#102330] border-[#142129] text-white" required />
          </div>
          <div>
            <Label className ="text-white" htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#102330] border-[#142129] text-white" required />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <Button onClick={handleGoogleLogin} className="w-full mt-4 bg-blue-500 text-white">Login with Google</Button>
        <p className="text-center mt-4 text-white"> 
          Don't have an account? <Link href="/signup" className="text-[#ff6c4b] hover:underline">Sign Up</Link>
        </p>
      </div>
      </div>
    </div>
  );
}