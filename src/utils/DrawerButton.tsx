import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  Link,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const DrawerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <>
      <Flex gap={2}>
        <Icon
          as={RxHamburgerMenu}
          onClick={onOpen}
          cursor="pointer"
          h={6}
          w={6}
        />
        <Text>Categories</Text>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Categories</DrawerHeader>

          <DrawerBody>
            <Input type="text" placeholder="Search an instrument" />
            <List gap={10}>
              <ListItem>
                <Link href="/products/electric-guitars">Electric Guitars</Link>
              </ListItem>
              <ListItem>
                <Link href="/products/electric-bass">Electric Bass</Link>
              </ListItem>
              <ListItem>
                <Link href="/products/electric-drums">Electric Drums</Link>
              </ListItem>
              <ListItem>
                <Link href="/products/acoustic-drums">Acoustic Drums</Link>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerButton;
