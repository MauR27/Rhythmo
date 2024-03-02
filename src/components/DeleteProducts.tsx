"use client";

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
import { FC, useRef } from "react";
import { useRouter } from "next/navigation";

type TProductId = {
  _id: string;
  stripe_product_id: string;
};

const DeleteProducts: FC<TProductId> = ({ _id, stripe_product_id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef();
  const router = useRouter();
  const handleDeleteProduct = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/admin/delete-products",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            stripe_product_id,
          }),
        }
      );
      if (res.ok) {
        router.refresh();
      } else {
        throw new Error("Error to DELETE this product");
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return (
    <section>
      <Button onClick={onOpen}>Delete</Button>
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
          <AlertDialogHeader>Delete product?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this product? It will be delete for
            ever
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
              onClick={handleDeleteProduct}
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
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default DeleteProducts;
