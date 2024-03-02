export type UserType = {
  name: string | null;
  email: string | null;
  password: string | null;
};
export type TProduct = {
  name: string;
  price: string;
  description: string;
  brand: string;
  images: string[];
  instrumentType: string;
  amount: number;
  productId: string;
  _id: string;
  stripe_product_id: string;
  stripe_price_id: string;
};
export type ICart = [
  {
    brand: string;
    images: string[];
    instrumentType: string;
    name: string;
    price: string;
    productId: string;
    description: string;
    _id: string;
    amount: number;
    itemQuantity: number;
    stripe_price_id: string;
    stripe_product_id: string;
  }
];

export type ProductsResponse = TProduct[];

export type TFormikIinitialValues = {
  productName: string;
  price: string;
  description: string;
  brand: string;
  images: string[];
  instrumentType: string;
  amount: number;
};
