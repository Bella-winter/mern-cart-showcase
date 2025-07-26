import { useState, useEffect, useRef } from "react";
import { Search, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

interface SearchAutocompleteProps {
  products: Product[];
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchAutocomplete = ({ 
  products, 
  onSearch, 
  placeholder = "Search products..." 
}: SearchAutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ecommerce-recent-searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading recent searches:", error);
      }
    }
  }, []);

  // Generate suggestions based on query
  useEffect(() => {
    if (query.length > 0) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveRecentSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)]
        .slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("ecommerce-recent-searches", JSON.stringify(updated));
    }
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsOpen(false);
    saveRecentSearch(searchQuery);
    onSearch(searchQuery);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSuggestionClick = (product: Product) => {
    handleSearch(product.name);
  };

  const popularSearches = ["Headphones", "Watch", "T-shirt", "Camera", "Coffee"];

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 w-full"
        />
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-floating z-50 max-h-80 overflow-y-auto animate-fade-in">
          {/* Product Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                Products
              </div>
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSuggestionClick(product)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-accent rounded-md text-left"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {product.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {product.category} • ${product.price}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-2 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="w-full flex items-center gap-2 p-2 hover:bg-accent rounded-md text-left text-sm"
                >
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {query.length === 0 && (
            <div className="p-2 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Popular Searches
              </div>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="w-full flex items-center gap-2 p-2 hover:bg-accent rounded-md text-left text-sm"
                >
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  {search}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};