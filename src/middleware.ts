import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    
    if (!req.nextauth.token && pathname.startsWith("/dashboard")) {
      const url = new URL("/auth/login", req.url);
      return NextResponse.redirect(url);
    }

 
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, 
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"], 
};
