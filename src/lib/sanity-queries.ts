// GROQ Queries for Sanity CMS

// Base product fields to select
const productFields = `
  _id,
  title,
  "slug": slug.current,
  category,
  description,
  "images": images[].asset->url,
  featured,
  specs {
    code,
    dimensions,
  },
  publishedAt
`;

// Get all products
export const allProductsQuery = `
  *[_type == "product"] | order(publishedAt desc) {
    ${productFields}
  }
`;

// Get a single product by slug
export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    ${productFields}
  }
`;

// Get featured products
export const featuredProductsQuery = `
  *[_type == "product" && featured == true] | order(publishedAt desc) {
    ${productFields}
  }
`;

// Get products by category
export const productsByCategoryQuery = `
  *[_type == "product" && category == $category] | order(publishedAt desc) {
    ${productFields}
  }
`;

// Get related products (same category, excluding current product)
export const relatedProductsQuery = `
  *[_type == "product" && category == $category && slug.current != $currentSlug][0...$limit] {
    ${productFields}
  }
`;

// Search products by title, category, or product code
export const searchProductsQuery = `
  *[_type == "product" && (
    title match $text ||
    category match $text ||
    specs.code == $code
  )] | order(publishedAt desc) {
    ${productFields}
  }
`;

// Get all unique categories
export const allCategoriesQuery = `
  array::unique(*[_type == "product" && defined(category) && category != ""].category)
  | order(@ asc)
`;

export const categoriesWithCountQuery = `
  *[_type == "product" && defined(category) && category != ""]
  | group(category) {
    "name": category,
    "count": count(*)
  }
  | order(name asc)
`;
