import GlobalContext from "@/context/GlobalContext";
import Carousel from "@/utils/ImageProductCard";
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
import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import AddToCart from "./AddToCart";
import RemoveFavoriteItem from "./RemoveFavoriteItem";

const FavoriteProductListCard = () => {
  const {
    favoriteProductList,
    favoriteListProductsLength,
    setFavoriteListProductsLength,
  } = useContext(GlobalContext);

  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    const fetchCartLength = async () => {
      const response = await fetch(
        "http://localhost:3000/api/get-favorite-list-length"
      );
      const cartLength: number = await response.json();

      return setFavoriteListProductsLength(cartLength);
    };
    fetchCartLength();
    setLoadingList(false);
  }, [setFavoriteListProductsLength]);

  if (loadingList) {
    return <Text>Loading List...</Text>;
  }
  console.log(favoriteProductList);

  return (
    <Box minH="100vh">
      {favoriteListProductsLength !== 0 ? (
        <Flex gap={4} justify="center" maxW="full" flexWrap="wrap">
          {favoriteProductList.map((product, index) => (
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
                      href={`/instrument/${product.productId}`}
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
                  <AddToCart product={product} />
                  <RemoveFavoriteItem _id={product._id} />
                </Box>
              </CardFooter>
            </Card>
          ))}
        </Flex>
      ) : (
        <Text>Ups! you dont have any favorite instrument</Text>
      )}
    </Box>
  );
};

export default FavoriteProductListCard;
