import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Products from "@/models/products";
import { Stripe } from "stripe";

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
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

      const stripeNewProduct = await stripe.products.create({
        name: name,
        default_price_data: { currency: "usd", unit_amount: price },
        images: images,
      });

      const stripeProductId = stripeNewProduct.default_price;

      const transformPrice = price / 100;

      const newPrice = transformPrice.toFixed(2);

      const addInstruments = [
        {
          name,
          price: newPrice,
          description,
          brand,
          images,
          instrumentType,
          amount,
          stripeProductId,
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
