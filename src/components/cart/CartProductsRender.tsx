import { FC } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import CartRemoveSingleProduct from "./CartRemoveSingleProduct";
import { CiSearch } from "react-icons/ci";
import CartProductQuantityControl from "./CartProductQuantityControl";
import CartAllEmpty from "./CartAllEmpty";

type TIsloading = {
  isLoading: boolean;
  cart: any;
};

const CartProductsRender: FC<TIsloading> = ({ isLoading, cart }) => {
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      {cart.map((product: any) => (
        <Grid
          pl="1em"
          templateColumns="repeat(5, 1fr)"
          key={product._id}
          py={2}
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <GridItem colSpan={2}>
            <Card
              overflow="hidden"
              variant="unstyled"
              size="sm"
              p={2}
              direction="row"
            >
              <Image
                alt={product.images[0]}
                src={product.images[0]}
                maxW="150px"
                maxH="150px"
                objectFit="cover"
              />
              <Stack>
                <CardBody>
                  <Heading as="h1" size="sm" fontWeight="semibold">
                    {product.name}
                  </Heading>
                  <Text fontWeight="normal" mt={2}>
                    {product.brand}
                  </Text>
                </CardBody>
                <CardFooter>
                  <CartRemoveSingleProduct _id={product._id} />
                  <Tooltip
                    hasArrow
                    label="Full view"
                    bg="white"
                    color="black"
                    fontSize="xs"
                  >
                    <Button
                      as={Link}
                      href={`/instrument/${product.productId}`}
                      borderRadius="none"
                      bg="white"
                      p={0}
                      m={0}
                      boxShadow="md"
                      _hover={{
                        bg: "cyan.600",
                        ".searchIcon": {
                          color: "white",
                        },
                      }}
                      _active={{
                        bg: "cyan.300",
                      }}
                    >
                      <Icon
                        as={CiSearch}
                        w={[6, 7]}
                        h={[6, 7]}
                        color="black"
                        className="searchIcon"
                      />
                    </Button>
                  </Tooltip>
                </CardFooter>
              </Stack>
            </Card>
          </GridItem>
          <CartProductQuantityControl cart={product} />
        </Grid>
      ))}
      <Box>
        <CartAllEmpty />
      </Box>
    </>
  );
};

export default CartProductsRender;
