import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();

  // List of public routes that don't require authentication
  const publicRoutes = ["/"];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  // If it's a public route and there's no session, allow access without navbar
  if (isPublicRoute && !session) {
    return NextResponse.next();
  }

  // If there's no session and it's not a public route, redirect to home (which serves as login)
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For authenticated users or public routes with a session, proceed normally
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
