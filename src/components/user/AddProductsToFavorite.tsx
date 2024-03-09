import { Flex, Icon, Spinner, Tooltip, useToast } from "@chakra-ui/react";
import React, { FC, useContext, useEffect, useState } from "react";
import { TProduct } from "../../../types";
import { PiHeartThin } from "react-icons/pi";
import GlobalContext from "@/context/GlobalContext";
import { statusError } from "@/utils/errors";
import { PiHeartFill } from "react-icons/pi";
import { useSession } from "next-auth/react";

type TProductsProps = {
  product: TProduct | undefined;
};

const AddProductsToFavorite: FC<TProductsProps> = ({ product }) => {
  const toast = useToast();
  const { setFavoriteListProductsLength } = useContext(GlobalContext);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      if (session) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/profile/get-favorite-products`
        );
        const data = await response.json();
        return setLikedProducts(data.map((item: any) => item.productId));
      }
    })();
  }, [session]);

  const fetchData = async (productId: string) => {
    if (session) {
      if (likedProducts.includes(productId)) {
        setLikedProducts(likedProducts.filter((id) => id !== productId));
      } else {
        setLikedProducts([...likedProducts, productId]);
      }
    }
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

  if (!product) return <Spinner />;
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
          onClick={() => fetchData(product._id)}
          borderRadius={10}
          bg="white"
          p={0}
          m={0}
          h={["30px", "40px", "50px"]}
          w={["30px", "40px", "50px"]}
          _hover={{
            bg: "gray.100",
            cursor: "pointer",
          }}
          _active={{
            bg: "gray.200",
          }}
        >
          {likedProducts.includes(product._id) ? (
            <Icon
              as={PiHeartFill}
              w={[6, 7, 8]}
              h={[6, 7, 8]}
              color="brand.cyan2"
            />
          ) : (
            <Icon as={PiHeartThin} w={[6, 7, 8]} h={[6, 7, 8]} color="black" />
          )}
        </Flex>
      </Tooltip>
    </>
  );
};

export default AddProductsToFavorite;
