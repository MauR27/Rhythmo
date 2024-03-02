import { NextResponse } from "next/server";
import User from "@/models/users";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    const userEmail = session?.user?.email;

    const favoriteProductListLength = await User.aggregate([
      { $match: { email: userEmail } },
      { $project: { favoriteProduct: 1 } },
      { $unwind: "$favoriteProduct" },
    ]).exec();

    return NextResponse.json(favoriteProductListLength.length, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
