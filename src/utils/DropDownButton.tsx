import { Link } from "@chakra-ui/next-js";
import { Flex, Icon, useBreakpointValue } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { PiUserThin } from "react-icons/pi";
import { useSession, signOut, getProviders } from "next-auth/react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import LoginModal from "./LoginModal";

type TAdminRole = {
  admin: string;
};

const DropDownButton: FC<TAdminRole> = ({ admin }) => {
  const { data: session } = useSession();
  const user = session?.user;
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
              href="/pages/profile"
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
              href="/pages/profile/favorite-products"
              fontWeight="semibold"
              _hover={{
                bg: "cyan.700",
                color: "white",
                textDecor: "none",
              }}
            >
              Likes
            </MenuItem>
            {user?.email === admin && (
              <>
                <MenuItem
                  as={Link}
                  href={`/admin/dashboard`}
                  fontWeight="semibold"
                  _hover={{
                    bg: "cyan.700",
                    color: "white",
                    textDecor: "none",
                  }}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  as={Link}
                  href={`/admin/add-instruments`}
                  fontWeight="semibold"
                  _hover={{
                    bg: "cyan.700",
                    color: "white",
                    textDecor: "none",
                  }}
                >
                  Add Products
                </MenuItem>
              </>
            )}
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
            href="/pages/register"
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
