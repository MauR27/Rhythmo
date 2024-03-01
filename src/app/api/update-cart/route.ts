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
  stripeProductId: string;
};

export async function PUT(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession();
    const {
      name,
      price,
      description,
      brand,
      images,
      instrumentType,
      amount,
      _id,
    } = await req.json();
    if (!session) {
      return NextResponse.json(
        { message: "you have to login in" },
        { status: 400, statusText: "You have to Login In first" }
      );
    } else {
      const userEmail = session.user?.email;
      const user: any = await User.findOne({ email: userEmail });

      const filterProductCart = user.cart.find(
        (data: ICartProduct) => data.productId === _id
      );
      filterProductCart.name = name || filterProductCart.name;
      filterProductCart.price = price || filterProductCart.price;
      filterProductCart.description =
        description || filterProductCart.description;
      filterProductCart.brand = brand || filterProductCart.brand;
      filterProductCart.images = images || filterProductCart.images;
      filterProductCart.instrumentType =
        instrumentType || filterProductCart.instrumentType;
      filterProductCart.amount = amount || filterProductCart.amount;

      await user.save();
      return NextResponse.json(user, {
        status: 201,
        statusText: "Item added successfully!",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
