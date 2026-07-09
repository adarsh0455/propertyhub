import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 🛡️ 1. Admin Route Protection Control
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login?error=UnauthorizedAdmin", req.url));
    }

    // 🛡️ 2. Seller Dashboard Protection Control - Only OWNER/AGENT roles allowed
    if (path.startsWith("/sellerdashboard") && token?.role !== "OWNER" && token?.role !== "AGENT" && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login?error=UnauthorizedSeller", req.url));
    }
  },
  {
    callbacks: {
      // Middleware tabhi chalega jab user ke paas valid token/cookie ho
      authorized: ({ token }) => !!token,
    },
  }
);

// 🔥 Ye middleware sirf inhi specific dynamic dashboard paths par trigger hoga
export const config = {
  matcher: ["/admin/:path*", "/sellerdashboard/:path*"],
};