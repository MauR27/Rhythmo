import React from "react";
import { ProductsResponse } from "../../types";
import AllProductsCard from "./AllProductsCard";

const fetchInstruments = async () => {
  const response = await fetch(`http://localhost:3000/api/get-all-products`);
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  const products: ProductsResponse = await response.json();

  return products;
};

const AllProducts = async () => {
  const instruments: ProductsResponse = await fetchInstruments();
  return (
    <>
      <AllProductsCard products={instruments} />
    </>
  );
};

export default AllProducts;
