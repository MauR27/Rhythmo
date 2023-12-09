import { Button, Flex, GridItem, Text, useToast } from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import GlobalContext from "@/context/GlobalContext";

interface IAmount {
  cart: {
    brand: string;
    images: string[];
    instrumentType: string;
    name: string;
    price: number;
    productId: string;
    _id: string;
    amount: number;
    itemQuantity: number;
  };
}
const QuantityItem: FC<IAmount> = ({ cart }) => {
  const { setSubTotal, subTotal } = useContext(GlobalContext);
  const valueInitial = cart.itemQuantity;
  const [number, setNumber] = useState<number>(valueInitial);
  const [totalPrice, setTotalPrice] = useState<number>(
    cart.price * valueInitial
  );
  const toast = useToast({
    status: "error",
    description: "Max stock limit",
    isClosable: true,
    position: "top",
    duration: 3000,
  });

  const incrementAmount = async (_id: string) => {
    try {
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
        setTotalPrice((prev) => prev + cart.price);
      } else {
        toast();
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const decrementAmount = async (_id: string) => {
    try {
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
        setTotalPrice((prev) => prev - cart.price);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
  useEffect(() => {
    setSubTotal((prev) => prev + totalPrice);
  }, [setSubTotal, totalPrice]);

  console.log(subTotal);
  // console.log(totalPrice);

  return (
    <>
      <GridItem colSpan={1} alignContent="center">
        <Flex align="center" h="full" justify="center">
          <Text>{cart.price},00$</Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={1} alignContent="center">
        <Flex align="center" h="full" justify="center">
          <Button
            onClick={() => decrementAmount(cart.productId)}
            variant="ghost"
          >
            -
          </Button>
          <Text>{number}</Text>
          <Button
            onClick={() => incrementAmount(cart.productId)}
            variant="ghost"
          >
            +
          </Button>
        </Flex>
      </GridItem>
      <GridItem colSpan={1} alignContent="center">
        <Flex align="center" h="full" justify="center">
          <Text>{totalPrice},00$</Text>
        </Flex>
      </GridItem>
    </>
  );
};

export default QuantityItem;
