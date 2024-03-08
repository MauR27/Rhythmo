import { Flex, Icon, Spinner, Text, useToast } from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
import CartRemoveSingleProduct from "./CartRemoveSingleProduct";
import { TfiPlus } from "react-icons/tfi";
import { TfiMinus } from "react-icons/tfi";

type TProductsCart = {
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
};

const CartProductQuantityControl: FC<TProductsCart> = ({ cart }) => {
  const { setSubTotal, setTotalPrice, setCart } = useContext(GlobalContext);
  const valueInitial = cart.itemQuantity;
  const [number, setNumber] = useState<number>(valueInitial);
  const cartPriceReplace = Number(cart.price.replace(/[,]/g, ""));
  const [quantityItemPrice, setQuantityItemPrice] = useState<number>(
    cartPriceReplace * valueInitial
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
        await fetch(
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/cart/products-quantity`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id, action }),
          }
        );
        setNumber((prev) => prev + 1);
        setQuantityItemPrice((prev) => prev + cartPriceReplace);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/cart/get-products`
        );
        if (res.ok) {
          const data = await res.json();
          setCart(data);
        }
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
        await fetch(
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/cart/products-quantity`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id, action }),
          }
        );

        setNumber((prev) => prev - 1);
        setQuantityItemPrice((prev) => prev - cartPriceReplace);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/cart/get-products`
        );
        if (res.ok) {
          const data = await res.json();
          setCart(data);
        }
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
      <Flex
        align="center"
        justify="center"
        flex={1}
        fontSize={["10px", "12px", "14px"]}
      >
        <Text>{cart.price}$</Text>
      </Flex>
      <Flex flex={1} justify="center" fontSize={["10px", "12px", "14px"]}>
        <Flex align="center" gap={2}>
          {restIsLoading ? (
            <Spinner size="sm" color="gray" />
          ) : (
            <Icon
              w={[2, 3, 4]}
              h={[2, 3, 4]}
              _hover={{ color: "red", cursor: "pointer" }}
              as={TfiMinus}
              onClick={() => decrementAmount(cart.productId)}
            />
          )}

          <Text>{number}</Text>
          {addIsLoading ? (
            <Spinner size="sm" color="gray" />
          ) : (
            <Icon
              w={[2, 3, 4]}
              h={[2, 3, 4]}
              _hover={{ color: "green", cursor: "pointer" }}
              as={TfiPlus}
              onClick={() => incrementAmount(cart.productId)}
            />
          )}
        </Flex>
      </Flex>
      <Flex alignContent="center" flex={1} justify="center">
        <Flex align="center" fontSize={["10px", "12px", "14px"]}>
          <Text>{quantityItemPrice.toLocaleString("en-US")}.00$</Text>
        </Flex>
      </Flex>
      <Flex flex={1} justify="center" align="center">
        <CartRemoveSingleProduct _id={cart._id} />
      </Flex>
    </>
  );
};

export default CartProductQuantityControl;
