import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(req: Request) {
  const { stripeId, quantity } = await req.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card", "paypal"],
    line_items: [
      {
        price: stripeId,
        quantity: quantity, // add quantity from frontend
      },

      //add more products to buy
    ],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cart",
  });

  return NextResponse.json({ url: session.url });
}
