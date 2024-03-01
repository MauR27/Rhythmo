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
import CartPageCard from "./CartPageCard";
import GlobalContext from "@/context/GlobalContext";
import OrderSummary from "./OrderSummary";

const CartPage = () => {
  const { setCart, totalPrice } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3000/api/get-user-cart");
        const userCart = await response.json();

        setCart(userCart);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    })();
    setIsLoading(true);
  }, [setCart, totalPrice]);

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
        <CartPageCard isLoading={isLoading} />
      </GridItem>
      <GridItem colSpan={1} justifyContent="center" pt="30px">
        <OrderSummary />
      </GridItem>
    </Grid>
  );
};

export default CartPage;
