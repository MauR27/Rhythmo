import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(req: Request) {
  try {
    const { cartCheckout } = await req.json();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "paypal"],

      line_items: cartCheckout.map((item: any) => {
        return {
          price: item.stripe_price_id,
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:3000/pages/success",
      cancel_url: "http://localhost:3000/pages/cart",
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof Error)
      NextResponse.json({ error: error }, { status: 400 });
  }
}
