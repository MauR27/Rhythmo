"use client";

import DropDownButton from "@/utils/DropDownButton";
import { Flex, Heading, Text } from "@chakra-ui/react";
import SearchCollapse from "@/utils/SearchCollapse";
import ProductsCategoriesNavRender from "./products/ProductsCategoriesNavRender";
import CartNavButton from "./cart/CartNavButton";
import { FC } from "react";
import { Link } from "@chakra-ui/next-js";

type TAdminRole = {
  admin: string;
};

const NavbarPageRender: FC<TAdminRole> = ({ admin }) => {
  return (
    <Flex
      as="nav"
      flexDir="column"
      px="6"
      py="4"
      h="52"
      justify="space-between"
      bg="#ffffff"
      boxShadow="lg"
    >
      <Flex justify="space-between" alignItems="center" h="4rem">
        <Link href="/" _hover={{ textDecor: "none" }}>
          <Heading color="brand.cyan2" fontSize={["1.5em", "2em", "2.5em"]}>
            <Text>RhythmO</Text>
          </Heading>
        </Link>
        <Flex gap={4} zIndex={1} align="center">
          <SearchCollapse />
          <DropDownButton admin={admin} />
          <CartNavButton />
        </Flex>
      </Flex>
      <ProductsCategoriesNavRender />
    </Flex>
  );
};

export default NavbarPageRender;
