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
      <Box onClick={onOpen} minW="full" minH="full" px={3} py="6px">
        Sign In
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In</ModalHeader>
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
