import { FC } from "react";
import ProductsFullView from "./ProductsFullView";

export async function fetchItemById(id: string) {
  const response = await fetch(
    `http://localhost:3000/api/user/cart/get-products/by-id?q=${id}`
  );

  const data = await response.json();
  return data;
}

type TParams = {
  params: string;
};
const ProductsFullViewPage: FC<TParams> = async ({ params }) => {
  const item = await fetchItemById(params);

  return (
    <>
      <ProductsFullView item={item} />
    </>
  );
};

export default ProductsFullViewPage;
