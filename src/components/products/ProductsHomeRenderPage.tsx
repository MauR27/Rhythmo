"use client";

import { Box, Image, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ProductsResponse } from "../../../types";
import FooterPageRender from "../FooterPageRender";
import ProductsCard from "@/utils/ProductsCard";
import LoadingSpinner from "@/utils/LoadingSpinner";

const ProductsHomeRenderPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductsResponse>([]);

  useEffect(() => {
    try {
      setIsLoading(true);
      (async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/products/get-all`
        );
        if (response.ok) {
          const products = await response.json();

          const productsSlice = products.slice(0, 4);
          setProducts(productsSlice);
          setIsLoading(false);
        }
      })();
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }, []);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Flex minH="100vh" mt={20} mb={20} gap={20} flexDir="column">
        <Flex alignItems="center" justify="center">
          <Image src="/PNGBG.jpeg" alt="banner" borderRadius="md" />
        </Flex>
        <Flex alignItems="center" justify="center" flexDir="column" gap={5}>
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
