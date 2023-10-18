import { FC } from "react";
import ItemByIdCard from "./ItemByIdCard";

async function fetchItemById(id: string) {
  const response = await fetch(
    `http://localhost:3000/api/get-item-by-id?q=${id}`
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = await response.json();
  return data[0];
}

interface IParams {
  params: string;
}
const ItemById: FC<IParams> = async ({ params }) => {
  const item = await fetchItemById(params);

  return (
    <>
      <ItemByIdCard item={item} />
    </>
  );
};

export default ItemById;
