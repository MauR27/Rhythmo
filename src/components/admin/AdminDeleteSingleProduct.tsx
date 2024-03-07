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
  Flex,
  Icon,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TfiTrash } from "react-icons/tfi";

type TProductId = {
  _id: string;
  stripe_product_id: string;
};

const AdminDeleteSingleProduct: FC<TProductId> = ({
  _id,
  stripe_product_id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoadin, setIsLoading] = useState(false);

  const cancelRef = useRef();
  const router = useRouter();
  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true);
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
        setIsLoading(false);
        onClose();
        router.refresh();
      } else {
        setIsLoading(false);
        throw new Error("Error to DELETE this product");
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return (
    <section>
      <Tooltip
        placement="top"
        label="Delete"
        bg="white"
        color="black"
        gutter={0}
        fontSize="xs"
      >
        <Flex
          align="center"
          justify="center"
          onClick={onOpen}
          borderRadius={10}
          color="gray.500"
          _hover={{
            color: "red",
          }}
        >
          <Icon as={TfiTrash} w={[3, 4, 5]} h={[3, 4, 5]} />
        </Flex>
      </Tooltip>

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
          <AlertDialogFooter gap={2}>
            <Button
              // @ts-ignore
              ref={cancelRef}
              onClick={onClose}
            >
              No
            </Button>
            {isLoadin ? (
              <Spinner />
            ) : (
              <Button
                onClick={handleDeleteProduct}
                borderRadius={3}
                bg="#D11818"
                color="white"
                fontWeight="normal"
                _hover={{
                  color: "white",
                  bg: "#AB1515",
                }}
              >
                Delete
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default AdminDeleteSingleProduct;
