// Sanity CMS Configuration
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

// Sanity client configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Create the Sanity client
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Image URL builder for Sanity images
const builder = createImageUrlBuilder(sanityClient);

// Helper function to generate image URLs from Sanity image references
type SanityImageSource = Parameters<typeof builder.image>[0];

// Helper function to generate image URLs from Sanity image references
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Check if Sanity is properly configured
export function isSanityConfigured(): boolean {
  return projectId !== "" && dataset !== "";
}

