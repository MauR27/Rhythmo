import { Badge, Icon, Link } from "@chakra-ui/react";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "@/context/GlobalContext";

const CartNavButton = () => {
  const { cartLength, setCartLength } = useContext(GlobalContext);

  useEffect(() => {
    const fetchCartLength = async () => {
      const response = await fetch("http://localhost:3000/api/get-cart-length");
      const cartLength: number = await response.json();
      console.log(cartLength);

      return setCartLength(cartLength);
    };
    fetchCartLength();
  }, []);

  return (
    <Link display="flex" alignItems="center" href="/cart">
      <Icon
        as={PiShoppingCartSimpleThin}
        w={[6, 7]}
        h={[6, 7]}
        _hover={{ color: "cyan.600" }}
        transition=".3s"
      />
      <Badge
        position="absolute"
        bg="cyan.300"
        borderRadius="full"
        right="5"
        top="5"
      >
        {cartLength}
      </Badge>
    </Link>
  );
};

export default CartNavButton;
