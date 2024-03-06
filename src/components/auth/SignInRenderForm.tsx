"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

import {
  Button,
  Divider,
  Flex,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { FcGoogle } from "react-icons/fc";

const SignInRenderForm = () => {
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) return setError(res.error as string);

    if (res?.ok) {
      window.location.replace("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDir="column" mb={5}>
        <FormControl mb={4}>
          <Input
            size={["xs", "sm", "md"]}
            type="email"
            placeholder="MonicaGeller@gmail.com"
            name="email"
            variant="flushed"
          />
        </FormControl>

        <FormControl mb={4}>
          <Input
            size={["xs", "sm", "md"]}
            type="password"
            placeholder="Password"
            name="password"
            variant="flushed"
          />
          {error && (
            <Text fontSize={["8px", "10px", "12px"]} color="red">
              {error}
            </Text>
          )}
        </FormControl>
        <Text fontSize={["10px", "12px", "14px"]}>
          <Link href="/pages/forgot-password" color="cyan.600">
            Did you forget your password?
          </Link>
        </Text>
      </Flex>
      <Flex flexDir="column" gap={2}>
        <Flex justify="center" align="center" flexDir="column">
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
            Sign in
          </Button>
        </Flex>
        <Flex align="center" justify="space-between" fontWeight="bold">
          <Divider w="180px" />
          <Text fontSize={["10px", "12px", "14px"]}>Or</Text>
          <Divider w="180px" />
        </Flex>
        <Flex justify="center" align="center" flexDir="column">
          <Button
            type="submit"
            variant="ghost"
            size={["xs", "sm", "md"]}
            leftIcon={<FcGoogle />}
            borderRadius={5}
            fontWeight="normal"
            _hover={{
              bg: "gray.200",
              borderRadius: 5,
            }}
            onClick={() => signIn("google")}
          >
            Sign in with google
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default SignInRenderForm;
