import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { categoriesWithCountQuery, allCategoriesQuery } from "@/lib/sanity-queries";

export type CategoryCount = { name: string; count: number };

export async function getCategoriesFromSanity(): Promise<string[]> {
  if (!isSanityConfigured()) return ["All"];

  try {
    const categories = await sanityClient.fetch<string[]>(allCategoriesQuery);
    return ["All", ...categories.filter(Boolean)];
  } catch {
    return ["All"];
  }
}

export async function getCategoriesWithCountFromSanity(): Promise<CategoryCount[]> {
  if (!isSanityConfigured()) return [];

  try {
    return await sanityClient.fetch<CategoryCount[]>(categoriesWithCountQuery);
  } catch {
    return [];
  }
}
