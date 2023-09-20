import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Products from "@/models/products";

export async function POST(req: Request) {
  const { name, price, description, brand, images, instrumentType, amount } =
    await req.json();
  try {
    await connectDB();
    const productsId = "650805642721f2b64abcf18b";
    const products = await Products.findById(productsId);

    if (!products) {
      return NextResponse.json(
        {
          message: "Products not found",
        },
        { status: 400 }
      );
    } else {
      const addInstruments = [
        {
          name,
          price,
          description,
          brand,
          images,
          instrumentType,
          amount,
        },
      ];

      products.products.push(...addInstruments);

      const productsUpdated = await products.save();
      return NextResponse.json(
        { productsUpdated },
        { status: 201, statusText: "Instruments added" }
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
