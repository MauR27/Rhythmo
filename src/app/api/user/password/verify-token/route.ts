import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/users";
import crypto from "crypto";

export async function POST(req: Request) {
  const { token } = await req.json();

  await connectDB();

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid token or has expired" },
      { status: 409, statusText: "Invalid token or has expired" }
    );
  }

  return NextResponse.json({ user }, { status: 200 });
}
