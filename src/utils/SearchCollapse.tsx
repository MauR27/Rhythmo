import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import SearchBg from "./SearchBg";

const SearchCollapse = () => {
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
  const [hidden, setHidden] = useState(!isOpen);

  return (
    <Flex zIndex={1}>
      <Flex bgColor="white" gap={2} borderRadius="sm" py={2}>
        <motion.input
          {...getDisclosureProps()}
          type="text"
          hidden={hidden}
          initial={false}
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
            <Box
              {...getButtonProps()}
              // zIndex={-1}
              // h="full"
              // bg="blackAlpha.500"
              // position="absolute"
              // opacity=".5"
              // right="0"
              // left="0"
              // mt="-24px"
            >
              <SearchBg />
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default SearchCollapse;
