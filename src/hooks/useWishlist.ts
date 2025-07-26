import { useState, useEffect } from "react";
import { Product } from "@/types/product";

const WISHLIST_STORAGE_KEY = "ecommerce-wishlist";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlist(parsedWishlist);
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev; // Already in wishlist
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product: Product) => {
    if (wishlist.some(item => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlist.length,
  };
};