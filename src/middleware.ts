import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (
    req.nextUrl.pathname === "/admin/add-instruments" &&
    session.email !== process.env.ADMIN_ROLE
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};
export default handler;

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*", "/cart"],
};
