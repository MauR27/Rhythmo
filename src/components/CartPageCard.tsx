"use client";

import { useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import RemoveItemCart from "./RemoveItemCart";
import GlobalContext from "@/context/GlobalContext";
import { CiSearch } from "react-icons/ci";
import QuantityItem from "./QuantityItem";

const CartPageCard = () => {
  const { cart } = useContext(GlobalContext);
  console.log(cart);

  return (
    <>
      {cart.map((product) => (
        <Grid
          pl="1em"
          templateColumns="repeat(5, 1fr)"
          key={product._id}
          py={2}
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <GridItem colSpan={2}>
            <Card
              overflow="hidden"
              variant="unstyled"
              size="sm"
              p={2}
              direction="row"
            >
              <Image
                src={product.images[0]}
                maxW="150px"
                maxH="150px"
                objectFit="cover"
              />
              <Stack>
                <CardBody>
                  <Heading as="h1" size="sm" fontWeight="semibold">
                    {product.name}
                  </Heading>
                  <Text fontWeight="normal" mt={2}>
                    {product.brand}
                  </Text>
                </CardBody>
                <CardFooter>
                  <RemoveItemCart _id={product._id} />
                  <Tooltip
                    hasArrow
                    label="Full view"
                    bg="white"
                    color="black"
                    fontSize="xs"
                  >
                    <Button
                      as={Link}
                      href={`/instrument/${product.productId}`}
                      borderRadius="none"
                      bg="white"
                      p={0}
                      m={0}
                      boxShadow="md"
                      _hover={{
                        bg: "cyan.600",
                        ".searchIcon": {
                          color: "white",
                        },
                      }}
                      _active={{
                        bg: "cyan.300",
                      }}
                    >
                      <Icon
                        as={CiSearch}
                        w={[6, 7]}
                        h={[6, 7]}
                        color="black"
                        className="searchIcon"
                      />
                    </Button>
                  </Tooltip>
                </CardFooter>
              </Stack>
            </Card>
          </GridItem>
          <GridItem colSpan={1} alignContent="center">
            <Flex align="center" h="full" justify="center">
              <Text>{product.price},00$</Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <Flex align="center" h="full" justify="center">
              <QuantityItem />
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <Flex align="center" h="full" justify="center">
              <Text>{product.price},00$</Text>
            </Flex>
          </GridItem>
        </Grid>
      ))}
    </>
  );
};

export default CartPageCard;
