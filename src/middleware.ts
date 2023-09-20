import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async (req: NextRequest) => {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (
    req.nextUrl.pathname === "/admin/add-instruments" &&
    session.email !== process.env.ADMIN_ROLE
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/profile", "/admin/add-instruments"],
};
