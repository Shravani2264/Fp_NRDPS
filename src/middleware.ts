import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("firebase-auth-token");

  const isAuthenticated = !!authToken;
  const urlPath = req.nextUrl.pathname;

  // Prevent logged-in users from accessing login/signup pages
  if (isAuthenticated && (urlPath === "/login" || urlPath === "/signup")) {
    return NextResponse.redirect(new URL("/home_after_login", req.url));
  }

  // Prevent unauthenticated users from adding testimonials
  if (!isAuthenticated && urlPath === "/add-testimonial") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Configure middleware to run only on specific routes
export const config = {
  matcher: ["/login", "/signup", "/add-testimonial"],
};
