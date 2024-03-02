import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/users";

export async function POST(req: Request) {
  const { password, email } = await req.json();

  if (!password || password.length < 6)
    return NextResponse.json(
      { message: "Password must be at least 6 caracteres" },
      { status: 400, statusText: "Password must be at least 6 caracteres" }
    );

  await connectDB();

  const user = await User.findOne({
    email: email,
  });

  try {
    if (password) {
      user.password = password;

      user.resetToken = undefined;
      user.resetTokenExpires = undefined;

      await user.save();

      return NextResponse.json(
        { message: "user password was updated" },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400, statusText: "Something went wrong, try again" }
      );
    }
  }
  return NextResponse.json(
    { error: "error to hashing" },
    { status: 400, statusText: "Something went wrong, try again" }
  );
}
