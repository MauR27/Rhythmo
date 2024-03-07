import { FC } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import CartRemoveSingleProduct from "./CartRemoveSingleProduct";
import { CiSearch } from "react-icons/ci";
import CartProductQuantityControl from "./CartProductQuantityControl";
import CartAllEmpty from "./CartAllEmpty";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { Link } from "@chakra-ui/next-js";

type TIsloading = {
  isLoading: boolean;
  cart: any;
};

const CartProductsRender: FC<TIsloading> = ({ isLoading, cart }) => {
  const [isLargerThan580] = useMediaQuery("(min-width: 580px)");
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      {cart.map((product: any) => (
        <Flex key={product._id} borderBottom="1px solid" borderColor="gray.200">
          <Flex flex={1}>
            <Card
              minH="100px"
              overflow="hidden"
              variant="unstyled"
              size="sm"
              direction={isLargerThan580 ? "row" : "column-reverse"}
              gap={2}
            >
              <CardHeader>
                <Image
                  alt={product.name}
                  src={product.images[0]}
                  maxW={["60px", "80px", "100px"]}
                  maxH={["60px", "80px", "100px"]}
                  objectFit="cover"
                />
              </CardHeader>
              <CardBody>
                <Heading fontSize={["8px", "10px", "12px"]} fontWeight="bold">
                  {product.name}
                </Heading>
                <Text
                  fontWeight="normal"
                  mt={2}
                  fontSize={["8px", "10px", "12px"]}
                >
                  {product.brand}
                </Text>
              </CardBody>
            </Card>
          </Flex>
          <Flex flex={1} gap={2}>
            <CartProductQuantityControl cart={product} />
          </Flex>
        </Flex>
      ))}
    </>
  );
};

export default CartProductsRender;
