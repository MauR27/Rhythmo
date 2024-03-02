import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Products from "@/models/products";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import User from "@/models/users";

type ICartProduct = {
  name: string;
  price: string;
  brand: string;
  images: string[];
  instrumentType: string;
  productId: string;
  amount: number;
  itemQuantity: number;
  stripeProductId: string;
};

type IFavoriteCartProduct = {
  name: string;
  price: string;
  brand: string;
  images: string[];
  instrumentType: string;
  productId: string;
  amount: number;
  itemQuantity: number;
};

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
    stripe_product_id,
  } = await req.json();
  try {
    await connectDB();
    const session = await getServerSession();

    const products = await Products.findById({ _id });
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

    // CREATING A NEW STRIPE PRODUCT WITH NEW PRODUCT UPDATED ↓↓

    try {
      const stripePricing = price.replace(/[,.]/g, "");

      await stripe.products.update(stripe_product_id, { active: false });

      const createNewProduct = await stripe.products.create({
        name: name,
        default_price_data: { currency: "usd", unit_amount: stripePricing },
        images: images,
      });

      const new_stripe_price_id = createNewProduct.default_price;
      const new_stripe_product_id = createNewProduct.id;

      products.stripe_price_id = new_stripe_price_id;
      products.stripe_product_id = new_stripe_product_id;

      await products.save();

      if (session) {
        const userEmail = session.user?.email;
        const user: any = await User.findOne({ email: userEmail });

        const filterProductCart = user.cart.find(
          (data: ICartProduct) => data.productId === _id
        );

        const productExists: any = user.favoriteProduct.find(
          (favoriteProduct: IFavoriteCartProduct) =>
            favoriteProduct.productId === _id
        );

        // UPDATE USER CART WHEN ADMIND EDIT PRODUCTS ↓↓

        if (filterProductCart) {
          filterProductCart.name = name || filterProductCart.name;
          filterProductCart.price = price || filterProductCart.price;
          filterProductCart.description =
            description || filterProductCart.description;
          filterProductCart.brand = brand || filterProductCart.brand;
          filterProductCart.images = images || filterProductCart.images;
          filterProductCart.instrumentType =
            instrumentType || filterProductCart.instrumentType;
          filterProductCart.amount = amount || filterProductCart.amount;
          filterProductCart.stripe_price_id = new_stripe_price_id;
          filterProductCart.stripe_product_id = new_stripe_product_id;

          await user.save();
        }

        // UPDATE FAVORITE USER PRODUCTS WHEN ADMIND EDIT PRODUCTS ↓↓

        if (productExists) {
          productExists.name = name || productExists.name;
          productExists.price = price || productExists.price;
          productExists.description = description || productExists.description;
          productExists.brand = brand || productExists.brand;
          productExists.images = images || productExists.images;
          productExists.instrumentType =
            instrumentType || productExists.instrumentType;
          productExists.amount = amount || productExists.amount;
          productExists.stripe_price_id = new_stripe_price_id;
          productExists.stripe_product_id = new_stripe_product_id;

          await user.save();
        }
      } else {
        return NextResponse.json(
          {
            message: "You have to login in first ",
          },
          { status: 400 }
        );
      }
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }

    // UPDATE PRODUCTS WHEN ADMIN EDIT PRODUCTS ↓↓

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
