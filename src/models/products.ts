import mongoose from "mongoose";

interface IProductsSchema {
  products: [
    {
      name: string;
      price: string;
      description: string;
      brand: string;
      images: string;
      instrumentType: string;
      amount: number;
      stripeProductId: string;
    }
  ];
}

type UserModel = mongoose.Model<IProductsSchema, {}>;

const productsSchema = new mongoose.Schema<IProductsSchema, UserModel>(
  {
    products: [
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
        stripeProductId: String,
      },
      {
        timestamps: true,
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Products =
  mongoose.models.Products ||
  mongoose.model<IProductsSchema, UserModel>("Products", productsSchema);
export default Products;
