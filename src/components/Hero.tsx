"use client";

import { Box, Flex, Image, Text } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Flex
      minH="calc(100vh - 11rem)"
      bg="blue.100"
      justify="center"
      alignItems="center"
    >
      <Box>
        <Text>Today Offerts</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
          cupiditate labore qui dolores hic reiciendis est explicabo facere.
          Vitae culpa unde perspiciatis voluptatem beatae sit totam magni
          inventore esse maxime.
        </Text>
      </Box>
      <Box>
        <Image src="/banner.png" alt="banner" />
      </Box>
    </Flex>
  );
};

export default Hero;
