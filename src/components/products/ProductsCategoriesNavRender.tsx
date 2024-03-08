import { Link } from "@chakra-ui/next-js";
import { Flex, List, ListItem, useMediaQuery } from "@chakra-ui/react";
import DrawerButton from "@/utils/DrawerButton";
import { useState } from "react";

export const instrumentTypes = [
  { name: "All Products", path: "all" },
  { name: "Electric Guitars", path: "electric-guitars" },
  { name: "Electric Bass", path: "electric-bass" },
  { name: "Electric Drums", path: "electric-drums" },
  { name: "Acoustic Drums", path: "acoustic-drums" },
];
const ProductsCategoriesNavRender = () => {
  const [isLargerThan580] = useMediaQuery("(max-width: 580px)");
  const [onClickFocus, setOnClickFocus] = useState("");

  return (
    <>
      <Flex justify={!isLargerThan580 ? "center" : "start"} py={2} px={4}>
        {!isLargerThan580 ? (
          <List
            as={Flex}
            gap={[0, 5, 10]}
            fontSize={["10px", "12px", "16px"]}
            fontWeight="normal"
            whiteSpace="nowrap"
          >
            {instrumentTypes.map((type, index) => (
              <ListItem key={index}>
                <Link
                  pb={6}
                  px={2}
                  onClick={() => setOnClickFocus(type.name)}
                  href={`/pages/products/${type.path}`}
                  boxShadow={
                    onClickFocus === type.name
                      ? "0px 15px 10px -10px  rgba(59, 153, 187, 0.5)"
                      : "none"
                  }
                  color={onClickFocus === type.name ? "brand.cyan2" : "black"}
                  _hover={{
                    color: "brand.cyan2",
                    bg: "none",
                    borderRadius: "5px",
                    boxShadow: "0px 23px 15px -10px  rgba(59, 153, 187, 0.5)",
                  }}
                >
                  {type.name}
                </Link>
              </ListItem>
            ))}
          </List>
        ) : (
          <DrawerButton />
        )}
      </Flex>
    </>
  );
};

export default ProductsCategoriesNavRender;
