import mongoose from "mongoose";
import bcrypt from "bcryptjs";

type TCartProduct = {
  name: string;
  price: string;
  brand: string;
  images: string[];
  instrumentType: string;
  productId: string;
  amount: number;
  itemQuantity: number;
  stripe_product_id: string;
  stripe_price_id: string;
};

export type TUserSchema = {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  googleId: string;
  resetToken: string;
  resetTokenExpires: Date;
  cart: TCartProduct;
  favoriteProduct: TCartProduct;
};
type TUserMethods = {
  mathPassword(enterePassword: string): string;
};

type UserModel = mongoose.Model<TUserSchema, {}, TUserMethods>;

const userSchema = new mongoose.Schema<TUserSchema, UserModel, TUserMethods>(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: false },
    profilePicture: String,
    googleId: { type: String, required: false },
    resetToken: { type: String, required: false },
    resetTokenExpires: { type: Date, required: false },
    cart: [
      {
        name: String,
        price: String,
        brand: String,
        images: [String],
        instrumentType: String,
        productId: String,
        amount: Number,
        itemQuantity: Number,
        stripe_price_id: String,
        stripe_product_id: String,
      },
    ],
    favoriteProduct: [
      {
        name: String,
        price: String,
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

userSchema.method("matchPassword", async function (enterePassword: string) {
  try {
    return await bcrypt.compare(enterePassword, this.password);
  } catch (error) {
    console.error("Error comparing passwords:", error);

    return false;
  }
});

const User =
  mongoose.models.User ||
  mongoose.model<TUserSchema, UserModel>("User", userSchema);
export default User;
