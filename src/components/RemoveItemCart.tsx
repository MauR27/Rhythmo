"use client";

import GlobalContext from "@/context/GlobalContext";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { FC, useContext, useRef } from "react";

interface ICartItem {
  _id: string;
}

const RemoveItemCart: FC<ICartItem> = ({ _id }) => {
  const { setCartLength, setCart } = useContext(GlobalContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const fetchRemoveItem = async () => {
    try {
      const response = await fetch("/api/remove-item-cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });
      const data = await response.json();

      if (response.ok) {
        setCartLength(data.length || 0);
        setCart(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <section>
      <Button onClick={onOpen}>Discard</Button>
      <AlertDialog
        motionPreset="slideInBottom"
        // @ts-ignore
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Remove product?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to remove this product from your cart?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              // @ts-ignore
              ref={cancelRef}
              onClick={onClose}
            >
              No
            </Button>
            <Button
              onClick={fetchRemoveItem}
              variant="ghost"
              borderRadius="none"
              boxShadow="md"
              mr={2}
              _hover={{
                color: "white",
                bg: "cyan.600",
                borderRadius: "none",
              }}
              _active={{
                bg: "cyan.300",
              }}
            >
              Remove
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default RemoveItemCart;
