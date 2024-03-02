"use client";

import { Button, Icon, useToast, Tooltip } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { TProduct } from "../../types";
import GlobalContext from "@/context/GlobalContext";
import { PiShoppingCartSimpleThin } from "react-icons/pi";

type TProductsProps = {
  product: TProduct;
};

const AddToCart: FC<TProductsProps> = ({ product }) => {
  const toast = useToast();

  const { setCartLength } = useContext(GlobalContext);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/user/cart/add-products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setCartLength(data?.cart?.length || 0);
        toast({
          status: "success",
          description: response?.statusText,
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          status: "error",
          description: response?.statusText,
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <Tooltip
      hasArrow
      label="Add to cart"
      bg="white"
      color="black"
      gutter={0}
      fontSize="xs"
    >
      <Button
        onClick={fetchData}
        borderRadius="none"
        bg="white"
        p={0}
        m={0}
        h="50px"
        w="50px"
        boxShadow="xl"
        _hover={{
          bg: "gray.100",
          color: "red",
        }}
        _active={{
          bg: "gray.200",
        }}
      >
        <Icon
          as={PiShoppingCartSimpleThin}
          w={[6, 7]}
          h={[6, 7]}
          color="black"
        />
      </Button>
    </Tooltip>
  );
};

export default AddToCart;
