import {
  Box,
  Button,
  Flex,
  GridItem,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
import ButtonCheckout from "./ButtonCheckout";

interface IAmount {
  cart: {
    brand: string;
    images: string[];
    instrumentType: string;
    name: string;
    price: string;
    productId: string;
    _id: string;
    amount: number;
    itemQuantity: number;
  };
}

const QuantityItem: FC<IAmount> = ({ cart }) => {
  const { setSubTotal, setTotalPrice } = useContext(GlobalContext);
  const valueInitial = cart.itemQuantity;
  const [number, setNumber] = useState<number>(valueInitial);
  const [quantityItemPrice, setQuantityItemPrice] = useState<number>(
    Number(cart.price) * valueInitial
  );
  const [addIsLoading, setAddIsloading] = useState(false);
  const [restIsLoading, setRestIsloading] = useState(false);

  const toast = useToast({
    status: "error",
    description: "Max stock limit",
    isClosable: true,
    position: "top",
    duration: 3000,
  });

  useEffect(() => {
    setSubTotal((prev) => prev + quantityItemPrice);
    setTotalPrice(quantityItemPrice);
  }, [setSubTotal, quantityItemPrice, setTotalPrice]);

  const incrementAmount = async (_id: string) => {
    try {
      setAddIsloading(true);
      if (number < cart.amount) {
        const action: string = "add";
        await fetch("http://localhost:3000/api/item-quantity", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id, action }),
        });

        setNumber((prev) => prev + 1);
        setQuantityItemPrice((prev) => prev + Number(cart.price));
      } else {
        toast();
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      setAddIsloading(false);
    }
  };

  const decrementAmount = async (_id: string) => {
    try {
      setRestIsloading(true);
      if (number > 1) {
        const action: string = "sub";
        await fetch("http://localhost:3000/api/item-quantity", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id, action }),
        });

        setNumber((prev) => prev - 1);
        setQuantityItemPrice((prev) => prev - Number(cart.price));
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      setRestIsloading(false);
    }
  };

  return (
    <>
      <GridItem colSpan={1} alignContent="center">
        <Flex align="center" h="full" justify="center">
          <Text>{cart.price}$</Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={1} alignContent="center">
        <Flex align="center" h="full" justify="center">
          {restIsLoading ? (
            <Button
              isDisabled
              onClick={() => decrementAmount(cart.productId)}
              variant="ghost"
            >
              <Spinner size="xs" />
            </Button>
          ) : (
            <Button
              onClick={() => decrementAmount(cart.productId)}
              variant="ghost"
            >
              -
            </Button>
          )}

          <Text>{number}</Text>
          {addIsLoading ? (
            <Button
              isDisabled
              onClick={() => incrementAmount(cart.productId)}
              variant="ghost"
            >
              <Spinner size="xs" />
            </Button>
          ) : (
            <Button
              onClick={() => incrementAmount(cart.productId)}
              variant="ghost"
            >
              +
            </Button>
          )}
        </Flex>
      </GridItem>
      <GridItem colSpan={1} alignContent="center">
        <Flex align="center" h="full" justify="center">
          <Text>{quantityItemPrice},00$</Text>
        </Flex>
      </GridItem>
    </>
  );
};

export default QuantityItem;