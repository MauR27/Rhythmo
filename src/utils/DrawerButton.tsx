import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { instrumentTypes } from "@/components/products/ProductsCategoriesNavRender";
import { Link } from "@chakra-ui/next-js";

const DrawerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [onClickFocus, setOnClickFocus] = useState("");

  const handleDrawer = (type: string) => {
    setOnClickFocus(type);
    onClose();
  };

  const btnRef = React.useRef(null);
  return (
    <>
      <Flex gap={2} align="center">
        <Icon
          as={RxHamburgerMenu}
          onClick={onOpen}
          cursor="pointer"
          h={5}
          w={5}
        />
        <Text fontSize="12px">Categories</Text>
      </Flex>
      <Drawer
        size="xs"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="14">Categories</DrawerHeader>

          <DrawerBody fontSize="12px" p={0}>
            <List display="flex" flexDir="column" gap={5}>
              {instrumentTypes.map((type, index) => (
                <ListItem
                  onClick={() => handleDrawer(type.name)}
                  pl={5}
                  display="flex"
                  alignItems="center"
                  borderRight={onClickFocus === type.name ? "10px solid" : ""}
                  borderColor={onClickFocus === type.name ? "brand.cyan" : ""}
                  boxShadow={
                    onClickFocus === type.name
                      ? "0px 5px 5px 0px  rgba(59, 153, 187, 0.5)"
                      : ""
                  }
                  h={10}
                  key={index}
                  as={Link}
                  href={`/pages/products/${type.path}`}
                  _hover={{
                    textDecor: "none",
                    boxShadow: "0px 10px 10px 0px rgba(59, 153, 187, 0.5)",
                  }}
                >
                  {type.name}
                </ListItem>
              ))}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerButton;
