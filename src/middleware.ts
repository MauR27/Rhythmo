import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: any) => {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(req);
  console.log(session);

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (
    req.nextUrl.pathname === "/admin/add-products" &&
    session.email !== process.env.ADMIN_ROLE
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (
    req.nextUrl.pathname === "/pages/profile" &&
    session.provider === "google"
  )
    return NextResponse.redirect(new URL("/", req.url));
  return NextResponse.next();
};
export default handler;

export const config = {
  matcher: ["/pages/profile/:path*", "/admin/:path*", "/pages/cart"],
};
