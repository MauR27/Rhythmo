"use client";

import GlobalContext from "@/context/GlobalContext";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import CartAddProducts from "../cart/CartAddProducts";
import RemoveProductsFromFavorite from "./RemoveProductsFromFavorite";
import ImagesCarousel from "@/utils/ImageCarousel";
import LoadingSpinner from "@/utils/LoadingSpinner";

const FavoriteProductsRender = () => {
  const { favoriteProductList, setFavoriteProductList } =
    useContext(GlobalContext);

  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    try {
      setLoadingList(true);
      (async () => {
        const response = await fetch("/api/user/profile/get-favorite-products");
        if (response.ok) {
          const userProductsList = await response.json();
          setFavoriteProductList(userProductsList);
          setLoadingList(false);
        }
      })();
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }, [setFavoriteProductList]);

  if (loadingList) return <LoadingSpinner />;

  return (
    <Box minH="100vh">
      {favoriteProductList.length !== 0 ? (
        <Flex gap={4} justify="center" maxW="full" flexWrap="wrap">
          {favoriteProductList.map((product, index) => (
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
                <ImagesCarousel images={product} />
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
                      href={`/pages/instrument/${product.productId}`}
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
                  <CartAddProducts product={product} />
                  <RemoveProductsFromFavorite _id={product._id} />
                </Box>
              </CardFooter>
            </Card>
          ))}
        </Flex>
      ) : (
        <Text>Ups! you dont have any favorite instrument</Text>
      )}
    </Box>
  );
};

export default FavoriteProductsRender;
