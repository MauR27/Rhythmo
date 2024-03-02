import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Products from "@/models/products";
import { Stripe } from "stripe";

export async function POST(req: Request) {
  const { name, price, description, brand, images, instrumentType, amount } =
    await req.json();
  try {
    await connectDB();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const stripePricing = price.replace(/[,.]/g, "");
    const stripeNewProduct = await stripe.products.create({
      name: name,
      default_price_data: { currency: "usd", unit_amount: stripePricing },
      images: images,
    });

    const stripe_price_id = stripeNewProduct.default_price;
    const stripe_product_id = stripeNewProduct.id;

    const newProduct = new Products({
      name,
      price,
      description,
      brand,
      images,
      instrumentType,
      amount,
      stripe_price_id,
      stripe_product_id,
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json(
      { savedProduct },
      { status: 201, statusText: "Instruments added" }
    );
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
