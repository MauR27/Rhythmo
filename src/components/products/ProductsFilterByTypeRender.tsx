"use client";

import { FC, useEffect, useState } from "react";
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
import CartAddProducts from "../cart/CartAddProducts";
import { CiSearch } from "react-icons/ci";
import AddProductsToFavorite from "../user/AddProductsToFavorite";
import { Link } from "@chakra-ui/next-js";
import ImagesCarousel from "@/utils/ImageCarousel";
import ProductsCardWithCarousel from "@/utils/ProductsCardWithCarousel";

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
        const response = await fetch(`/api/products/by-type?q=${params}`);
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

  if (isLoading) return <Spinner />;

  return (
    <Box minH="100vh" mt={20} mb={20}>
      <ProductsCardWithCarousel products={products} />
    </Box>
  );
};

export default ProductsFilterByTypeRender;
