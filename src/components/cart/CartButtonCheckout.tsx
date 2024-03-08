"use client";

import { Button, Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";

const CartButtonCheckout = () => {
  const { cart } = useContext(GlobalContext);

  const cartCheckout = cart.map((item) => {
    return {
      stripe_price_id: item.stripe_price_id,
      quantity: item.itemQuantity,
    };
  });

  const handleCheckout = async () => {
    const fetchStripe = await fetch(
      `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/checkout`,
      {
        method: "POST",
        body: JSON.stringify({
          cartCheckout,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await fetchStripe.json();
    window.location.href = data.url;
  };

  return (
    <Flex>
      <Button
        borderRadius={3}
        bg="#E1A538"
        w={["60px", "80px", "100px"]}
        h={["30px", "35px", "40px"]}
        fontSize={["10px", "12px", "14px"]}
        boxShadow="md"
        _hover={{
          bg: "#D59620",
        }}
        _active={{
          bg: "#E1A538",
        }}
        onClick={handleCheckout}
      >
        Pay
      </Button>
    </Flex>
  );
};

export default CartButtonCheckout;
