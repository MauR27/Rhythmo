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
  _id: string;
};
export type ICart = [
  {
    brand: string;
    images: string[];
    instrumentType: string;
    name: string;
    price: number;
    productId: string;
    _id: string;
    amount: number;
    itemQuantity: number;
  }
];

export type ProductsResponse = Product[];
