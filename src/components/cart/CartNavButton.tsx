import { Badge, Icon } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import GlobalContext from "@/context/GlobalContext";
import { Link } from "@chakra-ui/next-js";
import { LiaShoppingCartSolid } from "react-icons/lia";

const CartNavButton = () => {
  const { cartLength, setCartLength } = useContext(GlobalContext);

  useEffect(() => {
    const fetchCartLength = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/cart/length`
      );
      if (response.ok) {
        const cartLength: number = await response.json();
        return setCartLength(cartLength);
      }
    };
    fetchCartLength();
  }, [setCartLength]);

  return (
    <section about="cart section">
      <Link href="/pages/cart">
        <Icon
          display="flex"
          as={LiaShoppingCartSolid}
          color="brand.gray"
          w={[6, 7, 8]}
          h={[6, 7, 8]}
          _hover={{ color: "brand.cyan2" }}
          transition=".3s"
        />
        <Badge
          position="absolute"
          bg="brand.cyan2"
          color="white"
          borderRadius="full"
          right={"20px"}
          top={["35px", "33px", "30px"]}
          fontSize={["8px", "10px", "12px"]}
        >
          {cartLength}
        </Badge>
      </Link>
    </section>
  );
};

export default CartNavButton;
