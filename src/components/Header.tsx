import { useState } from "react";
import { ShoppingCart, Search, Menu, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { Product } from "@/types/product";

interface HeaderProps {
  products?: Product[];
  onSearch?: (query: string) => void;
}

export const Header = ({ products = [], onSearch }: HeaderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const { wishlistCount } = useWishlist();

  const handleSearch = (query: string) => {
    onSearch?.(query);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-6">
                  <a href="#" className="text-foreground hover:text-primary transition-colors">
                    Categories
                  </a>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">
                    Deals
                  </a>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">
                    New Arrivals
                  </a>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">
                    Sale
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
            
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ShopHub
            </h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchAutocomplete
              products={products}
              onSearch={handleSearch}
              placeholder="Search products..."
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Categories
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Deals
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              New Arrivals
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {wishlistCount}
                </Badge>
              )}
            </Button>
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {cart.itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
};