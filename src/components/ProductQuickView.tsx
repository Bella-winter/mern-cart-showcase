import { useState } from "react";
import { Star, Heart, ShoppingCart, X, Minus, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductQuickView = ({ product, open, onOpenChange }: ProductQuickViewProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  if (!product) return null;

  // Mock additional images for demonstration
  const productImages = [
    product.image,
    product.image,
    product.image,
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart!`);
    onOpenChange(false);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Product Quick View</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-price">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <Badge variant="destructive">
                      -{discountPercentage}%
                    </Badge>
                  </>
                )}
              </div>
              
              {!product.inStock && (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="cart"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Product Tags */}
            {product.tags && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};