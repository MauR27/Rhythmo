"use client";

import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  List,
  ListItem,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useContext, useState } from "react";
import CartProductsRender from "./CartProductsRender";
import GlobalContext from "@/context/GlobalContext";
import CartOrderSummary from "./CartOrderSummary";
import CartAllEmpty from "./CartAllEmpty";

const CartPageRender = () => {
  const { setCart, cart } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLargerThan580] = useMediaQuery("(min-width: 1380px)");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/cart/get-products"
        );
        const userCart = await response.json();

        if (response.ok) {
          setCart(userCart);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    })();
  }, [setCart]);

  return (
    <Flex
      minH="calc(100vh - 15rem)"
      flexDir={isLargerThan580 ? "row" : "column"}
      justify={isLargerThan580 ? "center" : ""}
    >
      <Flex m="20px 20px 0 20px">
        <Flex p="5px 5px 5px 5px" flexDir="column" w="1100px">
          <Flex justify="space-between" align="center">
            <Text
              fontSize={["16px", "18px", "20px"]}
              fontWeight="normal"
              color="gray.500"
            >
              Shopping Cart
            </Text>
            <Flex align="center" gap={2}>
              <Text fontSize={["10px", "12px", "16px"]} color="gray.500">
                {cart.length} items
              </Text>
              <CartAllEmpty />
            </Flex>
          </Flex>
          <Divider m="20px 0 20px 0" borderColor="gray" />
          <Flex mb={5}>
            <Flex flex={1} fontSize={["10px", "12px", "14px"]}>
              <Text>Products</Text>
            </Flex>
            <List
              display="flex"
              flex={1}
              fontSize={["10px", "12px", "14px"]}
              gap={6}
            >
              <ListItem
                textAlign="center"
                fontSize="1em"
                fontWeight="light"
                flex={1}
              >
                Price
              </ListItem>
              <ListItem
                textAlign="center"
                fontSize="1em"
                fontWeight="light"
                flex={1}
              >
                Quantity
              </ListItem>
              <ListItem
                textAlign="center"
                fontSize="1em"
                fontWeight="light"
                flex={1}
              >
                Total
              </ListItem>
              <ListItem
                textAlign="center"
                fontSize="1em"
                fontWeight="light"
                flex={1}
              ></ListItem>
            </List>
          </Flex>
          <Flex flexDir="column" gap={2}>
            <CartProductsRender isLoading={isLoading} cart={cart} />
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <CartOrderSummary />
      </Flex>
    </Flex>
  );
};

export default CartPageRender;
