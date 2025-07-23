import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  // Check for session cookie existence
  const sessionCookie = getSessionCookie(request);

  // NOTE: This only checks for the existence of a session cookie; it does NOT validate it.
  // For security, you must always validate the session on your server for any protected actions or pages.
  const isSessionPresent = !!sessionCookie;

  // Protected routes that require authentication
  const protectedRoutes = ['/profile', '/admin', '/events/manage'];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isSessionPresent) {
    // Redirect to login with the original URL as a redirect parameter
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
