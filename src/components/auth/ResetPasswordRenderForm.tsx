"use client";

import { FC, FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { statusError } from "@/utils/errors";
import LoadingSpinner from "@/utils/LoadingSpinner";

type TParamsResetPasswordToken = {
  token: string;
};

const ResetPasswordRenderForm: FC<TParamsResetPasswordToken> = ({ token }) => {
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const toast = useToast();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/password/verify-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
            }),
          }
        );

        if (res.ok) {
          setError("");
          setVerified(true);
          const userData = await res.json();
          setUserData(userData);
        } else {
          setVerified(true);
          return setError(res.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyToken();
  }, [token]);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [router, sessionStatus]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const user: any = userData?.user.email;
    const formData = new FormData(e.currentTarget);

    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/password/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: formData.get("password"),
            //   @ts-ignore
            email: user,
          }),
        }
      );
      const errors = statusError(res.status);
      if (res.ok) {
        setIsLoading(false);
        toast({
          description: errors.message,
          status: errors.status,
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setError("");
        return router.replace("/");
      } else {
        setIsLoading(false);
        setError(errors.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (sessionStatus === "loading" || !verified) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {sessionStatus !== "authenticated" && (
        <Flex align="center" justify="center" h="calc(100vh - 11rem)">
          <Box w="20%">
            <form onSubmit={handleSubmit}>
              <FormLabel>Reset password</FormLabel>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="password"
                  placeholder="*********"
                  name="password"
                  variant="filled"
                />
                {error && (
                  <Text fontSize={["8px", "10px", "12px"]} color="red">
                    {" "}
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
                    borderRadius="5"
                    bg="brand.cyan2"
                    color="white"
                    _hover={{
                      bg: "cyan.600",
                    }}
                  >
                    Reset password
                  </Button>
                )}
              </Flex>
            </form>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default ResetPasswordRenderForm;
