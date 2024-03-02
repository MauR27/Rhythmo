import { NextResponse } from "next/server";
import Products from "@/models/products";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    await connectDB();
    const paramsName = searchParams.get("q");
    const products = await Products.findById({ _id: paramsName });

    if (products) {
      return NextResponse.json(products, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 400 }
      );
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}
