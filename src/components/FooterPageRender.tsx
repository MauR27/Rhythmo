"use client";

import { Box, Flex, Icon, Link, List, ListItem, Text } from "@chakra-ui/react";
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoMail,
} from "react-icons/io5";

const FooterPageRender = () => {
  return (
    <Flex
      h="32"
      bg="white"
      color="white"
      align="center"
      flexDir="column"
      boxShadow="0px -1px 10px gray"
      // justify="space-between"
    >
      <Flex
        align="center"
        justify="center"
        minW="100%"
        minH="100%"
        flexDir="column"
      >
        <Flex
          minW="100%"
          align="center"
          justify="center"
          gap={5}
          fontSize={["12px", "14px", "16px"]}
        >
          <Text color="black">Contact us:</Text>
          <Icon
            color="black"
            as={IoLogoInstagram}
            w={["20px", "30px", "30px"]}
            h={["20px", "30px", "30px"]}
            _hover={{ color: "brand.cyan" }}
          />
          <Icon
            color="black"
            as={IoLogoFacebook}
            w={["20px", "30px", "30px"]}
            h={["20px", "30px", "30px"]}
            _hover={{ color: "brand.cyan" }}
          />
          <Icon
            color="black"
            as={IoLogoLinkedin}
            w={["20px", "30px", "30px"]}
            h={["20px", "30px", "30px"]}
            _hover={{ color: "brand.cyan" }}
          />
          <Icon
            color="black"
            as={IoLogoTwitter}
            w={["20px", "30px", "30px"]}
            h={["20px", "30px", "30px"]}
            _hover={{ color: "brand.cyan" }}
          />
          <Icon
            color="black"
            as={IoMail}
            w={["20px", "30px", "30px"]}
            h={["20px", "30px", "30px"]}
            _hover={{ color: "brand.cyan" }}
          />
        </Flex>
      </Flex>

      <Flex
        bg="rgba(1,44,60,1)"
        minH="30px"
        minW="100%"
        color="white"
        justify="center"
        align="center"
        fontSize={["8px", "8px", "10px"]}
      >
        <Text>Copyright ©2024; Designed by MAUR27</Text>
      </Flex>
    </Flex>
  );
};

export default FooterPageRender;
