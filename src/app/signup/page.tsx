"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera } from "lucide-react"
import { auth, database } from "@/utils/firebaseconfig"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { ref, set } from "firebase/database"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();

  // Function to handle Email/Password Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user details in Firebase Realtime Database
      await set(ref(database, "users/" + user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date().toISOString()
      });

      console.log("User signed up:", user);
      router.push("/");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  // Function to handle Google Signup
  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Store Google user in Firebase Realtime Database if new
      await set(ref(database, "users/" + user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString()
      });

      console.log("Google signup successful:", user);
      router.push("/");
    } catch (error) {
      console.error("Google signup error:", error);
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
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label className ="text-white" htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#102330] border-[#142129] text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className ="text-white" htmlFor="email">Email</Label>
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
              <Label className ="text-white" htmlFor="password">Password</Label>
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
              Sign Up
            </Button>
          </form>
          <Button
            onClick={handleGoogleSignup}
            className="w-full mt-4 bg-[#4285F4] hover:bg-[#357ae8] text-white"
          >
            Sign Up with Google
          </Button>
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-[#ff6c4b] hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
