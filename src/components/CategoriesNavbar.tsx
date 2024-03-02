// import { Link } from "@chakra-ui/next-js";
import { Link } from "@chakra-ui/next-js";
import { Flex, List, ListItem, useBreakpointValue } from "@chakra-ui/react";

const CategoriesNavbar = () => {
  const instrumentsText = useBreakpointValue({
    base: ".7em",
    md: "1em",
  });

  return (
    <Flex justify="center" py={2} px={4}>
      <List as={Flex} gap={10} fontSize={instrumentsText}>
        <ListItem>
          <Link
            pb={6}
            px={2}
            fontWeight="semibold"
            href="/pages/products/all"
            _hover={{
              color: "cyan.600",
              borderBottom: "2px solid black",
              bg: "gray.100",
            }}
          >
            All Products
          </Link>
        </ListItem>

        <ListItem>
          <Link
            pb={6}
            px={2}
            fontWeight="semibold"
            href="/pages/products/electric-guitars"
            _hover={{
              color: "cyan.600",
              borderBottom: "2px solid black",
              bg: "gray.100",
            }}
          >
            Electric Guitars
          </Link>
        </ListItem>
        <ListItem>
          <Link
            pb={6}
            px={2}
            fontWeight="semibold"
            href="/pages/products/electric-bass"
            _hover={{
              color: "cyan.600",
              borderBottom: "2px solid black",
              bg: "gray.100",
            }}
          >
            Electric Bass
          </Link>
        </ListItem>
        <ListItem>
          <Link
            pb={6}
            px={2}
            fontWeight="semibold"
            href="/pages/products/electric-drums"
            _hover={{
              color: "cyan.600",
              borderBottom: "2px solid black",
              bg: "gray.100",
            }}
          >
            Electric Drums
          </Link>
        </ListItem>
        <ListItem>
          <Link
            pb={6}
            px={2}
            fontWeight="semibold"
            href="/pages/products/acoustic-drums"
            _hover={{
              color: "cyan.600",
              borderBottom: "2px solid black",
              bg: "gray.100",
            }}
          >
            Acoustic Drums
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
};

export default CategoriesNavbar;
