import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { ICart } from "../../types";

interface IGlobalContext {
  cart: ICart | [];
  setCart: Dispatch<SetStateAction<ICart | []>>;
  cartLength: number;
  setCartLength: Dispatch<SetStateAction<number>>;
  subTotal: number;
  setSubTotal: Dispatch<SetStateAction<number>>;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  itemQuantity: number;
  setItemQuantity: Dispatch<SetStateAction<number>>;
  favoriteListProductsLength: number;
  setFavoriteListProductsLength: Dispatch<SetStateAction<number>>;
  favoriteProductList: ICart | [];
  setFavoriteProductList: Dispatch<SetStateAction<ICart | []>>;
}

const GlobalContext = createContext<IGlobalContext>({
  cart: [],
  setCart: () => {},
  favoriteProductList: [],
  setFavoriteProductList: () => {},
  cartLength: 0,
  setCartLength: () => 0,
  favoriteListProductsLength: 0,
  setFavoriteListProductsLength: () => 0,
  subTotal: 0,
  setSubTotal: () => 0,
  totalPrice: 0,
  setTotalPrice: () => 0,
  itemQuantity: 0,
  setItemQuantity: () => 0,
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider: FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [cart, setCart] = useState<ICart | []>([]);
  const [favoriteProductList, setFavoriteProductList] = useState<ICart | []>(
    []
  );
  const [cartLength, setCartLength] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [itemQuantity, setItemQuantity] = useState<number>(0);
  const [favoriteListProductsLength, setFavoriteListProductsLength] =
    useState<number>(0);

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        cartLength,
        setCartLength,
        setSubTotal,
        subTotal,
        totalPrice,
        setTotalPrice,
        itemQuantity,
        setItemQuantity,
        favoriteListProductsLength,
        setFavoriteListProductsLength,
        favoriteProductList,
        setFavoriteProductList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
