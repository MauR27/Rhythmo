"use client";

import { Button, Flex } from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { ICart, Product } from "../../types";
import GlobalContext from "@/context/GlobalContext";

const ButtonCheckout = () => {
  const { cart } = useContext(GlobalContext);
  const cartCheckout = cart.map((item) => {
    return { stripeId: item.stripeProductId, quantity: item.itemQuantity };
  });

  const handleCheckout = async () => {
    const fetchStripe = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        cartCheckout,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await fetchStripe.json();
    window.location.href = data.url;
  };

  return (
    <Flex>
      <Button
        borderRadius="none"
        bg="white"
        p={0}
        m={0}
        w={100}
        boxShadow="md"
        _hover={{
          bg: "cyan.600",
          color: "white",
        }}
        _active={{
          bg: "cyan.300",
        }}
        onClick={handleCheckout}
      >
        Pay
      </Button>
    </Flex>
  );
};

export default ButtonCheckout;