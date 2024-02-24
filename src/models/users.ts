import mongoose from "mongoose";
import bcrypt from "bcryptjs";

type ICartProduct = {
  name: string;
  price: number;
  brand: string;
  images: string[];
  instrumentType: string;
  productId: string;
  amount: number;
  itemQuantity: number;
};

interface IUserSchema {
  name: string;
  email: string;
  password: string;
  cart: ICartProduct;
  favoriteProduct: ICartProduct;
}
interface IuserMethods {
  mathPassword(enterePassword: string): string;
}

type UserModel = mongoose.Model<IUserSchema, {}, IuserMethods>;

const userSchema = new mongoose.Schema<IUserSchema, UserModel, IuserMethods>(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    cart: [
      {
        name: String,
        price: Number,
        brand: String,
        images: [String],
        instrumentType: String,
        productId: String,
        amount: Number,
        itemQuantity: Number,
      },
    ],
    favoriteProduct: [
      {
        name: String,
        price: Number,
        brand: String,
        images: [String],
        instrumentType: String,
        productId: String,
        amount: Number,
        itemQuantity: Number,
      },
    ],
  },

  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.method("mathPassword", async function (enterePassword: string) {
  return await bcrypt.compare(enterePassword, this.password);
});

const User =
  mongoose.models.User ||
  mongoose.model<IUserSchema, UserModel>("User", userSchema);
export default User;
