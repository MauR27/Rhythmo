import mongoose from "mongoose";

interface IProductsSchema {
  products: [
    {
      name: string;
      price: number;
      description: string;
      brand: string;
      images: string;
      instrumentType: string;
      amount: number;
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
        price: { type: Number, required: [true, "Price is required"] },
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
