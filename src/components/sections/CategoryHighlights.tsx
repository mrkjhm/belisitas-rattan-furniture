"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

const categoryImages = [
  {
    name: "Chair",
    image: "/images/product_1.png",
    description: "Crafted comfort for your space",
  },
  {
    name: "Lamp",
    image: "/images/lamp1.png",
    description: "Light shaped by nature",
  },
  {
    name: "Mirror",
    image: "/images/mirror1.png",
    description: "Organic accents for your walls",
  },
];

export function CategoryHighlights() {
  // Subhead
  const categoryRef = useRef(null);
  const categoryInView = useInView(categoryRef, { amount: 0.1 });
  const categoryControls = useAnimation();

  useEffect(() => {
    categoryControls.start(categoryInView ? "show" : "hidden");
  }, [categoryInView, categoryControls]);

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
    <section className="py-24 bg-[#efebe7]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerControls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.p
            variants={cardVariants}
            className="text-[#0D2893] font-medium tracking-wider uppercase mb-2"
          >
            Explore by Category
          </motion.p>
          <motion.h2
            variants={cardVariants}
            className="font-serif text-4xl md:text-5xl font-semibold text-foreground"
          >
            Style Your Space, Naturally
          </motion.h2>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          ref={categoryRef}
          initial="hidden"
          animate={categoryControls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {categoryImages.map((category) => (
            <motion.div key={category.name} variants={cardVariants}>
              <Link
                href={`/products?category=${category.name}`}
                className="group block relative aspect-[4/5] overflow-hidden rounded-lg"
              >
                {/* Image */}
                <motion.img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-serif text-2xl font-semibold text-background mb-2">
                    {category.name}
                  </h3>
                  <p className="text-background/80 mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-background group-hover:text-accent transition-colors">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
