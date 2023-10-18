import { NextResponse } from "next/server";
import User from "@/models/users";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    const userEmail = session?.user?.email;

    const cartLength = await User.aggregate([
      { $match: { email: userEmail } },
      { $project: { cart: 1 } },
      { $unwind: "$cart" },
    ]).exec();

    return NextResponse.json(cartLength.length, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
