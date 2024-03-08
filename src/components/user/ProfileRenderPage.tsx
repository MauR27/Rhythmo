"use client";

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
import { useFormik } from "formik";
import { useSession, signOut } from "next-auth/react";
import React, { useState } from "react";

const ProfileRenderPage = () => {
  const { data: session, update } = useSession();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const user = session?.user;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const fetchProfile = await fetch("/api/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            name: values.name,
            emailVerification: user?.email,
          }),
        });

        await fetchProfile.json();

        if (fetchProfile?.ok) {
          if (formik.values.email) {
            if (user?.email !== formik.values.email) {
              signOut();
            }
          }
          resetForm({
            values: {
              name: "",
              email: "",
            },
          });
          toast({
            status: "success",
            description: "Profile Updated",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        } else {
          return toast({
            status: "error",
            description: fetchProfile.statusText,
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Flex minH="100vh" justify="center" m="20px 10px 0 10px">
      <form onSubmit={formik.handleSubmit} style={{ width: "500px" }}>
        <FormControl mb={4}>
          <FormLabel fontSize={["12px", "14px", "16px"]} color="gray.400">
            Name
          </FormLabel>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            variant="flushed"
            size={["xs", "sm", "md"]}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel fontSize={["12px", "14px", "16px"]} color="gray.400">
            Email
          </FormLabel>
          <Text fontSize={["8px", "10px", "12px"]} color="gray.400">
            After changing the e-mail address you will be logged out for your
            security.
          </Text>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="MonicaGeller@gmail.com"
            onChange={formik.handleChange}
            value={formik.values.email}
            variant="filled"
            size={["xs", "sm", "md"]}
          />
        </FormControl>

        <Flex justify="center">
          {loading ? (
            <Spinner />
          ) : (
            <>
              {formik.values.name || formik.values.email ? (
                <Button
                  type="submit"
                  variant="ghost"
                  borderRadius={5}
                  _hover={{
                    bg: "brand.cyan2",
                    color: "white",
                  }}
                  size={["xs", "sm", "md"]}
                >
                  Update
                </Button>
              ) : (
                <Button
                  isDisabled
                  type="submit"
                  variant="ghost"
                  borderRadius={5}
                  _hover={{
                    bg: "brand.cyan2",
                    color: "white",
                  }}
                  size={["xs", "sm", "md"]}
                >
                  Update
                </Button>
              )}
            </>
          )}
        </Flex>
      </form>
    </Flex>
  );
};

export default ProfileRenderPage;
