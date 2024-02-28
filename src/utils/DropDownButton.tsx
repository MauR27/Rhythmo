import { Link } from "@chakra-ui/next-js";
import { Flex, Icon, useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PiUserThin } from "react-icons/pi";
import { useSession, signOut, getProviders } from "next-auth/react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import LoginModal from "./LoginModal";

const DropDownButton = () => {
  const { data: session } = useSession();
  // @ts-ignore
  const provider = session?.user?.provider;

  const widthMenuBox = useBreakpointValue({
    base: "100px",
    sm: "150px",
  });

  const googleSession = provider === "google";

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
        <>
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
              as={Link}
              href="/profile"
              fontWeight="semibold"
              _hover={{
                bg: "cyan.700",
                color: "white",
                textDecor: "none",
              }}
            >
              Profile
            </MenuItem>

            <MenuItem
              as={Link}
              href="/profile/favorite-products"
              fontWeight="semibold"
              _hover={{
                bg: "cyan.700",
                color: "white",
                textDecor: "none",
              }}
            >
              Likes
            </MenuItem>
          </MenuList>
        </>
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
            as={Link}
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
