import React, { FC } from "react";
import { ProductsResponse } from "../../types";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { CiSearch } from "react-icons/ci";
import AddProductsToFavorite from "@/components/user/AddProductsToFavorite";
import CartAddProducts from "@/components/cart/CartAddProducts";
import ImagesCarousel from "./ImageCarousel";

type TProductsArray = {
  products: ProductsResponse;
};

const ProductsCardWithCarousel: FC<TProductsArray> = ({ products }) => {
  return (
    <>
      <Flex gap={2} justify="center" maxW="full" flexWrap="wrap">
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              maxW={["200px", "250px", "xs"]}
              borderRadius={5}
              boxShadow="none"
              _hover={{
                cursor: "pointer",
                textDecor: "none",
                boxShadow: "xl",
                ".footer-buttons": {
                  opacity: 1,
                  transform: "auto",
                  translateY: "15px",
                },
                ".first-image": {
                  display: "none",
                },
                ".second-image": {
                  display: "block",
                },
              }}
            >
              <CardBody>
                <ImagesCarousel images={product} />
                <Stack
                  as={Flex}
                  mt="4"
                  spacing="3"
                  textAlign="center"
                  fontSize={["12px", "14px", "16px"]}
                >
                  <Heading
                    fontSize={["12px", "14px", "16px"]}
                    fontWeight="normal"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {product.name}
                  </Heading>

                  <Text fontWeight="normal">{`${product.price} $`}</Text>
                </Stack>
              </CardBody>
              <CardFooter
                className="footer-buttons"
                opacity={0}
                position="absolute"
                top={["50%", "55%", "60%"]}
                left={["16%", "18%", "20%"]}
                transition=".5s"
              >
                <Flex
                  border="1px solid"
                  borderColor="gray.100"
                  bg="white"
                  borderRadius={10}
                  boxShadow="lg"
                >
                  <Tooltip
                    hasArrow
                    label="Full view"
                    bg="white"
                    color="black"
                    gutter={0}
                    fontSize="xs"
                  >
                    <Link
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      href={`/pages/products/fullview/${product._id}`}
                      borderRadius={10}
                      bg="white"
                      p={0}
                      m={0}
                      h={["30px", "40px", "50px"]}
                      w={["30px", "40px", "50px"]}
                      _hover={{
                        bg: "gray.100",
                      }}
                      _active={{
                        bg: "gray.200",
                      }}
                    >
                      <Icon
                        as={CiSearch}
                        w={[6, 7, 8]}
                        h={[6, 7, 8]}
                        color="black"
                      />
                    </Link>
                  </Tooltip>

                  <AddProductsToFavorite product={product} />
                  <CartAddProducts product={product} />
                </Flex>
              </CardFooter>
            </Card>
          );
        })}
      </Flex>
    </>
  );
};

export default ProductsCardWithCarousel;
