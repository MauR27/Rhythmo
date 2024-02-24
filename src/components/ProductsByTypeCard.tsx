"use client";

import { FC } from "react";
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
  Link,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Carousel from "@/utils/ImageProductCard";
import AddToCart from "./AddToCart";
import { PiHeartThin } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import AddFavoriteProduct from "./AddFavoriteProduct";

interface ProductsTypeProps {
  products: ProductsResponse;
}

const ProductsByTypeCard: FC<ProductsTypeProps> = ({ products }) => {
  return (
    <Box minH="100vh">
      <Flex gap={4} justify="center" maxW="full" flexWrap="wrap">
        {products.map((product, index) => (
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
                >{`${product.price},00$`}</Text>
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
                    <Icon as={CiSearch} w={[6, 7]} h={[6, 7]} color="black" />
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
  );
};

export default ProductsByTypeCard;
