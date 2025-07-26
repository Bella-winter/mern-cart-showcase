import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ecommerce.jpg";

interface HeroProps {
  onShopNow?: () => void;
}

export const Hero = ({ onShopNow }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[600px] py-12">
          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Discover Amazing
                <span className="bg-gradient-primary bg-clip-text text-transparent block">
                  Products
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Shop the latest trends and find everything you need in one place. 
                Quality products, competitive prices, and exceptional service.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="premium" 
                size="lg" 
                className="group"
                onClick={onShopNow}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                View Categories
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden shadow-floating">
              <img
                src={heroImage}
                alt="E-commerce Hero"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-4 shadow-floating animate-bounce">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-success text-success-foreground rounded-full px-4 py-2 shadow-floating">
              <span className="text-sm font-semibold">Free Shipping</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};