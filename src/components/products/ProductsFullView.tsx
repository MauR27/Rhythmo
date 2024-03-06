"use client";

import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TProduct } from "../../../types";
import CartAddProductsFullView from "../cart/CartAddProductsFullView";
import AddProductsToFavoriteFullView from "../user/AddProductsToFavoriteFullView";

type TProductProps = {
  item: TProduct;
};

const ProductsFullView: FC<TProductProps> = ({ item }) => {
  const [isLargerThan580] = useMediaQuery("(min-width: 580px)");
  const [images, setImages] = useState(item.images[0]);

  return (
    <Flex
      minH="calc(100vh - 15rem)"
      mt={5}
      flexDir={isLargerThan580 ? "row" : "column-reverse"}
      gap={5}
    >
      <Flex gap={10} flex={1} flexDir="column" align="center" justify="center">
        <Box>
          <Image src={images} alt={item.name} objectFit="cover" />
        </Box>
        <Flex gap={5} flexWrap="wrap" align="center" justify="center">
          {item.images.map((image, index) => (
            <Box key={index} bg="black">
              <Image
                _hover={{
                  cursor: "pointer",
                  opacity: "0.8",
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
            <Text fontSize={["18px", "20px", "24px", "28px"]}>{item.name}</Text>
          </Box>
          <Box>
            <Text fontSize={["16px", "18px", "20px", "24px"]} fontWeight="bold">
              {item.price} $
            </Text>
            <Text fontSize={["12px", "14px", "16px"]} color="blackAlpha.600">
              Taxes included
            </Text>
          </Box>
          <Box fontSize={["10px", "12px", "14px"]}>
            <Text>{item.description}</Text>
          </Box>
          <Flex align="center" gap={2}>
            <CartAddProductsFullView product={item} />
            <AddProductsToFavoriteFullView product={item} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductsFullView;
