import GlobalContext from "@/context/GlobalContext";
import { Button, Flex, List, ListItem, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import CartButtonCheckout from "./CartButtonCheckout";

const CartOrderSummary = () => {
  const { cart } = useContext(GlobalContext);

  // subtotal price of all products without any discount ↓↓

  const subTotalProductPrice = cart.reduce(
    (accumulator, currentProduct) =>
      accumulator +
      Number(currentProduct.price.replace(/[,]/g, "")) *
        currentProduct.itemQuantity,
    0
  );

  // posible discounts to final product ↓↓

  const delivery: number = 0;

  // that number equivals to porcentage of discont to the final product ↓↓

  const percentageDiscount: number = 0;

  const productDiscountPerPercentage: number =
    subTotalProductPrice * (percentageDiscount / 100);

  // Final price ↓↓

  const totalProductPrice =
    subTotalProductPrice + delivery - productDiscountPerPercentage;

  // Prices formatted ↓↓

  const formattedSubTotal = subTotalProductPrice.toLocaleString("en-US");
  const formattedTotalPrice = totalProductPrice.toLocaleString("en-US");

  return (
    <Flex>
      <Flex flexDir="column" p={10} gap={10}>
        <Text
          fontSize={["14px", "16px", "18px"]}
          fontWeight="normal"
          color="gray.600"
        >
          Order Summary
        </Text>
        <List
          display="flex"
          flexDir="column"
          gap={5}
          w="full"
          h="full"
          fontSize={["12px", "14px", "16px"]}
        >
          <Flex gap={50}>
            <ListItem fontWeight="normal" color="gray.500">
              Discount
            </ListItem>
            <Text>0,00$</Text>
          </Flex>
          <Flex gap={50}>
            <ListItem fontWeight="normal" color="gray.500">
              Delivery
            </ListItem>
            <Text>0,00$</Text>
          </Flex>
          <Flex gap={50}>
            <ListItem fontWeight="normal" color="gray.500">
              Subtotal
            </ListItem>
            <Text>{formattedSubTotal}.00$</Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            borderBottom="1px solid"
            borderColor="gray.300"
            gap={50}
          >
            <ListItem fontWeight="normal" color="gray.500">
              Total
            </ListItem>
            <Text>{formattedTotalPrice}.00$</Text>
          </Flex>
          <Flex justify="end">
            <CartButtonCheckout />
          </Flex>
        </List>
      </Flex>
    </Flex>
  );
};

export default CartOrderSummary;
