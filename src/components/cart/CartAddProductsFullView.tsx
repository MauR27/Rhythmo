"use client";

import { Icon, useToast, Flex, Text } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { TProduct } from "../../../types";
import GlobalContext from "@/context/GlobalContext";
import { FaCartShopping } from "react-icons/fa6";

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
    <Flex
      align="center"
      onClick={fetchData}
      borderRadius={5}
      bg="#D6D6D6"
      m={0}
      h={["40px", "45px", "50px"]}
      w={["150px", "180px", "200px"]}
      _hover={{
        bg: "#E0E0E0",
        cursor: "pointer",
      }}
      _active={{
        bg: "gray.200",
      }}
    >
      <Flex
        align="center"
        justify="center"
        bg="#CCCCCC"
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
