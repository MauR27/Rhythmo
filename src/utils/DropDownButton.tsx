// import Link from "next/link";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import React, { useState } from "react";
import { PiUserThin } from "react-icons/pi";
import { useSession, signOut } from "next-auth/react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

const DropDownButton = () => {
  const [toggle, setToggle] = useState(false);
  const { data: session } = useSession();

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <Menu>
      <MenuButton as={Button}>
        <PiUserThin size="25px" />
      </MenuButton>
      {session ? (
        <MenuList minW="150px">
          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
          <MenuItem as={NextLink} href="/profile">
            Profile
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList minW="150px">
          <MenuItem as={NextLink} href="/login">
            Sign In
          </MenuItem>
          <MenuItem as={NextLink} href="/register">
            Sign Up
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

export default DropDownButton;
