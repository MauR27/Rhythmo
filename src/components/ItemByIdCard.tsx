"use client";

import { FC } from "react";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TProduct } from "../../types";

type TProductProps = {
  item: TProduct;
};

const ItemByIdCard: FC<TProductProps> = ({ item }) => {
  return (
    <>
      <Flex flexDir={"column"}>
        <Text>{item.name}</Text>
        <Text>{item.price}</Text>
        <Image src={item.images[0]} h={300} w={300} alt={item.name} />
        <Text>{item.description}</Text>
      </Flex>
    </>
  );
};

export default ItemByIdCard;
