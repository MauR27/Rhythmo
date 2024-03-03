"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

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
    <Flex>
      <form onSubmit={handleSubmit}>
        {error && <Text> {error}</Text>}
        <FormControl minW="400px" mb={4}>
          <FormLabel>Email Address</FormLabel>
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
            variant="filled"
          />
        </FormControl>
        <Text fontSize="sm">
          <Link href="/pages/forgot-password" color="cyan.600">
            Forgot password?
          </Link>
        </Text>
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
            Login
          </Button>
          <Button onClick={() => signIn("google")}>Sign in with google</Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default SignInRenderForm;