import { Flex, Icon, Tooltip, useToast } from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { TProduct } from "../../../types";
import { PiHeartThin } from "react-icons/pi";
import GlobalContext from "@/context/GlobalContext";

type TProductsProps = {
  product: TProduct | undefined;
};

const AddProductsToFavoriteFullView: FC<TProductsProps> = ({ product }) => {
  const toast = useToast();
  const { setFavoriteListProductsLength } = useContext(GlobalContext);

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/profile/favorite-products`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
        }),
      }
    );

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
          borderRadius={5}
          bg="#F5F5F5"
          p={0}
          m={0}
          h={["40px", "45px", "50px"]}
          w={["40px", "45px", "50px"]}
          _hover={{
            bg: "#EBEBEB",
            cursor: "pointer",
          }}
          _active={{
            bg: "gray.200",
          }}
        >
          <Icon
            as={PiHeartThin}
            w={[6, 7, 8]}
            h={[6, 7, 8]}
            color="brand.cyan2"
          />
        </Flex>
      </Tooltip>
    </>
  );
};

export default AddProductsToFavoriteFullView;
