"use client";

import { SessionProvider } from "next-auth/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { GlobalContextProvider } from "@/context/GlobalContext";

interface Props {
  children: React.ReactNode;
}

const breakpoints = {
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};
const theme = extendTheme({ breakpoints });

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
};

export default Providers;
