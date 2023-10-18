"use client";

import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex h="56" bg="cyan.600" color="white" align="center" flexDir="column">
      <Flex
        bg="cyan.500"
        fontSize="1.5em"
        minW="full"
        justify="space-around"
        h={14}
        align="center"
      >
        <Text>Categories</Text>
        <Text>Sponsors</Text>
        <Text>Contact us</Text>
      </Flex>
      <Flex minW="full">
        <Flex flex={1} justify="center">
          <List ml="1rem" fontWeight="light" fontSize="1.1rem">
            <ListItem>Electric Guitars</ListItem>
            <ListItem>Electric Bass</ListItem>
            <ListItem>Electric Drums</ListItem>
            <ListItem>Acoustic Drums</ListItem>
          </List>
        </Flex>
        <Flex flex={1} justify="center">
          <List
            ml="1rem"
            fontWeight="light"
            fontSize="1.1rem"
            display="flex"
            flexDir="column"
            flexWrap="wrap"
          >
            <ListItem>Ibanez</ListItem>
            <ListItem>Gibson</ListItem>
            <ListItem>Tama</ListItem>
            <ListItem>Fender</ListItem>
          </List>
        </Flex>
        <Flex flex={1} justify="center">
          <List ml="1rem" fontWeight="light" fontSize="1.1rem">
            <ListItem>Email</ListItem>
            <ListItem>Phone</ListItem>
            <ListItem>LinkedIn</ListItem>
            <ListItem>GitHub</ListItem>
          </List>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
