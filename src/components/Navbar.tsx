"use client";

import DropDownButton from "@/utils/DropDownButton";
import {
  Box,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import DrawerButton from "@/utils/DrawerButton";
import SearchCollapse from "@/utils/SearchCollapse";
import CategoriesNavbar from "./CategoriesNavbar";
import CartNavButton from "./CartNavButton";
import { Link } from "@chakra-ui/next-js";

const Navbar = () => {
  // Responsive break points

  const titleText = useBreakpointValue({
    base: "1.5em",
    sm: "2em",
  });
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  return (
    <Flex
      as="nav"
      flexDir="column"
      px="6"
      py="4"
      h="44"
      justify="space-between"
      bg="white"
      boxShadow="md"
    >
      <Flex justify="space-between" alignItems="center">
        <Link href="/" _hover={{}}>
          <Heading color="cyan.600" fontSize={titleText}>
            <Text>Rhythmo</Text>
          </Heading>
        </Link>
        <Flex gap={4}>
          <SearchCollapse />
          <DropDownButton />
          <CartNavButton />
        </Flex>
      </Flex>
      {isLargerThan480 ? (
        <CategoriesNavbar />
      ) : (
        <Box>
          <DrawerButton />
        </Box>
      )}
    </Flex>
  );
};

export default Navbar;
