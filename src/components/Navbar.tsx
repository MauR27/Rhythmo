"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import DropDownButton from "@/utils/DropDownButton";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const toggleInput = () => {
    setToggle(!toggle);
  };

  return (
    <Flex
      as="nav"
      flexDir="column"
      bg="red.400"
      px="6"
      py="4"
      shadow="md"
      h="44"
      justify="space-between"
    >
      <Flex justify="space-between" bg="red.200" alignItems="center">
        <Link href="/">
          <Heading color="black">
            <Text fontSize={{ base: "1.5rem", sm: "2rem", md: "2.5rem" }}>
              Rhythmo
            </Text>
          </Heading>
        </Link>
        <HStack gap={4}>
          <Box>
            <AnimatePresence>
              {toggle && (
                <motion.input
                  type="text"
                  key="input"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.1 }}
                />
              )}
            </AnimatePresence>

            {!toggle ? (
              <Icon
                as={CiSearch}
                w={6}
                h={6}
                onClick={toggleInput}
                _hover={{ cursor: "pointer" }}
              />
            ) : (
              <Icon
                as={RxCross1}
                w={5}
                h={5}
                onClick={toggleInput}
                _hover={{ cursor: "pointer" }}
              />
            )}
          </Box>

          <DropDownButton />

          <Link href="/">
            <Icon as={PiShoppingCartSimpleThin} w={6} h={6} />
          </Link>
        </HStack>
      </Flex>
      <Flex justify="center" bg="blue.100" p={2}>
        <List as={Flex} gap={10}>
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
      </Flex>
    </Flex>
  );
};

export default Navbar;
