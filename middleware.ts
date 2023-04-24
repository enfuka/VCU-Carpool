import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && path.startsWith("/protected")) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/protected/user/findride", req.url));
  }

  if (session && path === "/protected" && session.picture) {
    return NextResponse.redirect(new URL("/protected/admin", req.url));
  } else if (session && path === "/protected" && !session.picture) {
    return NextResponse.redirect(new URL("/protected/user/findride", req.url));
  }

  if (session && path === "/") {
    return NextResponse.redirect(new URL("/protected/user/findride", req.url));
  }

  if (path.startsWith("/protected/admin") && !session?.picture) {
    return NextResponse.redirect(new URL("/protected/user/findride", req.url));
  }
}
