"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ChevronRight, Mail } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct, useRelatedProducts } from "@/hooks/use-products";

export default function ProductDetailClient() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";

  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading: isLoadingProduct } = useProduct(slug);

  const { data: relatedProducts = [], isLoading: isLoadingRelated } =
    useRelatedProducts(product?.slug || "", product?.category || "", 3);

  useEffect(() => {
    setSelectedImage(0);
  }, [slug]);

  if (isLoadingProduct) {
    return (
      <>
        <section className="py-4 border-b border-border">
          <div className="container mx-auto px-6">
            <Skeleton className="h-5 w-64" />
          </div>
        </section>
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <Skeleton className="aspect-[4/5] rounded-lg mb-4" />
                <div className="flex gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="w-20 h-20 rounded-md" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-semibold mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Button asChild variant="outline">
            <Link href="/products">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-3 border-b border-gray-200">
        <div className="container mx-auto px-6 mt-8">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-background transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/products" className="hover:text-background transition-colors">
              Products
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-background">{product.title}</span>
          </nav>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-lg bg-[#e9e6e2] mb-4">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-md overflow-hidden transition-all ${selectedImage === index
                          ? "ring-2 ring-accent ring-offset-2"
                          : "opacity-60 hover:opacity-100"
                        }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs uppercase tracking-wider text-background">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="px-3 py-1 bg-[#0D2893] text-accent-foreground text-xs font-medium rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-background">
                {product.title}
              </h1>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {product.specs && (
                <div className="border-t border-gray-300 pt-8 mb-8">
                  <h3 className="font-serif text-xl font-medium mb-4 text-background">
                    Specifications
                  </h3>
                  <dl className="space-y-4">
                    {product.specs.code && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Code</dt>
                        <dd className="font-medium text-background">{product.specs.code}</dd>
                      </div>
                    )}
                    {product.specs.dimensions && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Dimensions</dt>
                        <dd className="font-medium text-background">
                          {product.specs.dimensions}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button asChild size="lg" className="bg-accent hover:bg-terracotta-dark text-accent-foreground">
                  <Link href="/contact">
                    <Mail className="mr-2 w-4 h-4" />
                    Inquire About This Product
                  </Link>
                </Button>

                <Button variant="outline" size="lg" onClick={() => router.back()}>
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Go Back
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {!isLoadingRelated && relatedProducts.length > 0 && (
        <section className="py-16 bg-foreground">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-3xl font-semibold mb-8 text-background">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct._id || relatedProduct.id}
                  product={relatedProduct}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
