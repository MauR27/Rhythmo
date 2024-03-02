import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/users";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { name, email, emailVerification } = await req.json();

    const user = await User.findOne({ email: emailVerification });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    } else {
      user.email = email || user.email;
      user.name = name || user.name;

      await user.save();

      return NextResponse.json(user, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Email already exist", error: error },
      { status: 400, statusText: "Email already exist" }
    );
  }
}
