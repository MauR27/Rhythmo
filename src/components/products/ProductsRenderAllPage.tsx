"use client";

import React, { useEffect, useState } from "react";
import { ProductsResponse } from "../../../types";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import ProductsCardWithCarousel from "@/utils/ProductsCardWithCarousel";
import LoadingSpinner from "@/utils/LoadingSpinner";

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

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box minH="100vh" mt={20} mb={20}>
      <ProductsCardWithCarousel products={products} />
    </Box>
  );
};

export default ProductsRenderAllPage;
