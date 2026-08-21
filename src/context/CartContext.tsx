"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: number;
  productId: string;
  quantity: number;
  size: string;
  color: string;
  name: string;
  price: string;
  image: string;
  originalPrice: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  loading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number, size: string, color: string, productDetails?: { name: string; price: string; image: string; originalPrice: string }) => Promise<boolean>;
  updateQty: (productId: string, quantity: number, size: string, color: string, action?: string) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshCart = async () => {
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        setCartItems(data);
      }
    } catch (e) {
      console.error("Failed to load cart items:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (
    productId: string, 
    quantity: number, 
    size: string, 
    color: string,
    productDetails?: { name: string; price: string; image: string; originalPrice: string }
  ): Promise<boolean> => {
    // Optimistic Update
    const tempId = Date.now();
    if (productDetails) {
      setCartItems(prevItems => {
        const existingIdx = prevItems.findIndex(
          item => item.productId === productId && item.size === size && item.color === color
        );
        if (existingIdx > -1) {
          return prevItems.map((item, idx) => 
            idx === existingIdx ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          return [
            ...prevItems,
            {
              id: tempId,
              productId,
              quantity,
              size,
              color,
              name: productDetails.name,
              price: productDetails.price,
              image: productDetails.image,
              originalPrice: productDetails.originalPrice
            }
          ];
        }
      });
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity, size, color })
      });
      if (res.ok) {
        refreshCart();
        return true;
      }
      if (productDetails) refreshCart(); // sync/revert on server error
      return false;
    } catch (e) {
      console.error("Failed to add item to cart:", e);
      if (productDetails) refreshCart(); // sync/revert on network failure
      return false;
    }
  };

  const updateQty = async (productId: string, quantity: number, size: string, color: string, action?: string) => {
    // Optimistically update quantity
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.productId === productId && item.size === size && item.color === color) {
          const newQty = action === "increment" 
            ? item.quantity + 1 
            : Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity, size, color, action })
      });
      refreshCart();
    } catch (e) {
      console.error("Failed to update cart quantity:", e);
      refreshCart(); // Revert on failure
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    // Optimistically remove item
    setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));

    try {
      await fetch(`/api/cart?cartItemId=${cartItemId}`, {
        method: "DELETE"
      });
      refreshCart();
    } catch (e) {
      console.error("Failed to delete cart item:", e);
      refreshCart(); // Revert on failure
    }
  };

  const clearCart = async () => {
    try {
      await fetch("/api/cart?clearAll=true", {
        method: "DELETE"
      });
      setCartItems([]);
    } catch (e) {
      console.error("Failed to clear cart:", e);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      loading,
      refreshCart,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
