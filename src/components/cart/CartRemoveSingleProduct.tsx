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
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useContext, useRef } from "react";
import { TfiTrash } from "react-icons/tfi";

type TProductId = {
  _id: string;
};

const CartRemoveSingleProduct: FC<TProductId> = ({ _id }) => {
  const { setCartLength, setCart } = useContext(GlobalContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const fetchRemoveItem = async () => {
    try {
      const response = await fetch("/api/user/cart/remove-products", {
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
      <Icon
        onClick={onOpen}
        as={TfiTrash}
        h={[3, 4, 5]}
        w={[3, 4, 5]}
        _hover={{ color: "red", cursor: "pointer" }}
      />
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
          <AlertDialogFooter gap={2}>
            <Button
              borderRadius={5}
              _hover={{
                bg: "brand.cyan2",
                color: "white",
                borderRadius: 5,
              }}
              variant="ghost"
              size={["xs", "sm", "md"]}
              fontWeight="normal"
              // @ts-ignore
              ref={cancelRef}
              onClick={onClose}
            >
              No
            </Button>
            <Button
              onClick={fetchRemoveItem}
              bg="#DD2626"
              color="white"
              size={["xs", "sm", "md"]}
              fontWeight="normal"
              borderRadius={5}
              _hover={{
                bg: "#BA1B1B",
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

export default CartRemoveSingleProduct;
