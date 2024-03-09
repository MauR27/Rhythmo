"use client";

import { Icon, useToast, Flex, Text } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { TProduct } from "../../../types";
import GlobalContext from "@/context/GlobalContext";
import { FaCartShopping } from "react-icons/fa6";
import { statusError } from "@/utils/errors";

type TProductsProps = {
  product: TProduct | undefined;
};

const CartAddProductsFullView: FC<TProductsProps> = ({ product }) => {
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
      const data = await response.json();
      setCartLength(data?.cart?.length || 0);
      const errors = statusError(response.status);
      toast({
        status: errors.status,
        description: errors.message,
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <Flex
      align="center"
      onClick={fetchData}
      borderRadius={5}
      bg="#096C00"
      m={0}
      h={["40px", "45px", "50px"]}
      w={["150px", "180px", "200px"]}
      _hover={{
        bg: "green",
        cursor: "pointer",
      }}
      _active={{
        bg: "green.600",
      }}
    >
      <Flex
        align="center"
        justify="center"
        bg="green"
        w="50px"
        h="full"
        borderTopLeftRadius={5}
        borderBottomLeftRadius={5}
      >
        <Icon
          as={FaCartShopping}
          w={["15px", "20px"]}
          h={["15px", "20px"]}
          color="white"
        />
      </Flex>
      <Text color="white" fontSize={["12px", "14px", "16px"]} ml={5}>
        Add to cart
      </Text>
    </Flex>
  );
};

export default CartAddProductsFullView;
