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
} from "@chakra-ui/react";
import { useEffect, useContext, useState } from "react";
import CartProductsRender from "./CartProductsRender";
import GlobalContext from "@/context/GlobalContext";
import CartOrderSummary from "./CartOrderSummary";

const CartPageRender = () => {
  const { setCart, cart } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <Grid minH="calc(100vh - 11rem)" templateColumns="repeat(3, 1fr)">
      <GridItem colSpan={2}>
        <Text as="h1" fontSize="4xl" fontWeight="semibold" ml="1em">
          Products Cart
        </Text>
        <Box>
          <List display="flex" justifyContent="space-between">
            <ListItem flex={2} pl="1em" fontSize="1.2em" fontWeight="normal">
              Item Added
            </ListItem>
            <ListItem
              flex={1}
              textAlign="center"
              fontSize="1em"
              fontWeight="light"
            >
              Price
            </ListItem>
            <ListItem
              flex={1}
              textAlign="center"
              fontSize="1em"
              fontWeight="light"
            >
              Quantity
            </ListItem>
            <ListItem
              flex={1}
              textAlign="center"
              fontSize="1em"
              fontWeight="light"
            >
              Total
            </ListItem>
          </List>
        </Box>
        <Divider mt="1rem" borderColor="gray" />
        <CartProductsRender isLoading={isLoading} cart={cart} />
      </GridItem>
      <GridItem colSpan={1} justifyContent="center" pt="30px">
        <CartOrderSummary />
      </GridItem>
    </Grid>
  );
};

export default CartPageRender;