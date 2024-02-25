import connectDB from "@/lib/mongodb";
import User from "@/models/users";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession();
    const userEmail = session?.user?.email;

    const user = await User.findOne({ email: userEmail });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
