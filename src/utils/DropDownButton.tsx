import { Link } from "@chakra-ui/next-js";
import { Icon, useBreakpointValue } from "@chakra-ui/react";
import React, { FC } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import LoginModal from "./LoginModal";
import { LiaUser } from "react-icons/lia";

type TAdminRole = {
  admin: string;
};

const DropDownButton: FC<TAdminRole> = ({ admin }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const widthMenuBox = useBreakpointValue({
    base: "150px",
    sm: "150px",
    md: "200px",
  });
  const fontSizeMenuBox = useBreakpointValue({
    base: "12px",
    sm: "14px",
    md: "16px",
  });

  return (
    <section about="Menu drop user">
      <Menu>
        <MenuButton
          color="brand.gray"
          _hover={{ color: "brand.cyan2" }}
          transition=".3s"
          display="flex"
          w={[6, 7, 8]}
          h={[6, 7, 8]}
        >
          <Icon display="flex" as={LiaUser} w={[6, 7, 8]} h={[6, 7, 8]} />
        </MenuButton>

        {session ? (
          <>
            <MenuList
              minW={widthMenuBox}
              borderRadius="10px"
              boxShadow="xl"
              fontSize={fontSizeMenuBox}
            >
              <MenuItem
                onClick={() => signOut()}
                _hover={{
                  bg: "brand.cyan2",
                  color: "white",
                }}
              >
                Logout
              </MenuItem>
              <MenuItem
                as={Link}
                href="/pages/profile"
                _hover={{
                  bg: "brand.cyan2",
                  color: "white",
                  textDecor: "none",
                }}
              >
                Profile
              </MenuItem>

              <MenuItem
                as={Link}
                href="/pages/profile/favorite-products"
                _hover={{
                  bg: "brand.cyan2",
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
                    _hover={{
                      bg: "brand.cyan2",
                      color: "white",
                      textDecor: "none",
                    }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    as={Link}
                    href={`/admin/add-products`}
                    _hover={{
                      bg: "brand.cyan2",
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
          <MenuList minW={widthMenuBox} borderRadius="10px">
            <MenuItem
              p={0}
              m={0}
              _hover={{
                bg: "brand.cyan2",
                color: "white",
              }}
            >
              <LoginModal />
            </MenuItem>
            <MenuItem
              as={Link}
              href="/pages/register"
              _hover={{
                bg: "brand.cyan2",
                color: "white",
                textDecor: "none",
              }}
              fontSize={["12px", "14px", "16px"]}
            >
              Sign Up
            </MenuItem>
          </MenuList>
        )}
      </Menu>
    </section>
  );
};

export default DropDownButton;
