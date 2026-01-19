// React Query hooks for product data fetching
import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getProductBySlug,
  getFeaturedProducts,
  getProductsByCategory,
  getRelatedProducts,
  searchProducts,
  getCategories,
  type Product,
} from "@/lib/products";

// Query keys for cache management
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: { category?: string; search?: string }) =>
    [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (slug: string) => [...productKeys.details(), slug] as const,
  featured: () => [...productKeys.all, "featured"] as const,
  related: (slug: string, category: string) =>
    [...productKeys.all, "related", slug, category] as const,
  categories: () => [...productKeys.all, "categories"] as const,
};

// Fetch all products
export function useProducts(category?: string, search?: string) {
  return useQuery<Product[]>({
    queryKey: productKeys.list({ category, search }),
    queryFn: async () => {
      if (search) {
        return searchProducts(search);
      }
      if (category && category !== "All") {
        return getProductsByCategory(category);
      }
      return getAllProducts();
    },
  });
}

// Fetch a single product by slug
export function useProduct(slug: string) {
  return useQuery<Product | null>({
    queryKey: productKeys.detail(slug),
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });
}

// Fetch featured products
export function useFeaturedProducts() {
  return useQuery<Product[]>({
    queryKey: productKeys.featured(),
    queryFn: getFeaturedProducts,
  });
}

// Fetch related products
export function useRelatedProducts(
  currentSlug: string,
  category: string,
  limit = 3
) {
  return useQuery<Product[]>({
    queryKey: productKeys.related(currentSlug, category),
    queryFn: () => getRelatedProducts(currentSlug, category, limit),
    enabled: !!currentSlug && !!category,
  });
}

// Fetch categories
export function useCategories() {
  return useQuery<string[]>({
    queryKey: productKeys.categories(),
    queryFn: getCategories,
  });
}
