export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import User from "@/models/users";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession();

    const userEmail = session?.user?.email;

    const user = await User.findOne({ email: userEmail });

    const userFavoriteProductList = await user.favoriteProduct;

    return NextResponse.json(userFavoriteProductList, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
