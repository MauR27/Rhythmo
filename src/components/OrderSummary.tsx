import GlobalContext from "@/context/GlobalContext";
import { Flex, List, ListItem, Text } from "@chakra-ui/react";
import React, { useContext } from "react";

const OrderSummary = () => {
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
            <ListItem>Total</ListItem>
            <Text>0,00$</Text>
          </Flex>
        </List>
      </Flex>
    </Flex>
  );
};

export default OrderSummary;
