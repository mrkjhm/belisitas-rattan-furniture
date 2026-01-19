"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, useAnimation, useInView } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { SearchInput } from "@/components/ui/SearchInput";
import { useProducts } from "@/hooks/use-products";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "newest" | "a-z" | "z-a";

const Products = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { amount: 0.2 });
  const headerControls = useAnimation();

  useEffect(() => {
    headerControls.start(headerInView ? "show" : "hidden");
  }, [headerInView, headerControls]);

  const categoryRef = useRef(null);
  const categoryInView = useInView(categoryRef, { amount: 0.2 });
  const categoryControls = useAnimation();

  useEffect(() => {
    categoryControls.start(categoryInView ? "show" : "hidden");
  }, [categoryInView, categoryControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    },
  };

  const searchRef = useRef(null);
  const searchInView = useInView(searchRef, { amount: 0.1 });
  const searchControls = useAnimation();

  useEffect(() => {
    searchControls.start(
      searchInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
    );
  }, [searchInView, searchControls]);

  const filterRef = useRef(null);
  const filterInView = useInView(filterRef, { amount: 0.1 });
  const filterControls = useAnimation();

  useEffect(() => {
    filterControls.start(
      filterInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
    );
  }, [filterInView, filterControls]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // ✅ ALWAYS safe: URLSearchParams
  const sp = useMemo(() => searchParams ?? new URLSearchParams(), [searchParams]);

  const replaceUrl = (params: URLSearchParams) => {
    const qs = params.toString();
    const current = sp.toString();
  
    if (qs === current) return;
  
    const basePath = pathname ?? "/products"; // ✅ fallback
  
    router.replace(qs ? `${basePath}?${qs}` : basePath);
  };
  
  // ✅ get() returns string | null, so use ?? ""
  const initialCategory = sp.get("category") ?? "All";
const initialSearch = sp.get("search") ?? "";

const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
const [sortBy, setSortBy] = useState<SortOption>("newest");

// ✅ separate refs
const isLocalSearchUpdateRef = useRef(false);
const isLocalCategoryUpdateRef = useRef(false);

// ✅ SYNC FROM URL: search + category
useEffect(() => {
  // --- category ---
  if (isLocalCategoryUpdateRef.current) {
    isLocalCategoryUpdateRef.current = false;
  } else {
    const urlCategory = sp.get("category") ?? "All";
    if (urlCategory !== selectedCategory) setSelectedCategory(urlCategory);
  }

  // --- search ---
  if (isLocalSearchUpdateRef.current) {
    isLocalSearchUpdateRef.current = false;
  } else {
    const urlSearch = sp.get("search") ?? "";
    if (urlSearch !== searchQuery) setSearchQuery(urlSearch);
  }
}, [sp]); // ✅ only depends on URL params

const handleCategorySelect = (cat: string) => {
  isLocalCategoryUpdateRef.current = true;
  setSelectedCategory(cat);
};


const handleSearchChange = (value: string) => {
  setSearchQuery(value);
  isLocalSearchUpdateRef.current = true;

  const params = new URLSearchParams(sp.toString());
  const v = value.trim();

  if (v) params.set("search", v);
  else params.delete("search");

  replaceUrl(params);
};


  const { data: products = [], isLoading } = useProducts(
    selectedCategory !== "All" ? selectedCategory : undefined,
    searchQuery || undefined
  );

  // ✅ Update URL when category changes (using sp, not searchParams)
  useEffect(() => {
    const params = new URLSearchParams(sp.toString());
  
    if (selectedCategory === "All") params.delete("category");
    else params.set("category", selectedCategory);
  
    replaceUrl(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);
  

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery && result.length > 0) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery) ||
          p.specs?.code?.toLowerCase().includes(lowerQuery)
      );
    }

    const getTime = (d?: string) => (d ? new Date(d).getTime() : 0);

    switch (sortBy) {
      case "a-z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
      default:
        result.sort((a, b) => getTime(b.publishedAt) - getTime(a.publishedAt));
    }

    return result;
  }, [products, searchQuery, sortBy]);

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-[#efebe7]">
        <motion.div className="container mx-auto px-6">
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerControls}
            variants={containerVariants}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.h1
              variants={cardVariants}
              className="font-serif text-background text-4xl md:text-5xl lg:text-6xl font-semibold mb-4"
            >
              Our Collection
            </motion.h1>
            <motion.p
              variants={cardVariants}
              className="text-lg text-muted-foreground"
            >
              Explore our latest collections and find the perfect products for
              your needs.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-gray-200 sticky top-20 bg-white z-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

            <motion.div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <motion.div
                ref={filterRef}
                initial={{ opacity: 0, x: 30 }}
                animate={filterControls}
                transition={{ duration: 0.5 }}
                className="w-full sm:w-64"
              >
                <SearchInput
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                />
              </motion.div>

              <motion.div
                ref={searchRef}
                initial={{ opacity: 0, x: 30 }}
                animate={searchControls}
                transition={{ duration: 0.7 }}
              >
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-full sm:w-40 bg-foreground border-transparent text-background">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="a-z">A – Z</SelectItem>
                    <SelectItem value="z-a">Z – A</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-32 mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="aspect-[4/5] rounded-lg" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </>
          ) : filteredProducts.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-8">
                Showing {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-foreground flex items-center justify-center">
                <SlidersHorizontal className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-2xl font-medium mb-2 text-background">
                No products found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  handleSearchChange("");
                  setSelectedCategory("All");
                }}
                className="text-accent hover:text-terracotta-dark font-medium"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
