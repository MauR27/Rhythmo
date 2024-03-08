"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

const SignUpRenderForm = () => {
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleSubmir = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      return setPasswordError("Password do not match");
    }
    setPasswordError("");

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
    <Flex align="center" justify="center" minH="calc(100vh - 14rem)">
      <Flex
        flexDir="column"
        _hover={{ boxShadow: "md" }}
        p={5}
        borderRadius={5}
        w="500px"
      >
        <form onSubmit={handleSubmir}>
          <Text
            textAlign="center"
            fontSize={["18px", "20px", "24px"]}
            fontWeight="semibold"
            color="cyan.600"
            mb="20px"
          >
            Sign Up
          </Text>

          <FormControl mb={4}>
            <FormLabel fontSize={["12px", "14px", "16px"]}>Full Name</FormLabel>
            <Input
              size={["xs", "sm", "md"]}
              type="text"
              placeholder="Monica Geller"
              name="name"
              variant="flushed"
            />
            {error && (
              <Text color="red" fontSize={["8px", "10px", "12px"]}>
                {error}
              </Text>
            )}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize={["12px", "14px", "16px"]}>
              Email address
            </FormLabel>
            <Input
              size={["xs", "sm", "md"]}
              type="email"
              placeholder="MonicaGeller@gmail.com"
              name="email"
              variant="flushed"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize={["12px", "14px", "16px"]}>Password</FormLabel>
            <Input
              size={["xs", "sm", "md"]}
              type="password"
              placeholder="********"
              name="password"
              variant="outline"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize={["12px", "14px", "16px"]}>
              Confirm password
            </FormLabel>
            <Input
              size={["xs", "sm", "md"]}
              type="password"
              placeholder="********"
              name="confirmPassword"
              variant="filled"
            />
            {passwordError && (
              <Text color="red" fontSize={["8px", "10px", "12px"]}>
                {passwordError}
              </Text>
            )}
          </FormControl>
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
                Sign up
              </Button>
            </Flex>
            <Flex align="center" justify="center" fontWeight="bold">
              <Text fontSize={["10px", "12px", "14px"]}>Or</Text>
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
      </Flex>
    </Flex>
  );
};

export default SignUpRenderForm;
