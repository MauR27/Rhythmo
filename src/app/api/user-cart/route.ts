import { NextResponse } from "next/server";
import User from "@/models/users";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";

type IcartProduct = {
  name: string;
  price: number;
  brand: string;
  images: string[];
  instrumentType: string;
  productId: string;
  amount: number;
};

export async function PUT(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession();
    const { product } = await req.json();
    if (!session) {
      return NextResponse.json(
        { message: "you have to login in" },
        { status: 400 }
      );
    } else {
      const userEmail = session.user?.email;
      const user: any = await User.findOne({ email: userEmail });
      const cartProduct: IcartProduct[] = [
        {
          brand: product.brand,
          images: product.images,
          instrumentType: product.instrumentType,
          price: product.price,
          name: product.name,
          productId: product._id,
          amount: product.amount,
        },
      ];

      const productExists = user.cart.find(
        (cartProduct: IcartProduct) => cartProduct.productId === product._id
      );

      if (!productExists) {
        user.cart.push(...cartProduct);

        await user.save();
        console.log(cartProduct);
        return NextResponse.json(user, {
          status: 201,
          statusText: "Item added successfully!",
        });
      } else {
        return NextResponse.json(
          { message: "Product already exists in the cart" },
          { status: 409, statusText: "Item already exists in your cart!" }
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
