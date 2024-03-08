import { AlertStatus, Flex, Icon, Tooltip, useToast } from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { TProduct } from "../../../types";
import { PiHeartThin } from "react-icons/pi";
import GlobalContext from "@/context/GlobalContext";

type TProductsProps = {
  product: TProduct;
};

const AddProductsToFavorite: FC<TProductsProps> = ({ product }) => {
  const toast = useToast();
  const { setFavoriteListProductsLength } = useContext(GlobalContext);

  const statusError = (status: number) => {
    let responseStatus: { status: AlertStatus; message: string } = {
      message: "",
      status: "info",
    };
    switch (status) {
      case 201:
        responseStatus = {
          status: "error",
          message: "Item marked as Favorite!",
        };
        break;
      case 409:
        responseStatus = {
          status: "success",
          message: "You already have this Item in your Favorite List!",
        };
        break;
      case 400:
        responseStatus = {
          status: "success",
          message: "You have to Login first",
        };
        break;
      default:
        break;
    }
    return responseStatus;
  };

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/profile/favorite-products`,
      {
        cache: "no-cache",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
        }),
      }
    );

    const data = await response.json();

    const errors = statusError(response.status);

    setFavoriteListProductsLength(data?.favoriteProduct?.length || 0);

    toast({
      status: errors.status,
      description: errors.message,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
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
