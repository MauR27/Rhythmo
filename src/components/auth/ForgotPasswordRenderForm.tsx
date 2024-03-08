"use client";

import { FC, FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import SignInRenderForm from "./SignInRenderForm";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";

type TOnClose = {
  onClose: any;
};

const ForgotPasswordRenderForm: FC<TOnClose> = ({ onClose }) => {
  const [error, setError] = useState("");
  const [forgotPasswordRender, setForgotPasswordRender] = useState(false);

  const { status: sessionStatus } = useSession();
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [router, sessionStatus]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/password/forgot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.get("email"),
          }),
        }
      );

      if (res.ok) {
        setError("");
        toast({
          description: "Email was sent, check your inbox!",
          duration: 3000,
          isClosable: true,
          status: "success",
          position: "top",
        });
        setIsLoading(false);
        onClose();
      } else {
        setIsLoading(false);
        return setError(res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {forgotPasswordRender ? (
        <SignInRenderForm onClose={onClose} />
      ) : (
        <>
          <Flex textAlign="center">
            <motion.div
              onClick={() => setForgotPasswordRender(true)}
              initial={{ x: "-10px", opacity: 1 }}
              animate={{ x: "0%", opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Icon
                color="gray"
                _hover={{
                  color: "brand.cyan2",
                  cursor: "pointer",
                }}
                as={IoIosArrowBack}
                onClick={() => setForgotPasswordRender(true)}
                w={[5, 6, 7]}
                h={[5, 6, 7]}
              />
            </motion.div>
            <Text fontSize={["14px", "16px", "18px"]} mb={2} fontWeight="bold">
              Forgot password
            </Text>
          </Flex>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel fontSize={["10px", "12px", "14px"]} color="gray">
                Enter the email address associated with your account and we will
                send you a link to reset your password.
              </FormLabel>
              <Input
                type="email"
                placeholder="jenniferAninston123@gmail.com"
                name="email"
                variant="flushed"
                size={["xs", "sm", "md"]}
              />
              {error && (
                <Text fontSize={["8px", "10px", "12px"]} color="red">
                  {error}
                </Text>
              )}
            </FormControl>
            <Flex justify="center">
              {isLoading ? (
                <Spinner />
              ) : (
                <Button
                  type="submit"
                  variant="ghost"
                  size={["xs", "sm", "md"]}
                  fontWeight="normal"
                  borderRadius={5}
                  _hover={{
                    bg: "brand.cyan2",
                    color: "white",
                    borderRadius: 5,
                  }}
                >
                  Submit
                </Button>
              )}
            </Flex>
          </form>
        </>
      )}
    </>
  );
};

export default ForgotPasswordRenderForm;
