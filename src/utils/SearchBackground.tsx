import { Flex } from "@chakra-ui/react";

const SearchBackground = () => {
  return (
    <Flex
      zIndex={-1}
      h="100vh"
      bg="blackAlpha.500"
      position="fixed"
      opacity=".5"
      right="0"
      left="0"
      mt="-24px"
    ></Flex>
  );
};

export default SearchBackground;
