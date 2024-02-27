"use client";

import React, { FC, useEffect, useState } from "react";
import { ProductsResponse } from "../../types";
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
import AddFavoriteProduct from "./AddFavoriteProduct";
import AddToCart from "./AddToCart";

type TParamsSearch = {
  params: string;
};

const SearchProducts: FC<TParamsSearch> = ({ params }) => {
  const [instruments, setInstruments] = useState<ProductsResponse>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/get-all-products/by-search?q=${params}`
        );
        //   await new Promise((resolve) => setTimeout(resolve, 1000));
        const products: ProductsResponse = await response.json();

        setInstruments(products);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [params]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {instruments.length ? (
            <Box minH="100vh">
              <section>
                <Flex>
                  <Text fontSize="26px">
                    {`${instruments.length} Results for ${params}...`}{" "}
                  </Text>
                </Flex>
              </section>
              <Flex gap={4} justify="center" maxW="full" flexWrap="wrap">
                {instruments.map((product, index) => (
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
                            href={`/instrument/${product._id}`}
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
                            <Icon
                              as={CiSearch}
                              w={[6, 7]}
                              h={[6, 7]}
                              color="black"
                            />
                          </Button>
                        </Tooltip>
                        <AddFavoriteProduct product={product} />
                        <AddToCart product={product} />
                      </Box>
                    </CardFooter>
                  </Card>
                ))}
              </Flex>
            </Box>
          ) : (
            <Box>
              <section>
                <Flex>
                  <Text fontSize="26px">
                    {`${instruments.length} Results for ${params}...`}
                  </Text>
                </Flex>
              </section>
              <Flex justify="center">
                <Text>instruments not found :(</Text>
              </Flex>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default SearchProducts;
