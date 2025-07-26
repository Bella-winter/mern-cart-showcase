import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard = ({ product, onProductClick, onQuickView }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(
      isInWishlist(product.id) 
        ? `${product.name} removed from wishlist!`
        : `${product.name} added to wishlist!`
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleCardClick = () => {
    onProductClick?.(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-floating hover:scale-105 animate-scale-in"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {discountPercentage > 0 && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            -{discountPercentage}%
          </Badge>
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 hover:bg-background"
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 hover:bg-background"
            onClick={handleQuickView}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-price">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          variant="cart"
          className="w-full"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};