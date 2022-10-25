import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  cartItems: CartItem[];
  cartQuantity: number;
  closeCart: () => void;
  decreaseItemQuantity: (id: number) => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  openCart: () => void;
  removeFromCart: (id: number) => void;
};

type ShoppingCartProviderProps = {
  children: ReactNode;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children
}: ShoppingCartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseItemQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null)
        return [...currItems, { id, quantity: 1 }];

      return currItems.map((item) => {
        if (item.id === id) return { ...item, quantity: item.quantity + 1 };
        return item;
      });
    });
  };

  const decreaseItemQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1)
        return currItems.filter((item) => item.id !== id);
      else
        return currItems.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity - 1 };
          return item;
        });
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        closeCart,
        decreaseItemQuantity,
        getItemQuantity,
        increaseItemQuantity,
        openCart,
        removeFromCart
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};
