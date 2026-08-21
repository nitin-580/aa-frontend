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
  addToCart: (productId: string, quantity: number, size: string, color: string) => Promise<boolean>;
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

  const addToCart = async (productId: string, quantity: number, size: string, color: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity, size, color })
      });
      if (res.ok) {
        await refreshCart();
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed to add item to cart:", e);
      return false;
    }
  };

  const updateQty = async (productId: string, quantity: number, size: string, color: string, action?: string) => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity, size, color, action })
      });
      await refreshCart();
    } catch (e) {
      console.error("Failed to update cart quantity:", e);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    try {
      await fetch(`/api/cart?cartItemId=${cartItemId}`, {
        method: "DELETE"
      });
      await refreshCart();
    } catch (e) {
      console.error("Failed to delete cart item:", e);
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
