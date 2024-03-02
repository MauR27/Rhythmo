import { NextResponse } from "next/server";
import User from "@/models/users";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession();
    const userEmail = session?.user?.email;
    const user = await User.findOne({ email: userEmail });

    if (user) {
      user.cart = [];
      await user.save();

      return NextResponse.json(user.cart, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    if (error instanceof Error)
      NextResponse.json({ error: error }, { status: 404 });
  }
}
