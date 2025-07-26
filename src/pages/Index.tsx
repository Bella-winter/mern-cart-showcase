import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { sampleProducts } from "@/data/products";
import { Product } from "@/types/product";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const productsRef = useRef<HTMLDivElement>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Scroll to products section
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShopNow = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProductClick = (product: Product) => {
    // TODO: Navigate to product detail page
    console.log("Product clicked:", product);
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Header onSearch={handleSearch} />
      
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
    </div>
  );
};

export default Index;
