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
import { Link } from "@chakra-ui/next-js";
import { CiSearch } from "react-icons/ci";
import AddProductsToFavorite from "../user/AddProductsToFavorite";
import CartAddProducts from "../cart/CartAddProducts";
import ImagesCarousel from "@/utils/ImageCarousel";
import ProductsCardWithCarousel from "@/utils/ProductsCardWithCarousel";
import { useRouter } from "next/navigation";

type TParamsSearch = {
  params: string;
};

const ProductsFilterBySearchingRender: FC<TParamsSearch> = ({ params }) => {
  const [products, setProducts] = useState<ProductsResponse>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/products/by-search?q=${params}`
        );
        const products: ProductsResponse = await response.json();

        setProducts(products);
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
          {products.length ? (
            <Box minH="100vh" mt={10} mb={20}>
              <Flex mb={10}>
                <Text fontSize="26px">
                  {`${products.length} Results for ${params}...`}{" "}
                </Text>
              </Flex>
              <ProductsCardWithCarousel products={products} />
            </Box>
          ) : (
            <Box minH="calc(100vh - 23rem)" mt={10} mb={20}>
              <Flex
                minH="calc(100vh - 23rem)"
                align="center"
                justify="center"
                flexDir="column"
              >
                <Text fontSize={["20px", "30px", "44px"]}>
                  There is nothing here...
                </Text>
                <Button
                  onClick={() => router.back()}
                  color="white"
                  fontWeight="normal"
                  background=" rgb(1,44,60)"
                  bg=" linear-gradient(180deg, rgba(1,44,60,1) 0%, rgba(0,82,112,1) 100%)"
                  _hover={{
                    background: " rgb(1,44,60)",
                    bg: " linear-gradient(180deg, rgba(1,44,60,1) 0%, rgba(0,82,112,1) 0%)",
                  }}
                >
                  Go back
                </Button>
              </Flex>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default ProductsFilterBySearchingRender;
