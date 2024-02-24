import GlobalContext from "@/context/GlobalContext";
import { Button } from "@chakra-ui/react";
import React, { FC, useContext } from "react";

interface ICartItem {
  _id: string;
}

const RemoveFavoriteItem: FC<ICartItem> = ({ _id }) => {
  const { setFavoriteProductList, setFavoriteListProductsLength } =
    useContext(GlobalContext);

  const fetchRemoveItem = async () => {
    const response = await fetch(
      "http://localhost:3000/api/remove-favorite-item",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      }
    );
    const data = await response.json();
    setFavoriteProductList(data?.favoriteProduct);
    setFavoriteListProductsLength(data?.favoriteProduct?.length || 0);
  };

  return (
    <Button
      onClick={fetchRemoveItem}
      variant="ghost"
      borderRadius="none"
      boxShadow="md"
      mr={2}
      _hover={{
        color: "white",
        bg: "cyan.600",
        borderRadius: "none",
      }}
      _active={{
        bg: "cyan.300",
      }}
    >
      Remove
    </Button>
  );
};

export default RemoveFavoriteItem;
