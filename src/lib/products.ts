// Product data layer - Fetches from Sanity CMS
import { sanityClient, isSanityConfigured } from "./sanity";
import {
  allProductsQuery,
  productBySlugQuery,
  featuredProductsQuery,
  productsByCategoryQuery,
  relatedProductsQuery,
  searchProductsQuery,
  allCategoriesQuery,
} from "./sanity-queries";

export interface Product {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  featured: boolean;
  specs: {
    code?: string;
    dimensions?: string;
    // features?: string[];
  };
  publishedAt: string;
}

// Default categories (will be fetched from Sanity when connected)
export const defaultCategories = [
  "All",
  "Basket",
  "Chair",
  "Hamper",
  "Lamp",
  "Mirror",
  "Pendant Light",
] as const;

export type Category = string;

// Normalize product data (handle differences between Sanity and mock data)
function normalizeProduct(product: Product): Product {
  return {
    ...product,
    id: product._id || product.id,
  };
}

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  if (!isSanityConfigured()) {
    console.warn(
      "Sanity is not configured. getAllProducts will return empty array."
    );
    return [];
  }

  try {
    const products = await sanityClient.fetch(allProductsQuery);
    return products.map(normalizeProduct);
  } catch (error) {
    console.error("Error fetching products from Sanity:", error);
    return [];
  }
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured()) {
    console.warn(
      "Sanity is not configured. getProductBySlug will return null."
    );
    return null;
  }

  try {
    const product = await sanityClient.fetch(productBySlugQuery, { slug });
    return product ? normalizeProduct(product) : null;
  } catch (error) {
    console.error("Error fetching product from Sanity:", error);
    return null;
  }
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  if (!isSanityConfigured()) {
    console.warn(
      "Sanity is not configured. getFeaturedProducts will return empty array."
    );
    return [];
  }

  try {
    const products = await sanityClient.fetch(featuredProductsQuery);
    return products.map(normalizeProduct);
  } catch (error) {
    console.error("Error fetching featured products from Sanity:", error);
    return [];
  }
}

// Get products by category
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  if (category === "All") {
    return getAllProducts();
  }

  if (!isSanityConfigured()) {
    console.warn(
      "Sanity is not configured. getProductsByCategory will return empty array."
    );
    return [];
  }

  try {
    const products = await sanityClient.fetch(productsByCategoryQuery, {
      category,
    });
    return products.map(normalizeProduct);
  } catch (error) {
    console.error("Error fetching products by category from Sanity:", error);
    return [];
  }
}

// Get related products
export async function getRelatedProducts(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<Product[]> {
  if (!isSanityConfigured()) {
    console.warn(
      "Sanity is not configured. getRelatedProducts will return empty array."
    );
    return [];
  }

  try {
    const products = await sanityClient.fetch(relatedProductsQuery, {
      currentSlug,
      category,
      limit,
    });
    return products.map(normalizeProduct);
  } catch (error) {
    console.error("Error fetching related products from Sanity:", error);
    return [];
  }
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  if (!isSanityConfigured()) {
    console.warn(
      "Sanity is not configured. searchProducts will return empty array."
    );
    return [];
  }

  try {
    const text = `*${query}*`;
    const code = query;
    const products = await sanityClient.fetch(searchProductsQuery, {
      text,
      code,
    });
    return products.map(normalizeProduct);
  } catch (error) {
    console.error("Error searching products from Sanity:", error);
    return [];
  }
}

// Get all categories
export async function getCategories(): Promise<string[]> {
  if (isSanityConfigured()) {
    try {
      const categories = await sanityClient.fetch(allCategoriesQuery);
      return ["All", ...categories.filter(Boolean)];
    } catch (error) {
      console.error("Error fetching categories from Sanity:", error);
      return [...defaultCategories];
    }
  }
  return [...defaultCategories];
}

// Export categories for backward compatibility
export const categories = defaultCategories;
