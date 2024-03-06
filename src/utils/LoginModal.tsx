"use client";

import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import SignInRenderForm from "@/components/auth/SignInRenderForm";

const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        onClick={onOpen}
        minW="full"
        minH="full"
        px={3}
        py="6px"
        fontSize={["12px", "14px", "16px"]}
      >
        Sign In
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={["xs", "sm", "md"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={["14px", "16px", "18px"]}>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SignInRenderForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
