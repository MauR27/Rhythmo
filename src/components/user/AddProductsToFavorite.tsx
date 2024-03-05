import { Box, Button, Flex, Icon, Tooltip, useToast } from "@chakra-ui/react";
import React, { FC, useContext, useEffect } from "react";
import { TProduct } from "../../../types";
import { PiHeartThin } from "react-icons/pi";
import GlobalContext from "@/context/GlobalContext";

type TProductsProps = {
  product: TProduct;
};

const AddProductsToFavorite: FC<TProductsProps> = ({ product }) => {
  const toast = useToast();
  const { setFavoriteListProductsLength } = useContext(GlobalContext);

  const fetchData = async () => {
    const response = await fetch("/api/user/profile/favorite-products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setFavoriteListProductsLength(data?.favoriteProduct?.length || 0);

      toast({
        status: "success",
        description: response?.statusText,
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        status: "error",
        description: response?.statusText,
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label="Add to favorite"
        bg="white"
        color="black"
        gutter={0}
        fontSize="xs"
      >
        <Flex
          align="center"
          justify="center"
          onClick={fetchData}
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
          <Icon as={PiHeartThin} w={[6, 7, 8]} h={[6, 7, 8]} color="black" />
        </Flex>
      </Tooltip>
    </>
  );
};

export default AddProductsToFavorite;
