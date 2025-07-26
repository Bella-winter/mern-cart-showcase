import { useState, useEffect } from "react";
import { Product } from "@/types/product";

const RECENTLY_VIEWED_KEY = "ecommerce-recently-viewed";
const MAX_RECENTLY_VIEWED = 10;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Load recently viewed from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRecentlyViewed(parsed);
      } catch (error) {
        console.error("Error loading recently viewed from localStorage:", error);
      }
    }
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.id !== product.id);
      // Add to beginning and limit to MAX_RECENTLY_VIEWED
      return [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  };
};