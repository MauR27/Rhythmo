export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import User from "@/models/users";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";

type ICartProduct = {
  name: string;
  price: string;
  brand: string;
  images: string[];
  instrumentType: string;
  productId: string;
  amount: number;
  itemQuantity: number;
  stripe_price_id: string;
  stripe_product_id: string;
};

export async function PUT(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession();
    const { product } = await req.json();

    if (!session) {
      return NextResponse.json(
        { message: "You have to Login first" },
        { status: 400 }
      );
    } else {
      const userEmail = session.user?.email;
      const user: any = await User.findOne({ email: userEmail });

      const cartProduct: ICartProduct[] = [
        {
          brand: product.brand,
          images: product.images,
          instrumentType: product.instrumentType,
          price: product.price,
          name: product.name,
          productId: product._id,
          amount: product.amount,
          stripe_price_id: product.stripe_price_id,
          stripe_product_id: product.stripe_product_id,
          itemQuantity: 1,
        },
      ];

      user.cart.push(...cartProduct);

      await user.save();
      return NextResponse.json(user, {
        status: 202,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
