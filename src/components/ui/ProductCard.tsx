"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#e9e6e2] mb-4">
          <motion.img
            src={product.images[0]}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#0D2893] text-accent-foreground text-xs font-medium rounded-full">
              Featured
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="space-y-2 text-background">
          <p className="text-xs uppercase tracking-wider ">
            {product.category}
          </p>
          <h3 className="font-serif text-lg font-medium group-hover:text-[#0D2893] transition-colors ">
            {product.title}
          </h3>
        </div>
      </Link>
    </motion.article>
  );
}
