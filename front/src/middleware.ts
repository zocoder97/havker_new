// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./utils/auth";

export function middleware(req: NextRequest) {
  /* const isAuth = isAuthenticated();

  // Rediriger vers le login si non connecté
  if (!isAuth && req.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); */
   return null;
}
