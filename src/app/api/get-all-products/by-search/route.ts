import { NextResponse } from "next/server";
import Products from "@/models/products";
import connectDB from "@/lib/mongodb";
import { Product } from "../../../../../types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    await connectDB();
    const products = await Products.find();
    const paramsName: string | null = searchParams.get("q");
    if (products) {
      const productsSort = await products[0].products.reverse();

      if (paramsName) {
        const regex: RegExp = new RegExp(paramsName, "i");

        const filteredProduct = productsSort.filter((item: Product) => {
          const searchingByName = item.name;
          const searchingByType = item.instrumentType;

          return regex.test(searchingByName) || regex.test(searchingByType);
        });

        return NextResponse.json(filteredProduct, { status: 200 });
      }
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
