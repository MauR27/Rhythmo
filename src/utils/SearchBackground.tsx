import { Flex } from "@chakra-ui/react";

const SearchBackground = () => {
  return (
    <Flex
      zIndex={-1}
      h="100vh"
      position="fixed"
      opacity="0"
      right="0"
      left="0"
      mt="-24px"
    ></Flex>
  );
};

export default SearchBackground;
