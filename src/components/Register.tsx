"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleSubmir = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      return toast({
        status: "error",
        description: "Password do not match",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const data = await res.json();

      await signIn("credentials", {
        email: data.email,
        password: formData.get("password"),
        redirect: false,
      });
      if (res.ok) {
        return router.push("/");
      } else {
        return setError(res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      minH="calc(100vh - 11rem)"
      justify="center"
      align="center"
      flexDir="column"
    >
      <Box>
        <Text
          textAlign="center"
          fontSize="2em"
          fontWeight="semibold"
          color="cyan.600"
        >
          Sign Up
        </Text>
      </Box>
      <Flex bg="white" p={10} maxW="600px" borderRadius="md" boxShadow="lg">
        <form onSubmit={handleSubmir}>
          {error && <Text> {error}</Text>}
          <FormControl minW="400px" mb={4}>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              placeholder="Monica Geller"
              name="name"
              variant="flushed"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="MonicaGeller@gmail.com"
              name="email"
              variant="flushed"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="********"
              name="password"
              variant="outline"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Repeat Password</FormLabel>
            <Input
              type="password"
              placeholder="********"
              name="confirmPassword"
              variant="filled"
            />
          </FormControl>
          <Flex align="center">
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
              Sign Up
            </Button>
            <Text fontSize="sm">
              Do you already have an account? then{" "}
              <Link href="/" color="cyan.600">
                Login
              </Link>{" "}
              now!
            </Text>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Register;
