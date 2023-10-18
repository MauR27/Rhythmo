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
  setCart: Dispatch<SetStateAction<ICart | []>>;
  cart: ICart | [];
  cartLength: number;
  setCartLength: Dispatch<SetStateAction<number>>;
}

const GlobalContext = createContext<IGlobalContext>({
  cart: [],
  setCart: () => {},
  cartLength: 0,
  setCartLength: () => 0,
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider: FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [cart, setCart] = useState<ICart | []>([]);
  const [cartLength, setCartLength] = useState<number>(0);

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        cartLength,
        setCartLength,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
