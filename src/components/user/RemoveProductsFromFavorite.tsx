import GlobalContext from "@/context/GlobalContext";
import { Flex, Icon, Tooltip } from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { PiHeartFill } from "react-icons/pi";

type TProductId = {
  _id: string;
};

const RemoveProductsFromFavorite: FC<TProductId> = ({ _id }) => {
  const { setFavoriteProductList, setFavoriteListProductsLength } =
    useContext(GlobalContext);

  const fetchRemoveItem = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/profile/favorite-products/remove`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      }
    );
    const data = await response.json();
    setFavoriteProductList(data?.favoriteProduct);
    setFavoriteListProductsLength(data?.favoriteProduct?.length || 0);
  };

  return (
    <Tooltip
      hasArrow
      label="Remove product"
      bg="white"
      color="black"
      gutter={0}
      fontSize="xs"
    >
      <Flex
        align="center"
        justify="center"
        onClick={fetchRemoveItem}
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
        <Icon
          as={PiHeartFill}
          w={[6, 7, 8]}
          h={[6, 7, 8]}
          color="brand.cyan2"
        />
      </Flex>
    </Tooltip>
  );
};

export default RemoveProductsFromFavorite;
