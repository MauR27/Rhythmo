"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Link } from "@chakra-ui/next-js";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [router, sessionStatus]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
        }),
      });

      if (res.ok) {
        setError("");
        return router.replace("/");
      } else {
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
      {sessionStatus !== "authenticated" && (
        <Flex align="center" justify="center" h="calc(100vh - 11rem)">
          <Box w="20%">
            <form onSubmit={handleSubmit}>
              {error && <Text> {error}</Text>}
              <FormLabel>Forgot password</FormLabel>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="jenniferAninston123@gmail.com"
                  name="email"
                  variant="filled"
                />
              </FormControl>
              <Flex justify="center">
                <Button
                  type="submit"
                  variant="ghost"
                  borderRadius="none"
                  _hover={{
                    bg: "cyan.600",
                    color: "white",
                    borderRadius: "none",
                  }}
                >
                  Submit
                </Button>
                <Text>{error && error}</Text>
                <Text fontSize="sm">
                  <Link href="/" color="cyan.600">
                    Login here!
                  </Link>
                </Text>
              </Flex>
            </form>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default ForgotPassword;
