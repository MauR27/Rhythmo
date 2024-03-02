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
        { message: "you have to login in" },
        { status: 400, statusText: "You have to Login In first" }
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
        return NextResponse.json(user, {
          status: 201,
          statusText: "Item marked as Favorite!!",
        });
      } else {
        return NextResponse.json(
          { message: "You already have this Item in your Favorite List!!" },
          {
            status: 409,
            statusText: "You already have this Item in your Favorite List!!",
          }
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
