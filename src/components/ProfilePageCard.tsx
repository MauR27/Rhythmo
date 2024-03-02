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
import { useFormik, useFormikContext } from "formik";
import { useSession, signOut, getProviders } from "next-auth/react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

// const profileSchema = Yup.object().shape({
//   name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
//   email: Yup.string().email("Invalid email"),
// });

const ProfilePageCard = () => {
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
        const fetchProfile = await fetch("/api/profile", {
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
    <Box>
      {
        // @ts-ignore
        user?.provider === "google" ? (
          <form onSubmit={formik.handleSubmit}>
            <FormControl minW="400px" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                variant="flushed"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Text fontSize="sm">
                After change the Email you have to Sign in Again for you
                security
              </Text>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="MonicaGeller@gmail.com"
                onChange={formik.handleChange}
                value={formik.values.email}
                variant="filled"
              />
            </FormControl>

            <Flex justify="center">
              <>
                <Button
                  isDisabled
                  type="submit"
                  variant="ghost"
                  borderRadius="none"
                  _hover={{
                    bg: "cyan.600",
                    color: "white",
                    borderRadius: "none",
                  }}
                >
                  Update
                </Button>
              </>
            </Flex>
          </form>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl minW="400px" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                variant="flushed"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Text fontSize="sm">
                After change the Email you have to Sign in Again for you
                security
              </Text>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="MonicaGeller@gmail.com"
                onChange={formik.handleChange}
                value={formik.values.email}
                variant="filled"
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
                      borderRadius="none"
                      _hover={{
                        bg: "cyan.600",
                        color: "white",
                        borderRadius: "none",
                      }}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      isDisabled
                      type="submit"
                      variant="ghost"
                      borderRadius="none"
                      _hover={{
                        bg: "cyan.600",
                        color: "white",
                        borderRadius: "none",
                      }}
                    >
                      Update
                    </Button>
                  )}
                </>
              )}
            </Flex>
          </form>
        )
      }
    </Box>
  );
};

export default ProfilePageCard;
