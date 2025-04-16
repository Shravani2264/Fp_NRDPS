"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Set mounted to true once the component is hydrated
  }, []);

  if (!mounted) {
    return null; // Avoid rendering the children until after hydration
  }

  return (
    <html lang="en">
      <body><div className="min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
      </body>
    </html>
  );
}
