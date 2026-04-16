import React, { createContext, useContext, useState } from 'react';

const TryOnContext = createContext();

export const useTryOn = () => {
  return useContext(TryOnContext);
};

export const TryOnProvider = ({ children }) => {
  const [selectedGarments, setSelectedGarments] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addGarment = (garment) => {
    setSelectedGarments((prev) => {
      // Avoid duplicates
      if (prev.find(item => item.id === garment.id)) {
        return prev;
      }
      // Maximum 2 garments (e.g. top and bottom) for this demo
      if (prev.length >= 2) {
        return [prev[1], garment]; 
      }
      return [...prev, garment];
    });
  };

  const removeGarment = (garmentId) => {
    setSelectedGarments((prev) => prev.filter(item => item.id !== garmentId));
  };
  
  const clearGarments = () => {
    setSelectedGarments([]);
  };

  const addToCart = (item) => {
    setCartItems((prev) => {
      const itemKey = `${item.id}__${item.size || 'NA'}__${item.color || 'NA'}`;
      const existing = prev.find(
        (cartItem) =>
          cartItem.itemKey === itemKey
      );

      if (existing) {
        return prev.map((cartItem) =>
          cartItem.itemKey === itemKey
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, itemKey, quantity: 1 }];
    });
  };

  const updateCartQuantity = (itemKey, nextQuantity) => {
    if (nextQuantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.itemKey !== itemKey));
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.itemKey === itemKey ? { ...item, quantity: nextQuantity } : item))
    );
  };

  const removeFromCart = (itemKey) => {
    setCartItems((prev) => prev.filter((item) => item.itemKey !== itemKey));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <TryOnContext.Provider
      value={{
        selectedGarments,
        addGarment,
        removeGarment,
        clearGarments,
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </TryOnContext.Provider>
  );
};
