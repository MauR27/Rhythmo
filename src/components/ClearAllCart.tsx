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
import React, { useContext, useRef } from "react";

const ClearAllCart = () => {
  const { setCart, setCartLength } = useContext(GlobalContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleClearCart = async () => {
    try {
      const res = await fetch("/api/clear-all-cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setCart(data);
        setCartLength(data.length || 0);
        onClose();
      } else {
        throw new Error("Error to clear all cart");
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };
  return (
    <section>
      <Button onClick={onOpen}>Clear cart</Button>
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
          <AlertDialogHeader>Clear all cart?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to clear all cart?
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
              onClick={handleClearCart}
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
              Clear
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default ClearAllCart;
