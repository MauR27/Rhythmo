import { ProductsResponse } from "../../types";
import NewProductCard from "./NewProductCard";

async function fetchInstruments() {
  const response = await fetch("http://localhost:3000/api/products/get-all");

  const products: ProductsResponse = await response.json();
  return products.splice(0, 4);
}

const NewProducts = async () => {
  const products: ProductsResponse = await fetchInstruments();

  return <NewProductCard products={products} />;
};

export default NewProducts;
