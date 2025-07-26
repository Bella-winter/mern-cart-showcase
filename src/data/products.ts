import { Product } from "@/types/product";

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.5,
    reviews: 1247,
    inStock: true,
    tags: ["wireless", "bluetooth", "noise-cancellation"]
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your health and fitness with this advanced smartwatch featuring heart rate monitoring.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.2,
    reviews: 856,
    inStock: true,
    tags: ["fitness", "smartwatch", "health"]
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt in various colors and sizes.",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Clothing",
    rating: 4.8,
    reviews: 2103,
    inStock: true,
    tags: ["organic", "cotton", "sustainable"]
  },
  {
    id: "4",
    name: "Professional Camera Lens",
    description: "High-quality 50mm lens perfect for portrait and street photography.",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.9,
    reviews: 412,
    inStock: false,
    tags: ["camera", "lens", "photography"]
  },
  {
    id: "5",
    name: "Leather Crossbody Bag",
    description: "Stylish and durable genuine leather crossbody bag perfect for everyday use.",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accessories",
    rating: 4.6,
    reviews: 743,
    inStock: true,
    tags: ["leather", "bag", "crossbody"]
  },
  {
    id: "6",
    name: "Artisan Coffee Beans",
    description: "Premium single-origin coffee beans roasted to perfection for the ultimate coffee experience.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
    category: "Food & Beverage",
    rating: 4.7,
    reviews: 1567,
    inStock: true,
    tags: ["coffee", "artisan", "premium"]
  },
  {
    id: "7",
    name: "Minimalist Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness and USB charging port.",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    category: "Home & Office",
    rating: 4.4,
    reviews: 623,
    inStock: true,
    tags: ["lamp", "led", "desk", "minimalist"]
  },
  {
    id: "8",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.3,
    reviews: 934,
    inStock: true,
    tags: ["wireless", "charging", "qi"]
  }
];