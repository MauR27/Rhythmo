export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import User from "@/models/users";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { _id, action } = await req.json();
    const session = await getServerSession();
    const userEmail = session?.user?.email;
    const user = await User.findOne({ email: userEmail });
    const filteredUserCart = await user.cart.find(
      (item: any) => item.productId === _id
    );

    if (action === "add") {
      filteredUserCart.itemQuantity += 1;
      await user.save();
      return NextResponse.json(user, { status: 200 });
    } else if (action === "sub") {
      filteredUserCart.itemQuantity -= 1;
      await user.save();
      return NextResponse.json(user, { status: 200 });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
