"use client";

import { Icon, useToast, Tooltip, Flex } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { TProduct } from "../../../types";
import GlobalContext from "@/context/GlobalContext";
import { PiShoppingCartSimpleThin } from "react-icons/pi";

type TProductsProps = {
  product: TProduct;
};

const CartAddProducts: FC<TProductsProps> = ({ product }) => {
  const toast = useToast();

  const { setCartLength } = useContext(GlobalContext);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/cart/add-products`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product,
          }),
        }
      );
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
      <Flex
        align="center"
        justify="center"
        onClick={fetchData}
        borderRadius={10}
        bg="white"
        p={0}
        m={0}
        h={["30px", "40px", "50px"]}
        w={["30px", "40px", "50px"]}
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
          w={[6, 7, 8]}
          h={[6, 7, 8]}
          color="black"
        />
      </Flex>
    </Tooltip>
  );
};

export default CartAddProducts;
