import NextLink from "next/link";
import { Flex, Icon, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { PiUserThin } from "react-icons/pi";
import { useSession, signOut } from "next-auth/react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import LoginModal from "./LoginModal";

const DropDownButton = () => {
  const { data: session } = useSession();

  const widthMenuBox = useBreakpointValue({
    base: "100px",
    sm: "150px",
  });

  return (
    <Menu>
      <MenuButton _hover={{ color: "cyan.600" }} transition=".3s">
        <Icon
          display="flex"
          as={PiUserThin}
          w={[6, 7]}
          h={[6, 7]}
          _hover={{ color: "blue" }}
        />
      </MenuButton>
      {session ? (
        <MenuList minW={widthMenuBox} borderRadius="none">
          <MenuItem
            onClick={() => signOut()}
            fontWeight="semibold"
            _hover={{
              bg: "cyan.700",
              color: "white",
            }}
          >
            Logout
          </MenuItem>
          <MenuItem
            as={NextLink}
            href="/profile"
            fontWeight="semibold"
            _hover={{
              bg: "cyan.700",
              color: "white",
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            as={NextLink}
            href="/profile/favorite-products"
            fontWeight="semibold"
            _hover={{
              bg: "cyan.700",
              color: "white",
            }}
          >
            Likes
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList minW={widthMenuBox} borderRadius="none">
          <MenuItem
            p={0}
            m={0}
            _hover={{
              bg: "cyan.700",
              color: "white",
            }}
          >
            <LoginModal />
          </MenuItem>
          <MenuItem
            as={NextLink}
            href="/register"
            fontWeight="semibold"
            _hover={{
              bg: "cyan.700",
              color: "white",
            }}
          >
            Sign Up
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

export default DropDownButton;
