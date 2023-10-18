"use client";

import { Box, Flex, Image, Text } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Flex minH="calc(100vh - 11rem)" alignItems="center" justify="center">
      <Box>
        <Image src="/Banner3.png" alt="banner" borderRadius="md" />
      </Box>
    </Flex>
  );
};

export default Hero;
