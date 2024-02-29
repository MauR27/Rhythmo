import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Products from "@/models/products";

export async function PUT(req: Request) {
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
  try {
    await connectDB();
    const products = await Products.findById({ _id });

    if (!products) {
      return NextResponse.json(
        {
          message: "Products not found",
        },
        { status: 400 }
      );
    } else {
      const transformPrice = price / 100;

      const newPrice = transformPrice.toFixed(2);

      products.name = name || products.name;
      products.price = newPrice;
      products.description = description || products.description;
      products.brand = brand || products.brand;
      products.images = images || products.images;
      products.instrumentType = instrumentType || products.instrumentType;
      products.amount = amount || products.amount;

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
