import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Products from "@/models/products";
import { getServerSession } from "next-auth";
import User from "@/models/users";

export async function PUT(req: Request) {
  const { _id } = await req.json();
  try {
    await connectDB();
    const session = await getServerSession();

    if (session) {
      const userEmail = session.user?.email;

      await Products.deleteOne({ _id });

      // Delete product from cart, and favoriteProduct aswell

      await User.updateOne(
        { email: userEmail },
        {
          $pull: {
            cart: { productId: _id },
            favoriteProduct: { productId: _id },
          },
        }
      );

      return NextResponse.json({}, { status: 209 });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 400, statusText: error.message }
      );
    }
  }
}
