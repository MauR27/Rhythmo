import mongoose from "mongoose";

interface IProductsSchema {
  name: string;
  price: string;
  description: string;
  brand: string;
  images: string;
  instrumentType: string;
  amount: number;
  stripe_price_id: string;
  stripe_product_id: string;
}

type UserModel = mongoose.Model<IProductsSchema, {}>;

const productsSchema = new mongoose.Schema<IProductsSchema, UserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      uppercase: true,
    },
    price: { type: String, required: [true, "Price is required"] },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      uppercase: true,
    },
    images: [String],
    instrumentType: {
      type: String,
      required: [true, "InstrumentType is required"],
      lowercase: true,
    },
    amount: { type: Number, required: [true, "Amount is required"] },
    stripe_price_id: { type: String, required: false },
    stripe_product_id: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Products =
  mongoose.models.Products ||
  mongoose.model<IProductsSchema, UserModel>("Products", productsSchema);
export default Products;
