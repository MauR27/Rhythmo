import React from "react";
import { ProductsResponse } from "../../../types";
import ProductsRenderAll from "./ProductsRenderAll";

export const fetchAllProducts = async () => {
  const response = await fetch(`http://localhost:3000/api/products/get-all`);
  const products: ProductsResponse = await response.json();

  return products;
};

const ProductsRenderAllPage = async () => {
  const instruments: ProductsResponse = await fetchAllProducts();
  return (
    <>
      <ProductsRenderAll products={instruments} />
    </>
  );
};

export default ProductsRenderAllPage;
