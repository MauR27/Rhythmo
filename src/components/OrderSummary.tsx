import GlobalContext from "@/context/GlobalContext";
import { Button, Flex, List, ListItem, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

const OrderSummary = () => {
  const { cart } = useContext(GlobalContext);

  // subtotal price of all products without any discount ↓↓

  const subTotalProductPrice = cart.reduce(
    (accumulator, currentProduct) =>
      accumulator + currentProduct.price * currentProduct.itemQuantity,
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

  return (
    <Flex justifyContent="center">
      <Flex
        align="center"
        flexDir="column"
        minH="600px"
        w="400px"
        border="1px solid"
        borderColor="gray.100"
        borderRadius="lg"
        boxShadow="lg"
        py={4}
      >
        <Text as="h1" fontSize="4xl" fontWeight="semibold" mb="1em">
          Order Summary
        </Text>
        <List
          display="flex"
          alignItems="center"
          flexDir="column"
          minW="full"
          gap={4}
        >
          <Flex
            minH="80px"
            minW="300px"
            boxShadow="md"
            borderRadius="sm"
            borderBottom="1px solid"
            borderColor="cyan.600"
            justifyContent="space-around"
            align="center"
          >
            <ListItem>Discount</ListItem>
            <Text>0,00$</Text>
          </Flex>
          <Flex
            minH="80px"
            minW="300px"
            boxShadow="md"
            borderRadius="sm"
            borderBottom="1px solid"
            borderColor="cyan.600"
            justifyContent="space-around"
            align="center"
          >
            <ListItem>Delivery</ListItem>
            <Text>0,00$</Text>
          </Flex>
          <Flex
            minH="80px"
            minW="300px"
            boxShadow="md"
            borderRadius="sm"
            borderBottom="1px solid"
            borderColor="cyan.600"
            justifyContent="space-around"
            align="center"
          >
            <ListItem>Subtotal</ListItem>
            <Text>{subTotalProductPrice},00$</Text>
          </Flex>
          <Flex
            minH="80px"
            minW="300px"
            boxShadow="md"
            borderRadius="sm"
            borderBottom="1px solid"
            borderColor="cyan.600"
            justifyContent="space-around"
            align="center"
          >
            <ListItem>Total</ListItem>
            <Text>{totalProductPrice},00$</Text>
          </Flex>
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
            >
              Pay
            </Button>
          </Flex>
        </List>
      </Flex>
    </Flex>
  );
};

export default OrderSummary;
