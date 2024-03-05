import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <Flex minH="calc(100vh - 14rem)" align="center" justify="center">
      <Spinner size="xl" />;
    </Flex>
  );
};

export default LoadingSpinner;
