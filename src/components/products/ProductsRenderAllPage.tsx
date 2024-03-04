"use client";

import React, { FC, useEffect, useState } from "react";
import { ProductsResponse } from "../../../types";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Icon,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Carousel from "@/utils/ImageProductCard";
import { Link } from "@chakra-ui/next-js";
import { CiSearch } from "react-icons/ci";
import AddProductsToFavorite from "../user/AddProductsToFavorite";
import CartAddProducts from "../cart/CartAddProducts";

const ProductsRenderAllPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductsResponse>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/get-all`
        );
        if (response.ok) {
          const products = await response.json();
          setProducts(products);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    })();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <Box minH="100vh">
      <Flex gap={4} justify="center" maxW="full" flexWrap="wrap">
        {products.map((product, index) => {
          return (
            <Card
              maxW="xs"
              key={index}
              borderRadius={0}
              my={10}
              _hover={{
                cursor: "pointer",
                textDecor: "none",
                boxShadow: "lg",
                ".footer-buttons-type": {
                  opacity: 1,
                  transform: "auto",
                  translateY: "-15px",
                },
              }}
            >
              <CardBody>
                <Carousel images={product} />
                <Stack as={Flex} mt="6" spacing="3" textAlign="center">
                  <Heading
                    size="md"
                    fontSize="15px"
                    fontWeight="normal"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {product.name}
                  </Heading>

                  <Text
                    fontWeight="semibold"
                    fontSize="1xl"
                  >{`${product.price}$`}</Text>
                </Stack>
              </CardBody>

              <CardFooter
                className="footer-buttons-type"
                opacity={0}
                // position="absolute"
                // top="58%"
                // left="20%"
                p={0}
                justify="center"
                transition=".5s"
              >
                <Box border="1px solid" borderColor="gray.100">
                  <Tooltip
                    hasArrow
                    label="Full view"
                    bg="white"
                    color="black"
                    gutter={0}
                    fontSize="xs"
                  >
                    <Button
                      as={Link}
                      href={`/pages/products/fullview/${product._id}`}
                      borderRadius="none"
                      bg="white"
                      p={0}
                      m={0}
                      h="50px"
                      w="50px"
                      boxShadow="xl"
                      _hover={{
                        bg: "gray.100",
                      }}
                      _active={{
                        bg: "gray.200",
                      }}
                    >
                      <Icon as={CiSearch} w={[6, 7]} h={[6, 7]} color="black" />
                    </Button>
                  </Tooltip>
                  <AddProductsToFavorite product={product} />
                  <CartAddProducts product={product} />
                </Box>
              </CardFooter>
            </Card>
          );
        })}
      </Flex>
    </Box>
  );
};

export default ProductsRenderAllPage;
