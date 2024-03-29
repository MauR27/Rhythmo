"use client";

import React, { FC, useEffect, useState } from "react";
import { ProductsResponse } from "../../../types";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ProductsCardWithCarousel from "@/utils/ProductsCardWithCarousel";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/utils/LoadingSpinner";

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
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/products/by-search?q=${params}`
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

  if (isLoading) return <LoadingSpinner />;

  return (
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
  );
};

export default ProductsFilterBySearchingRender;
