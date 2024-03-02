import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Products from "@/models/products";
import { getServerSession } from "next-auth";
import User from "@/models/users";
import Stripe from "stripe";

export async function PUT(req: Request) {
  const { _id, stripe_product_id } = await req.json();
  try {
    await connectDB();
    const session = await getServerSession();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
    if (session) {
      const userEmail = session.user?.email;

      await Products.deleteOne({ _id });

      // Delete product from cart and archive from STRIPE, and favoriteProduct as well ↓↓

      await User.updateOne(
        { email: userEmail },
        {
          $pull: {
            cart: { productId: _id },
            favoriteProduct: { productId: _id },
          },
        }
      );

      await stripe.products.update(stripe_product_id, { active: false });

      return NextResponse.json(
        { message: "Product deleted successfully" },
        { status: 200 }
      );
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
