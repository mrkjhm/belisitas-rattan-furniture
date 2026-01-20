"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useFeaturedProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef } from "react";

export function FeaturedProducts() {
  const { data: featured = [], isLoading } = useFeaturedProducts();

  const featureRef = useRef(null);
  const featureInView = useInView(featureRef, { amount: 0.2 });
  const featureControls = useAnimation();

  useEffect(() => {
    featureControls.start(featureInView ? "show" : "hidden");
  }, [featureInView, featureControls]);

  const viewProductRef = useRef(null);
  const viewProductInView = useInView(viewProductRef, { amount: 0.2 });
  const viewProductControls = useAnimation();

  useEffect(() => {
    viewProductControls.start(
      viewProductInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
    );
  }, [viewProductInView, viewProductControls]);

  // Header
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { amount: 0.2 });
  const headerControls = useAnimation();

  useEffect(() => {
    headerControls.start(headerInView ? "show" : "hidden");
  }, [headerInView, headerControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
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

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerControls}
            variants={containerVariants}
          >
            <motion.p
              variants={cardVariants}
              className="text-[#0D2893] font-medium tracking-wider uppercase mb-2"
            >
              Selected Pieces
            </motion.p>
            <motion.h2
              variants={cardVariants}
              className="font-serif text-4xl md:text-5xl font-semibold text-background"
            >
              Featured Collection
            </motion.h2>
          </motion.div>
          <motion.div
            ref={viewProductRef}
            initial={{ opacity: 0, x: 30 }}
            animate={viewProductControls}
            transition={{ duration: 0.5 }}
            className="mt-6 md:mt-0 text-background"
          >
            <Button asChild variant="ghost" className="group">
              <Link href="/products">
                View all products
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Products Grid */}
        <motion.div
          ref={featureRef}
          initial="hidden"
          animate={featureControls}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {isLoading
            ? // Loading skeletons
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="aspect-[4/5] rounded-lg" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))
            : featured.map((product, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                  />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
}
