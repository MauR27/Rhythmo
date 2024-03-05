"use client";

import { Box, Image, Spinner, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ProductsResponse } from "../../../types";
import FooterPageRender from "../FooterPageRender";
import ProductsCard from "@/utils/ProductsCard";

const ProductsHomeRenderPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductsResponse>([]);

  useEffect(() => {
    try {
      setIsLoading(true);
      (async () => {
        const response = await fetch(
          "http://localhost:3000/api/products/get-all"
        );
        if (response.ok) {
          const products = await response.json();
          products.splice(0, 3);
          setProducts(products);
          setIsLoading(false);
        }
      })();
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <>
      <Flex minH="100vh" mt={20} mb={20} gap={20} flexDir="column">
        <Flex alignItems="center" justify="center">
          <Image src="/Banner2.jpeg" alt="banner" borderRadius="md" />
        </Flex>
        <Flex
          // minH="100vh"
          alignItems="center"
          justify="center"
          flexDir="column"
          gap={5}
        >
          <ProductsCard products={products} />
        </Flex>
      </Flex>
      <Box>
        <FooterPageRender />
      </Box>
    </>
  );
};

export default ProductsHomeRenderPage;
