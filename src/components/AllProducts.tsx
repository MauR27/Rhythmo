import React from "react";
import { ProductsResponse } from "../../types";
import AllProductsCard from "./AllProductsCard";

export const fetchAllProducts = async () => {
  const response = await fetch(`http://localhost:3000/api/get-all-products`);
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  const products: ProductsResponse = await response.json();

  return products;
};

const AllProducts = async () => {
  const instruments: ProductsResponse = await fetchAllProducts();
  return (
    <>
      <AllProductsCard products={instruments} />
    </>
  );
};

export default AllProducts;
