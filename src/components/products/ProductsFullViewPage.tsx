"use client";

import { FC, useEffect, useState } from "react";
import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import { TProduct } from "../../../types";
import CartAddProductsFullView from "../cart/CartAddProductsFullView";
import AddProductsToFavoriteFullView from "../user/AddProductsToFavoriteFullView";
import LoadingSpinner from "@/utils/LoadingSpinner";

type TParams = {
  params: string;
};

const ProductsFullViewPage: FC<TParams> = ({ params }) => {
  const [isLargerThan580] = useMediaQuery("(min-width: 580px)");
  const [products, setProducts] = useState<TProduct>();
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/cart/get-products/by-id?q=${params}`
        );
        if (response.ok) {
          const data = await response.json();
          setImages(data.images[0]);
          setProducts(data);
          setLoading(false);
        }
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      }
    })();
  }, [params]);

  if (loading) return <LoadingSpinner />;
  return (
    <Flex
      minH="calc(100vh - 15rem)"
      mt={5}
      flexDir={isLargerThan580 ? "row" : "column-reverse"}
      gap={5}
    >
      <Flex gap={10} flex={1} flexDir="column" align="center" justify="center">
        <Box>
          <Image src={images} alt={products?.name} objectFit="cover" />
        </Box>
        <Flex gap={5} flexWrap="wrap" align="center" justify="center">
          {products?.images.map((image, index) => (
            <Box key={index} bg="black">
              <Image
                _hover={{
                  cursor: "pointer",

                  opacity: ".8",
                }}
                onClick={() => setImages(image)}
                src={image}
                alt={image}
                color="black"
                bg="black"
                objectFit="cover"
                w={["80px", "100px", "130px"]}
                h={["100px", "120px", "150px"]}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
      <Flex flex={1} p="20px 10px 5px 10px">
        <Flex flexDir="column" gap={5} maxW="700px">
          <Box>
            <Text fontSize={["18px", "20px", "24px", "28px"]}>
              {products?.name}
            </Text>
          </Box>
          <Box>
            <Text fontSize={["16px", "18px", "20px", "24px"]} fontWeight="bold">
              {products?.price} $
            </Text>
            <Text fontSize={["12px", "14px", "16px"]} color="blackAlpha.600">
              Taxes included
            </Text>
          </Box>
          <Box fontSize={["10px", "12px", "14px"]}>
            <Text>{products?.description}</Text>
          </Box>
          <Flex align="center" gap={2}>
            <CartAddProductsFullView product={products} />
            <AddProductsToFavoriteFullView product={products} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductsFullViewPage;
