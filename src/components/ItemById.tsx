import { FC } from "react";
import ItemByIdCard from "./ItemByIdCard";

export async function fetchItemById(id: string) {
  const response = await fetch(`/api/get-item-by-id?q=${id}`);

  const data = await response.json();
  return data;
}

type TParams = {
  params: string;
};
const ItemById: FC<TParams> = async ({ params }) => {
  const item = await fetchItemById(params);

  return (
    <>
      <ItemByIdCard item={item} />
    </>
  );
};

export default ItemById;
