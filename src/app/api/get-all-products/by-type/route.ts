import { NextResponse } from "next/server";
import Products from "@/models/products";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    await connectDB();
    const products = await Products.find();
    const paramsName = searchParams.get("q");
    if (products) {
      const productsSort = await products[0].products.reverse();

      const productsSortByType = await productsSort.filter(
        (instrument: any) => instrument.instrumentType === paramsName
      );

      return NextResponse.json(productsSortByType, { status: 200 });
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
