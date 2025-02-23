import { useState } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartCount(cartCount + 1);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    setCartCount(cartCount - 1);
  };

  return { cart, cartCount, addToCart, removeFromCart };
} 