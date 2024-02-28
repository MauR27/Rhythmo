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
import { FC, useContext, useRef } from "react";

interface ICartItem {
  _id: string;
}

const RemoveItemCart: FC<ICartItem> = ({ _id }) => {
  const { setCart, setCartLength } = useContext(GlobalContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const fetchRemoveItem = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/remove-item-cart",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id }),
        }
      );
      const data = await response.json();
      setCart(data?.cart);
      setCartLength(data?.cart?.length || 0);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <>
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
    </>
  );
};

export default RemoveItemCart;
