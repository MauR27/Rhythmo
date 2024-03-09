export const dynamic = "force-dynamic";

import connectDB from "@/lib/mongodb";
import User from "@/models/users";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type IFavoriteCartProduct = {
  name: string;
  price: string;
  brand: string;
  images: string[];
  instrumentType: string;
  productId: string;
  amount: number;
  itemQuantity: number;
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
      const favoriteCartProducts: IFavoriteCartProduct[] = [
        {
          brand: product.brand,
          images: product.images,
          instrumentType: product.instrumentType,
          price: product.price,
          name: product.name,
          productId: product._id,
          amount: product.amount,
          itemQuantity: 1,
        },
      ];
      const productExists = user.favoriteProduct.find(
        (cartProduct: IFavoriteCartProduct) =>
          cartProduct.productId === product._id
      );

      if (!productExists) {
        user.favoriteProduct.push(...favoriteCartProducts);

        await user.save();
        return NextResponse.json(
          { user },
          {
            status: 201,
          }
        );
      } else {
        user.favoriteProduct = user.favoriteProduct.filter(
          (data: any) => data.productId !== product._id
        );
      }
      await user.save();

      return NextResponse.json(
        {
          user,
          message: "Remove from favorite...",
        },
        {
          status: 409,
        }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
