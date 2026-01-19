import { sanityClient } from "@/lib/sanity";
// import { client } from "@/lib/sanity-queries";
import { categoriesWithCountQuery } from "@/lib/sanity-queries";

export type CategoryCount = {
  name: string;
  count: number;
};

export async function getCategoriesWithCount(): Promise<CategoryCount[]> {
  return sanityClient.fetch(categoriesWithCountQuery);
}
