import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import SearchBg from "./SearchBg";
import { redirect, useRouter } from "next/navigation";
import { ProductsResponse } from "../../types";
// import { useRouter } from "next/router";

type TParamsSearch = {
  params: string;
};

// const fetchInstruments = async (instrument: string) => {
//   const response = await fetch(
//     `http://localhost:3000/api/products/by-search?q=${instrument}`
//   );
//   // await new Promise((resolve) => setTimeout(resolve, 1000));
//   const products: ProductsResponse = await response.json();

//   return products;
// };

const SearchCollapse = () => {
  const { getButtonProps, getDisclosureProps, isOpen, onClose } =
    useDisclosure();
  const [inputText, setInputText] = useState("");
  const [hidden, setHidden] = useState(!isOpen);
  const [refresh, setRefresh] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   setRefresh(true);
  // }, [refresh]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/products/search/${inputText}`);
    return onClose();
  };

  return (
    <Flex zIndex={1}>
      <form onSubmit={handleSubmit}>
        <Flex bgColor="white" gap={2} borderRadius="sm" py={2}>
          <motion.input
            {...getDisclosureProps()}
            type="text"
            hidden={hidden}
            initial={false}
            onChange={(e) => setInputText(e.target.value)}
            onAnimationStart={() => setHidden(false)}
            onAnimationComplete={() => setHidden(!isOpen)}
            animate={{ width: isOpen ? 500 : 0 }}
            style={{
              borderBottom: "1px solid black",
              marginLeft: "10px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              outline: "none",
            }}
          />

          {!isOpen ? (
            <Icon
              {...getButtonProps()}
              as={CiSearch}
              w={[6, 7]}
              h={[6, 7]}
              _hover={{ cursor: "pointer", color: "cyan.600" }}
              transition=".3s"
            />
          ) : (
            <>
              <Icon
                {...getButtonProps()}
                as={RxCross2}
                w={[6, 7]}
                h={[6, 7]}
                _hover={{ cursor: "pointer", color: "cyan.600" }}
                transition=".3s"
              />
              <Box {...getButtonProps()}>
                <SearchBg />
              </Box>
            </>
          )}
        </Flex>
      </form>
    </Flex>
  );
};

export default SearchCollapse;
