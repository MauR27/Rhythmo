import { ProductsResponse } from "../../../types";
import ProductsHomeRender from "./ProductsHomeRender";

async function fetchInstruments() {
  const response = await fetch("http://localhost:3000/api/products/get-all");

  const products: ProductsResponse = await response.json();
  return products.splice(0, 4);
}

const ProductsHomeRenderPage = async () => {
  const products: ProductsResponse = await fetchInstruments();

  return <ProductsHomeRender products={products} />;
};

export default ProductsHomeRenderPage;
