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

const CartAllEmpty = () => {
  const { setCart, setCartLength } = useContext(GlobalContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleClearCart = async () => {
    try {
      const res = await fetch("/api/user/cart/clear-all-products", {
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
      <Button
        onClick={onOpen}
        borderRadius={2}
        bg="brand.cyan2"
        color="white"
        _hover={{
          bg: "brand.cyan",
          color: "white",
          borderRadius: 5,
        }}
        variant="ghost"
        // size={["xs", "sm", "md"]}
        p={1}
        h={["20px", "25px", "30px"]}
        fontSize={["10px", "12px", "14px"]}
        fontWeight="normal"
      >
        Clear cart
      </Button>
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
          <AlertDialogFooter gap={2}>
            <Button
              // @ts-ignore
              ref={cancelRef}
              onClick={onClose}
            >
              No
            </Button>
            <Button
              onClick={handleClearCart}
              bg="#DD2626"
              color="white"
              size={["xs", "sm", "md"]}
              fontWeight="normal"
              borderRadius={5}
              _hover={{
                bg: "#BA1B1B",
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

export default CartAllEmpty;
