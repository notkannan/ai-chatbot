import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { rateLimiter } from "./lib/rate-limiter";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const currentUser = request.cookies.get("currentUser");

  // Authentication logic
  if (!currentUser && pathname.startsWith("/protected")) {
    return NextResponse.redirect(new URL("/auth/authform", request.url));
  }

  if (currentUser && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Rate limiting logic
  if (pathname.startsWith("/api/message")) {
    const ip = request.ip ?? "127.0.0.1";

    try {
      const { success } = await rateLimiter.limit(ip);

      if (!success) {
        return new NextResponse("You are writing messages too fast.");
      }
    } catch (error) {
      return new NextResponse(
        "Sorry, something went wrong while processing your message. Please try again later."
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*", "/auth/:path*", "/api/message/:path*"],
};
