import { FC } from "react";
import ProductsByTypeCard from "./ProductsByTypeCard";
import { ProductsResponse } from "../../types";

interface Iparams {
  params: string;
}

const fetchInstruments = async (instrument: string) => {
  const response = await fetch(
    `http://localhost:3000/api/get-all-products/by-type?q=${instrument}`
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const products: ProductsResponse = await response.json();

  return products;
};

const ProductsByType: FC<Iparams> = async ({ params }) => {
  const instruments: ProductsResponse = await fetchInstruments(params);

  return <ProductsByTypeCard products={instruments} />;
};

export default ProductsByType;
