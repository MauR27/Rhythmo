"use client";

import { FC, useEffect, useState } from "react";
import { ProductsResponse } from "../../../types";
import { Box } from "@chakra-ui/react";
import ProductsCardWithCarousel from "@/utils/ProductsCardWithCarousel";
import LoadingSpinner from "@/utils/LoadingSpinner";

type TProducts = {
  params: string;
};

const ProductsFilterByTypeRender: FC<TProducts> = ({ params }) => {
  const [products, setProducts] = useState<ProductsResponse>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      (async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/products/by-type?q=${params}`
        );
        if (response.ok) {
          const products: ProductsResponse = await response.json();

          setProducts(products);
          setIsLoading(false);
        }
      })();
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }, [params]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box minH="100vh" mt={20} mb={20}>
      <ProductsCardWithCarousel products={products} />
    </Box>
  );
};

export default ProductsFilterByTypeRender;
