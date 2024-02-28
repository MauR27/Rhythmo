"use client";

import { FC, FormEvent, useEffect, useState } from "react";
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
import { IUserSchema } from "@/models/users";

type TParamsResetPasswordToken = {
  token: string;
};

const ResetPassword: FC<TParamsResetPasswordToken> = ({ token }) => {
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [userData, setUserData] = useState(null);

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        });

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
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.get("password"),
          //   @ts-ignore
          email: user,
        }),
      });

      if (res.ok) {
        setError("");
        return router.replace("/");
      } else {
        setError(res.statusText);
        return setError(res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (sessionStatus === "loading" || !verified) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {sessionStatus !== "authenticated" && (
        <Flex align="center" justify="center" h="calc(100vh - 11rem)">
          <Box w="20%">
            <form onSubmit={handleSubmit}>
              {error && <Text> {error}</Text>}
              <FormLabel>Reset password</FormLabel>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="password"
                  placeholder="*********"
                  name="password"
                  variant="filled"
                />
              </FormControl>
              <Flex justify="center">
                <Button
                  type="submit"
                  variant="ghost"
                  //   isDisabled={error.length > 0}
                  borderRadius="none"
                  _hover={{
                    bg: "cyan.600",
                    color: "white",
                    borderRadius: "none",
                  }}
                >
                  Reset password
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default ResetPassword;
