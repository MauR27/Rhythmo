export type UserType = {
  name: string | null;
  email: string | null;
  password: string | null;
};
export type Product = {
  name: string;
  price: number;
  description: string;
  brand: string;
  images: string[];
  instrumentType: string;
  amount: number;
  productId: string;
  _id: string;
  stripeProductId: string;
};
export type ICart = [
  {
    brand: string;
    images: string[];
    instrumentType: string;
    name: string;
    price: number;
    productId: string;
    description: string;
    _id: string;
    amount: number;
    itemQuantity: number;
    stripeProductId: string;
  }
];

export type ProductsResponse = Product[];
