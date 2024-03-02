import { Button, Icon, Tooltip, useToast } from "@chakra-ui/react";
import React, { FC, useContext, useEffect } from "react";
import { TProduct } from "../../types";
import { PiHeartThin } from "react-icons/pi";
import GlobalContext from "@/context/GlobalContext";

type TProductsProps = {
  product: TProduct;
};

const AddFavoriteProduct: FC<TProductsProps> = ({ product }) => {
  const toast = useToast();
  const { setFavoriteListProductsLength } = useContext(GlobalContext);

  const fetchData = async () => {
    const response = await fetch("/api/profile/favorite-products", {
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
        {product ? (
          <Button
            onClick={fetchData}
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
            <Icon as={PiHeartThin} w={[6, 7]} h={[6, 7]} color="black" />
          </Button>
        ) : (
          <>gola</>
        )}
      </Tooltip>
    </>
  );
};

export default AddFavoriteProduct;
