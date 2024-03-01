import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Products from "@/models/products";
import Stripe from "stripe";

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
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    try {
      const stripePricing = price.replace(/[,.]/g, "");
      const createNewPrice = await stripe.products.create({
        name: name,
        default_price_data: { currency: "usd", unit_amount: stripePricing },
        images: images,
      });

      const stripeProductId = createNewPrice.default_price;

      products.stripeProductId = stripeProductId;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }

    if (!products) {
      return NextResponse.json(
        {
          message: "Products not found",
        },
        { status: 400 }
      );
    } else {
      products.name = name || products.name;
      products.price = price || products.price;
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
