"use client";

import { Button, Flex } from "@chakra-ui/react";
import React, { FC } from "react";

type stripeProductId = {
  stripeId: string;
  quantity: number;
};
const ButtonCheckout: FC<stripeProductId> = ({ stripeId, quantity }) => {
  const handleCheckout = async () => {
    const fetchStripe = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        stripeId,
        quantity,
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
