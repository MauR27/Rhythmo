"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  Icon,
  Badge,
  useMediaQuery,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { ProductsResponse } from "../../types";
import AddToCart from "./AddToCart";
import { CiSearch } from "react-icons/ci";
import AddFavoriteProduct from "./AddFavoriteProduct";
import { Link } from "@chakra-ui/next-js";

type TProducts = {
  products: ProductsResponse;
};

const NewProductCard: FC<TProducts> = ({ products }) => {
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const [hover, setHover] = useState(false);
  return (
    <Flex
      minH="100vh"
      alignItems="center"
      justify="center"
      flexDir="column"
      gap={5}
    >
      <VStack maxW="500px" p="1rem">
        <Text as="h1" fontSize="3xl" fontWeight="bold">
          New Products
        </Text>
        <Text p="1rem" fontWeight="light" boxShadow="sm">
          All the news of the best national and international brands. You will
          find instruments, studio equipment and accessories among many other
          products for the musician.
        </Text>
      </VStack>
      <Flex gap={4} justify="center" maxW="full" flexWrap="wrap">
        {products.map((product, index) => {
          // const priceFixed = product.price / 100;
          return (
            <Card
              key={index}
              maxW="xs"
              borderRadius={0}
              my={10}
              _hover={{
                cursor: "pointer",
                textDecor: "none",
                boxShadow: "lg",
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
              <Badge
                color="white"
                fontWeight="bold"
                bgColor="cyan.600"
                position="absolute"
              >
                new
              </Badge>
              <CardBody>
                <Box position="relative" width="full" overflow="hidden">
                  <Image
                    objectFit="cover"
                    src={product.images[0]}
                    alt={product.images[0]}
                    className="first-image"
                    display="block"
                  />
                  <Image
                    objectFit="cover"
                    src={
                      product.images[1] ? product.images[1] : product.images[0]
                    }
                    alt={
                      product.images[1] ? product.images[1] : product.images[0]
                    }
                    className="second-image"
                    display="none"
                  />
                </Box>

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
                  >{`${product.price}$`}</Text>
                </Stack>
              </CardBody>
              <CardFooter
                className="footer-buttons"
                opacity={0}
                position="absolute"
                top="60%"
                left="20%"
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
                      href={`/pages/instrument/${product._id}`}
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
          );
        })}
      </Flex>
    </Flex>
  );
};

export default NewProductCard;
