"use client";

import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";

const FooterPageRender = () => {
  return (
    <Flex
      h="56"
      background=" rgb(93,188,223)"
      bg="linear-gradient(180deg, rgba(93,188,223,1) 37%, rgba(0,147,201,1) 100%)"
      color="white"
      align="center"
      flexDir="column"
      boxShadow="0px -1px 10px gray"
    >
      <Flex
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

export default FooterPageRender;
