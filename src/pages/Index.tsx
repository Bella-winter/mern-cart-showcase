import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductQuickView } from "@/components/ProductQuickView";
import { sampleProducts } from "@/data/products";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { Product } from "@/types/product";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const { addToRecentlyViewed } = useRecentlyViewed();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Scroll to products section
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShopNow = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProductClick = (product: Product) => {
    addToRecentlyViewed(product);
    // TODO: Navigate to product detail page
    console.log("Product clicked:", product);
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Header products={sampleProducts} onSearch={handleSearch} />
      
      <main>
        <Hero onShopNow={handleShopNow} />
        
        <section ref={productsRef} className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our curated collection of premium products designed to enhance your lifestyle
              </p>
            </div>
            
            <ProductGrid
              products={sampleProducts}
              searchQuery={searchQuery}
              onProductClick={handleProductClick}
              onQuickView={handleQuickView}
            />
          </div>
        </section>
      </main>
      
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 ShopHub. Built with modern e-commerce technologies.</p>
          </div>
          </div>
        </footer>

        {/* Quick View Modal */}
        <ProductQuickView
          product={quickViewProduct}
          open={isQuickViewOpen}
          onOpenChange={setIsQuickViewOpen}
        />
      </div>
    );
  };

export default Index;
