"use client";

import GlobalContext from "@/context/GlobalContext";
import { Button } from "@chakra-ui/react";
import { FC, useContext } from "react";

interface ICartItem {
  _id: string;
}

const RemoveItemCart: FC<ICartItem> = ({ _id }) => {
  const { setCart, setCartLength } = useContext(GlobalContext);

  const fetchRemoveItem = async () => {
    const response = await fetch("http://localhost:3000/api/remove-item-cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    const data = await response.json();
    setCart(data?.cart);
    setCartLength(data?.cart?.length || 0);
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

export default RemoveItemCart;
