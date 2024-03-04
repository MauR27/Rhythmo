import { Box, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import SearchBackground from "./SearchBackground";
import { useRouter } from "next/navigation";

const SearchCollapse = () => {
  const { getButtonProps, getDisclosureProps, isOpen, onClose } =
    useDisclosure();
  const [inputText, setInputText] = useState<string>("");
  const [hidden, setHidden] = useState(!isOpen);

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/pages/products/search/${inputText}`);
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
              _hover={{ cursor: "pointer", color: "brand.orange" }}
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
                <SearchBackground />
              </Box>
            </>
          )}
        </Flex>
      </form>
    </Flex>
  );
};

export default SearchCollapse;
