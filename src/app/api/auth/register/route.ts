import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/users";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!password || password.length < 6)
    return NextResponse.json(
      { message: "Password must be at least 6 caracteres" },
      { status: 401, statusText: "Password must be at least 6 caracteres" }
    );

  try {
    await connectDB();
    const user = await User.findOne({ email: email });

    if (user)
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 402, statusText: "Email already in use" }
      );

    const newLocalUser = await User.create({
      name,
      email,
      password,
    });

    if (!newLocalUser) {
      return NextResponse.json(
        {
          message: "Invalid user data",
        },
        { status: 403 }
      );
    } else {
      return NextResponse.json(
        {
          _id: newLocalUser._id,
          name: newLocalUser.name,
          email: newLocalUser.email,
        },
        {
          status: 201,
          statusText: "User Created",
        }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Invalid user data",
        },
        { status: 403 }
      );
    }
  }
}
