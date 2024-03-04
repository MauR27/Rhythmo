import {
  Box,
  Flex,
  Icon,
  useBreakpointValue,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import SearchBackground from "./SearchBackground";
import { useRouter } from "next/navigation";
import { LiaSearchSolid, LiaSearchMinusSolid } from "react-icons/lia";

const SearchCollapse = () => {
  const { getButtonProps, getDisclosureProps, isOpen, onClose } =
    useDisclosure();
  const [inputText, setInputText] = useState<string>("");
  const [hidden, setHidden] = useState(!isOpen);
  const [isLargerThan580] = useMediaQuery("(min-width: 580px)");
  const fontSizeBreakPoints = useBreakpointValue({
    base: "12px",
    sm: "14px",
    md: "16px",
  });
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/pages/products/search/${inputText}`);
    return onClose();
  };
  return (
    <section about="Searching products">
      <form onSubmit={handleSubmit}>
        <Flex
          align={isLargerThan580 ? "center" : "end"}
          flexDir={isLargerThan580 ? "row" : "column-reverse"}
        >
          <motion.div
            style={
              !isLargerThan580
                ? {
                    position: "absolute",
                    top: "70px",
                    right: "70px",
                  }
                : {}
            }
          >
            <motion.input
              {...getDisclosureProps()}
              type="text"
              hidden={hidden}
              initial={false}
              placeholder="Type anything..."
              onChange={(e) => setInputText(e.target.value)}
              onAnimationStart={() => setHidden(false)}
              onAnimationComplete={() => setHidden(!isOpen)}
              animate={{ width: isOpen ? 200 : 0 }}
              autoComplete="off"
              style={{
                borderBottomWidth: "1px",
                paddingLeft: "10px",
                marginLeft: "10px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                outline: "none",
                fontSize: fontSizeBreakPoints,
              }}
            />
          </motion.div>

          {!isOpen ? (
            <Icon
              {...getButtonProps()}
              color="brand.gray"
              as={LiaSearchSolid}
              w={[6, 7, 8]}
              h={[6, 7, 8]}
              _hover={{ cursor: "pointer", color: "brand.cyan2" }}
              transition=".3s"
            />
          ) : (
            <Flex>
              <Icon
                {...getButtonProps()}
                color="blackAlpha.500"
                as={LiaSearchMinusSolid}
                w={[6, 7, 8]}
                h={[6, 7, 8]}
                _hover={{ cursor: "pointer", color: "brand.cyan2" }}
                transition=".3s"
              />
              <Box {...getButtonProps()}>
                <SearchBackground />
              </Box>
            </Flex>
          )}
        </Flex>
      </form>
    </section>
  );
};

export default SearchCollapse;
