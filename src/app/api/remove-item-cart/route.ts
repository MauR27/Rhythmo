import { NextResponse } from "next/server";
import User from "@/models/users";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { _id } = await req.json();
    const session = await getServerSession();
    const userEmail = session?.user?.email;
    const user = await User.findOne({ email: userEmail });
    const removeItem = await user.cart.filter(
      (item: any) => item._id.toString() !== _id
    );
    if (removeItem) {
      user.cart = removeItem;
      await user.save();
      return NextResponse.json(user, { status: 200 });
    } else {
      throw new Error("Item not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
