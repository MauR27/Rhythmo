"use client";

import GlobalContext from "@/context/GlobalContext";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import LoadingSpinner from "@/utils/LoadingSpinner";
import ProductsFavoriteCard from "@/utils/ProductsFavoriteCard";

const FavoriteProductsRender = () => {
  const { favoriteProductList, setFavoriteProductList } =
    useContext(GlobalContext);

  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    try {
      setLoadingList(true);
      (async () => {
        const response = await fetch("/api/user/profile/get-favorite-products");
        if (response.ok) {
          const userProductsList = await response.json();
          setFavoriteProductList(userProductsList);
          setLoadingList(false);
        }
      })();
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }, [setFavoriteProductList]);

  if (loadingList) return <LoadingSpinner />;

  return (
    <Box>
      {favoriteProductList.length !== 0 ? (
        <ProductsFavoriteCard products={favoriteProductList} />
      ) : (
        <Flex
          align="center"
          justify="center"
          minH="calc(100vh - 13rem)"
          p="0 10px 0 10px"
        >
          <Text fontSize={["25px", "25px", "30px"]} textAlign="center">
            You dont have any instrument yet...
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default FavoriteProductsRender;
